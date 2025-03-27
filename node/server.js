// Purpose: Server module for serving static files and handling requests.

// ----------------- Imports and Exports -----------------
import fs from 'fs';
import path from 'path';
import process from 'process';
import http from 'http';
import dotenv from 'dotenv';

import { processReq } from "./router.js";
import { log, InternalError, NoResourceError } from "./utils.js";
export { startServer, respondError, htmlResponse, jsonResponse, fileResponse };

// ----------------- Basic configs -----------------
dotenv.config();
const hostname = '127.0.0.1';
// for env to work, create .env file with PORT=3000 (or whatever port you want).
// should be in root dir
// dotevn in package.json as dependency so will be installed with npm install
const PORT = process.env.PORT || 3000;      // todo: change to match actual server, not just local

const rootDir = process.cwd();
const publicDir = 'public';

// ----------------- Response Handlers -----------------
function respondError(res, error) {
    res.statusCode = error.responseCode;
    res.setHeader('Content-Type', 'text/txt');
    res.write(`${error.responseCode}: ${error.message}`);
    res.end("\n");

    log(error, true);
}

/* send a response with htmlString as html page */
function htmlResponse(res, htmlString) {
    res.statusCode = 200;
    res.setHeader('Content-Type', "text/html");
    res.write(htmlString);
    res.end('\n');
}

function jsonResponse(res, json) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(json));
    res.end('\n');
}

function fileResponse(res, path) {
    path = securePath(path);
    log(`Serving file: ${path}`);
    fs.readFile(path, (err, data) => {
        if (err) {
            respondError(res, new NoResourceError(err.message));
        } else {
            res.statusCode = 200;
            // todo: set content type based on file extension using mmmagic
            res.setHeader('Content-Type', guessMimeType(path));
            res.write(data);
            res.end('\n');
        }
    });
}

// ripped from lecture notes, use mmagic instead later, if needed/want to make better
//A helper function that converts filename suffix to the corresponding HTTP content type
//better alternative: use require('mmmagic') library
function guessMimeType(fileName) {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    console.log(fileExtension);
    const ext2Mime = { //Aught to check with IANA spec
        "txt": "text/txt",
        "html": "text/html",
        "ico": "image/ico", // CHECK x-icon vs image/vnd.microsoft.icon
        "js": "text/javascript",
        "json": "application/json",
        "css": 'text/css',
        "png": 'image/png',
        "jpg": 'image/jpeg',
        "wav": 'audio/wav',
        "mp3": 'audio/mpeg',
        "svg": 'image/svg+xml',
        "pdf": 'application/pdf',
        "doc": 'application/msword',
        "docx": 'application/msword'
    };
    //incomplete
    return (ext2Mime[fileExtension] || "text/plain");
}

//secture file system access as described on 
//https://nodejs.org/en/knowledge/file-system/security/introduction/
function securePath(userPath) {
    if (userPath.indexOf('\0') !== -1) {
        // could also test for illegal chars: if (!/^[a-z0-9]+$/.test(filename)) {return undefined;}
        return undefined;
    }
    userPath = path.normalize(userPath).replace(/^(\.\.(\/|\\|$))+/, '');
    userPath = publicDir + userPath;

    return path.join(rootDir, path.normalize(userPath));
}

// ----------------- Server -----------------
// todo: maybe use express instead of http module
// https://expressjs.com/en/starter/hello-world.html
// should maybe also have used to set up routes, but wanted to try doing it myself

const server = http.createServer(requestHandler);

function requestHandler(req, res) {
    try {
        processReq(req, res);
    } catch (err) {
        respondError(res, new InternalError(err.message));
    }
}

function startServer() {
    server.listen(PORT, hostname, () => {
        log(`Server running at http://${hostname}:${PORT}/`);
    });
}
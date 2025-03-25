import { processReq } from "./router.js";
import { InternalError } from "./utils.js";
export { startServer, respondError, htmlResponse, jsonResponse };

//import fs from 'fs';
//import url from 'url';
//import path from 'path';
import process from 'process';
import * as utils from './utils.js';
import http from 'http';
// above are tmps, not used yet

// ----------------- Basic configs -----------------
const hostname = '127.0.0.1';
const PORT = process.env.PORT || 3000;

//const rootDir = process.cwd();
//const publicDir = path.join(rootDir, 'public'); // as of yet unused


// ----------------- Response Handlers -----------------
function respondError(res, error) {
    res.statusCode = error.responseCode;
    res.setHeader('Content-Type', 'text/txt');
    res.write(error.message);
    res.end("\n");

    utils.log(error, true);
}

/* send a response with htmlString as html page */
function htmlResponse(res, htmlString){
    res.statusCode = 200;
    res.setHeader('Content-Type', "text/html");
    res.write(htmlString);
    res.end('\n');
}

function jsonResponse(res, json){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(json));
    res.end('\n');
}

// ----------------- Server -----------------
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
        console.log(`Server running at http://${hostname}:${PORT}/`);
    });
}
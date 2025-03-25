//import { v4 as uuidv4 } from 'uuid'; // UUID generator (Universally Unique Identifier (for unique session IDs or other unique values))
import fs from 'fs';
export { log };

// --------------- Loggers ---------------
const logFile = 'access.log';
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

function logError(error) {
    console.error(error);
    logStream.write(`${error.name}${error.responseCode}!!: ${error.message}\n`);
}

function logMessage(message) {
    console.log(message);
    logStream.write(message + '\n');
}

function log(message, error=false) {
    error ? logError(message) : logMessage(message);
}

// --------------- UUID ---------------
/*function generateUUID() {
    return uuidv4();
}*/

// --------------- Error Classes ---------------
export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.responseCode = 400;
    }
}

export class NoResourceError extends Error {
    constructor(message) {
        super(message);
        this.name = "NoResourceError";
        this.responseCode = 404;
    }
}

export class InternalError extends Error {
    constructor(message) {
        super(message);
        this.name = "InternalError";
        this.responseCode = 500;
    }
}

export class MethodNotAllowedError extends Error {
    constructor(message) {
        super(message);
        this.name = "MethodNotAllowedError";
        this.responseCode = 405;
    }
}

export class NotImplementedError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotImplementedError";
        this.responseCode = 501;
    }
}

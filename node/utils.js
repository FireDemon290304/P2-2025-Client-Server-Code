//import { v4 as uuidv4 } from 'uuid'; // UUID generator (Universally Unique Identifier (for unique session IDs or other unique values))
import fs from 'fs';
export { log, getTimestamp };

// --------------- Loggers ---------------
const logFile = 'access.log';
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

// helper function to get timestamp
// Helper function to get timestamp in local ISO format
function getTimestamp(string = true) {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // Offset in milliseconds
    const localISOTime = new Date(now - offset).toISOString().slice(0, -1); // Format as YYYY-MM-DDTHH:mm:ss.sss
    return string ? localISOTime : new Date(now - offset);
}

function _logError(error) {
    console.error(error);
    logStream.write(`[${getTimestamp()}] [ERROR] ${error.name} (${error.responseCode}): ${error.message}\n`);
}

function _logMessage(message) {
    console.log(message);
    logStream.write(`[${getTimestamp()}] [INFO] ${message}\n`);
}

function log(obj) {
    obj instanceof Error ? _logError(obj) : _logMessage(obj);
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

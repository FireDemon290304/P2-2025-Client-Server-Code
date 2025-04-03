// Purpose: Server module for serving static files and handling requests.

// ----------------- Imports and Exports -----------------
import express from 'express';
import path from 'path';
import process from 'process';
import dotenv from 'dotenv';

import router from './router.js'
import { log, InternalError } from "./utils.js";
export { startServer };

// ----------------- Basic configs -----------------
dotenv.config();
const app = express();
const hostname = '127.0.0.1';
const PORT = process.env.PORT || 3240;  // node0: 3240, node9: 3249

// serve static from public dir
const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
app.use(express.static(publicDir));

// ----------------- Logging -----------------
// logging middleware
app.use((req, res, next) => {
    log(`GOT: ${req.method} ${req.url}`);
    next();
});

// errors middleware
app.use((err, req, res, next) => {
    log(new InternalError(err.message), true);
    res.status(500).send('500: Internal Server Error');
    next();
});

// place this after middleware
app.use(router);

// ----------------- Server -----------------
function startServer() {
    app.listen(PORT, hostname, () => {
        log(`Server runnign at http://${hostname}:${PORT}/`);
    });
}

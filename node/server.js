// Purpose: Server module for serving static files and handling requests.

// ----------------- Imports and Exports -----------------
import express from 'express';
import path from 'path';
import process from 'process';
import dotenv from 'dotenv';

import router from './router.js'
import { log } from "./modules/utils.js";
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
app.use(router);

// ----------------- Server -----------------
function startServer() {
    app.listen(PORT, hostname, () => {
        log(`Server runnign at http://${hostname}:${PORT}/`);
    });
}

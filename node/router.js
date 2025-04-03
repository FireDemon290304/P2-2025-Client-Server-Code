import express from 'express';
import path from 'path';
import { log, NoResourceError } from './utils.js'

const router = express.Router();
const publicDir = path.join(process.cwd(), 'public');

// ----------------- routes -----------------
router.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'html', 'index.html'));
});


// Unknown routes
router.use((req, res) => {
    log(new NoResourceError('Resource not found'), true)
    res.status(404).send('404: Resource not found');
});

export default router;
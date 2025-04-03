import express from 'express';
import path from 'path';
import { log, InternalError, NoResourceError } from './utils.js'

const router = express.Router();
const publicDir = path.join(process.cwd(), 'public');

// ----------------- Routes -----------------
// logging middleware
router.use((req, res, next) => {
    log(`GOT: ${req.method} ${req.url}`);
    next();
});

router.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'html', 'index.html'));
});

router.get('/testinternal', (req, res) => {
    throw new InternalError('testing internal');
});

// Unknown routes
router.use((req, res) => {
    log(new NoResourceError('Resource not found'), true)
    res.status(404).send('404: Resource not found');
});

// ----------------- Errors -----------------
// errors middleware
router.use((err, req, res, next) => {
    log(new InternalError(err.message), true);
    res.status(500).send('500: Internal Server Error');
});

export default router;
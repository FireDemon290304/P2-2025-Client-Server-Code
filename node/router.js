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
    throw new InternalError('Test error');
});


// ----------------- Errors -----------------

// Unknown routes
router.use((req, res) => {
    const err = new NoResourceError('Not found');
    log(err);
    res.status(err.responseCode).send(`${err.responseCode}: ${err.message}`);
});


// generic errors middleware
router.use((err, req, res, next) => {
    log(err);
    
    // Handle known errors. If err is unknown, it will read as internal error
    if (err.responseCode) {
        res.status(err.responseCode).send(`${err.responseCode}: ${err.message}`);
    } else { res.status(500).send('500: Internal Server Error'); }
});

export default router;

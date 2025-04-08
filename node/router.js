import express from 'express';
import path from 'path';
import { log, InternalError, NoResourceError, NotImplementedError } from './modules/utils.js'
//import { testAPI } from './modules/index.js';
import { controller } from './modules/index.js';

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

router.get('/testinternal', () => {
    throw new InternalError('Test error');
});

router.get('/api/forecast', (req, res) => {
    // Simulate a request to the forecast API
    // Send message to server to request forecast
    // Await response from server
    // Return response to client

    // send data back with response
    // as json to be shown in client
    controller.test().then( testdata => {
        res.json(testdata);
    });

    //throw new NotImplementedError('Forecast API not implemented yet');
});

router.get('/api/specificForecast', () => {
    throw new NotImplementedError('No specifics implemented yet');
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

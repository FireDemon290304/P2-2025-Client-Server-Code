export { processReq };
// import app stuff
import { htmlResponse, respondError, startServer } from "./server.js";
import { log, MethodNotAllowedError, NoResourceError, NotImplementedError } from "./utils.js";
import fs from 'fs';
import path from 'path';

// becaus this is needed for some reason...
const iconPath = path.join(process.cwd(), 'public', 'favicon.ico');


startServer();

function processReq(req, res) {
    log("GOT: " + req.method + " " + req.url);

    let baseURL = `http://${req.headers.host}/`;
    let url = new URL(req.url, baseURL);
    //let searchParams = new URLSearchParams(url.search); // use if query params are needed
    let path = decodeURIComponent(url.pathname);

    switch (req.method) {
        case 'GET':
            switch (path) {
                case '/':
                    htmlResponse(res, '<h1>Hello, World!</h1>');
                    break;
                case '/favicon.ico':
                    fs.readFile(iconPath, (err, data) => {
                        if (err) {
                            respondError(res, new NoResourceError(`No resource at ${path}`));
                        } else {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'image/x-icon');
                            res.write(data);
                            res.end();
                        }
                    });
                    break;
                default:
                    respondError(res, new NoResourceError(`No resource at ${path}`));
                    break;
            }
            break;
        
        case 'POST':
            respondError(res, new NotImplementedError('POST not implemented'));
            break;
        default:
            respondError(res, new MethodNotAllowedError('Unkown method'));
            break;
    }
}

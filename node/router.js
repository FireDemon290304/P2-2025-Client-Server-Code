// todo: import app stuff
import { respondError, fileResponse } from "./server.js";
import { log, MethodNotAllowedError, NotImplementedError } from "./utils.js";
export { processReq };

function processReq(req, res) {
    log("GOT: " + req.method + " " + req.url);

    let baseURL = `http://${req.headers.host}/`;
    let url = new URL(req.url, baseURL);
    //let searchParams = new URLSearchParams(url.search); // use if query params are needed
    let path = decodeURIComponent(url.pathname);

    switch (req.method) {
        case 'GET':     // handle all GET requests
            switch (path) {
                case '/':
                    fileResponse(res, "/html/index.html");
                    //htmlResponse(res, '<h1>Hello, World!</h1>');
                    break;

                default:    // default is to serve files
                    fileResponse(res, req.url);
                    break;
            }
            break;
        
        case 'POST':    // handle all POST requests
            respondError(res, new NotImplementedError('POST not implemented'));
            break;
        default:        // default is to respond with 405
            respondError(res, new MethodNotAllowedError('Unkown method'));
            break;
    }
}

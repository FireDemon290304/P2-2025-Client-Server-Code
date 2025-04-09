import { startServer } from "./server.js";

/*
import { print, controller, generateSimData } from './modules/index.js';

const sim = generateSimData({
    length: 36,
    trend: 'linear',
    noiseLevel: 0.2,
    seed: 0.58
});


print("sim data:" + sim);
print('Builtin:');
print(controller.builtInARIMA(sim, 5)[0]);
print('lease square regression:')
print(controller.ls(sim, 5));
*/

startServer();
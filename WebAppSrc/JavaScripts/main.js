/**
 * Created by daniel on 22.10.16.
 */

import IrLib from './../node_modules/irlib/dist/irlib';
import App from './App.js';
import Controller from './Controller.js';
import ServiceScanner from './ServiceScanner.js';

const sl = new IrLib.ServiceLocator();
sl.register('app', App);
sl.register('controller', Controller);
sl.register('serviceScanner', ServiceScanner);

const app = sl.get('app');
app.run();
import {S} from './state.js';
import {A,V} from './engine.js';
import * as ui from './ui.js';
import * as seq from './sequencer.js';
// Small debug handle for tests and the console.
window.BB={S,A,V,ui,seq};
ui.start().then(()=>{window.BB.ready=true;});

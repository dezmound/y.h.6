import Emitter from './emitter.js';

const emitter = new Emitter();
const handler1 = () => {
    console.log('First handler');
};
const handler2 = () => {
    console.log('Second handler');
};
emitter.on('event', handler1)
.on('event', handler2)
.on('event2', () => {
    console.log('Third handler');
});

emitter.emit('event').emit('event2');

emitter.off('event', handler1);

emitter.emit('event').emit('event2');

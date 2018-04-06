import Emmiter from './emmiter.js';

const emmiter = new Emmiter();
const handler1 = () => {
    console.log('First handler');
};
const handler2 = () => {
    console.log('Second handler');
};
emmiter.on('event', handler1);
emmiter.on('event', handler2);
emmiter.on('event2', () => {
    console.log('Third handler');
});

emmiter.emmit('event');
emmiter.emmit('event2');

emmiter.off('event', handler1);

emmiter.emmit('event');
emmiter.emmit('event2');

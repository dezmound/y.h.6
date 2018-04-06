/**
 * Обработчик событий.
 */
class Emmiter {
    /**
     * Конструктор класса.
     */
    constructor() {
        this.events = new Map();
    }
    /**
     * Подписка на события.
     * @param {string} event
     * @param {callbackfn} handler
     */
    on(event, handler) {
        let oldHandlers;
        if (oldHandlers = this.events.get(event)) {
            oldHandlers.push(handler);
            this.events.set(event, oldHandlers);
        } else {
            this.events.set(event, [handler]);
        }
    }
    /**
     * Отписка от события.
     * @param {string} event
     * @param {callbackfn} handler
     */
    off(event, handler) {
        let oldHandlers;
        if (oldHandlers = this.events.get(event)) {
            this.events.set(event, oldHandlers.splice(
                oldHandlers.indexOf(handler) - 1, 1)
            );
        }
    }
    /**
     * Вызов события.
     * @param {string} event
     */
    emmit(event) {
        const events = this.events.get(event) || [];
        events.forEach((handler) => {
            handler();
        });
    }
}
export default Emmiter;

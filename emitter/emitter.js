/**
 * Обработчик событий.
 */
class Emitter {
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
     * @return {this}
     */
    on(event, handler) {
        let oldHandlers;
        if (oldHandlers = this.events.get(event)) {
            oldHandlers.push(handler);
            this.events.set(event, oldHandlers);
        } else {
            this.events.set(event, [handler]);
        }
        return this;
    }
    /**
     * Отписка от события.
     * @param {string} event
     * @param {callbackfn} handler
     * @return {this}
     */
    off(event, handler) {
        let oldHandlers;
        if (oldHandlers = this.events.get(event)) {
            oldHandlers.splice(oldHandlers.indexOf(handler), 1);
        }
        return this;
    }
    /**
     * Вызов события.
     * @param {string} event
     * @return {this}
     */
    emit(event) {
        const events = this.events.get(event) || [];
        events.forEach((handler) => {
            handler();
        });
        return this;
    }
}
export default Emitter;

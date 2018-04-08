# Emitter
[GitHub Pages: Event Emitter](https://dezmound.github.io/y.h.6/emitter/)    
`Event Emitter` в данной реализации использует хэш таблицы для хранения массива обработчиков.    
Оценка сложности методов:
```javascript
// В худшем случае O(N), в среднем O(1) амортизированное    
on(event, handler) {
    let oldHandlers;
    /* Обращение к элементу по индексу O(1) */
    if (oldHandlers = this.events.get(event)) {
        /* Добавление элемента в массив O(1) амортизированное */
        oldHandlers.push(handler);
        this.events.set(event, oldHandlers);
    } else {
        this.events.set(event, [handler]);
    }
    return this;
}
// В худшем случае O(N)
off(event, handler) {
    let oldHandlers;
    /* Обращение к элементу по индексу O(1) */
    if (oldHandlers = this.events.get(event)) {
        /* Поиск элемента по индексу O(N) */
        oldHandlers.splice(oldHandlers.indexOf(handler), 1);
    }
    return this;
}
// O(N)
emit(event) {
    /* Обращение к элементу по индексу O(1) */
    const events = this.events.get(event) || [];
    /* Проход по массиву обработчиков O(N) */
    events.forEach((handler) => {
        handler();
    });
    return this;
}
``` 
```
emitter/
├── emitter.js // Реализация класса
├── index.html
└── main.js
```
# Suggest
[GitHub Pages: Suggest](https://dezmound.github.io/y.h.6/suggest/)   

Реализовал два вида поиска. Один строит хэш таблицу подстрок по массиву, второй простой indexOf() по элементам массива.

```javascript
/* Строит хэш таблицу подстрок для элементов массива. Поиск - взятие элемента из Map по ключу.
Сложность поиска O(1). Основное время работы уходит для создания индекса.
Кушает прилично оперативной памяти. Нет смысла использовать его если осуществляется
поиск по длинным строкам или количество элементов в массиве больше 3000
(в моем случае на хранение данных уходит около 60мб). */
class SearcherFastFat extends Searcher {}
/* Поиск осуществляется простым перебором элементов массива и поиска в них подстроки.
Сложность соответсвенно зависит от количества элементов в массиве строк - N,
а так же от длин строк в этом массиве, если взять среднее значение M, получается
сложность O(N x M).
В общем случае получается квадратиченая сложность поиска O(N^2). */
class SearcherSlowSlender extends Searcher {}
```
```
suggest/
├── index.html
├── main.js
├── search.js // Модуль поиска
└── streets.js // Набор тестовых данных
```

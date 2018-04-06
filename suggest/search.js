/**
 * Абстракция для класса поиска по массиву строк.
 */
class Searcher {
    /**
     * Конструктор класса
     * @param {string[]} data
     */
    constructor(data) {
        this._cached = data;
        this._init();
    }
    /**
     * Инициализация поиска
     */
    _init() {}
    /**
     * Поиск подстроки в массиве строк
     * @param {string} string
     * @param {number} limitations
     * @return {string[]}
     */
    suggest(string, limitations = -1) {
        return [];
    }
}
/**
 * Быстрый толстый поиск. Кушает много памяти для построения индекса,
 * но работает достаточно быстро.
 */
class SearcherFastFat extends Searcher {
    /**
     * @inheritDoc
     */
    suggest(string, limitations = -1) {
        const _result = this._map.get(string.toLocaleLowerCase());
        if (_result) {
            return _result.slice(0, limitations);
        }
        return [];
    }
    /**
     * @inheritDoc
     */
    _init() {
        this._map = this._buildIndex(this._cached);
    }
    /**
     * Формирует индексы для массива строк
     * @param {string[]} data
     * @param {number} minWordLength
     * @return {Map<string>}
     */
    _buildIndex(data, minWordLength) {
        const map = new Map();
        data.forEach((value) => {
            const set = this._getSubstringSet(value.toLocaleLowerCase());
            set.forEach((key) => {
                let oldValue;
                if (oldValue = map.get(key)) {
                    oldValue.push(value);
                    map.set(key, oldValue);
                } else {
                    map.set(key, [value]);
                }
            });
        });
        return map;
    }
    /**
     * Возвращает множество подстрок этой строки.
     * @param {string} string
     * @param {number} minStringLength
     * @return {Set<string>}
     */
    _getSubstringSet(string, minStringLength = 1) {
        const set = new Set();
        for (
            let startAt = 0;
            startAt <= (string.length - minStringLength);
            startAt++
        ) {
            for (let i = startAt; i < string.length; i++) {
                for (
                    let length = minStringLength;
                    i + length <= string.length;
                    length++
                ) {
                    set.add(string.substr(i, length));
                }
            }
        }
        return set;
    }
}
/**
 * Медленный тонкий поиск.
 */
class SearcherSlowSlender extends Searcher {
    /**
     * @inheritDoc
     */
    suggest(string, limitations = -1) {
        const _result = [];
        string = string.toLocaleLowerCase();
        this._data.forEach((value, index) => {
            if (string && value.indexOf(string) >= 0) {
                _result.push(this._cached[index]);
            }
        });
        return _result.slice(0, limitations);
    }
    /**
     * @inheritDoc
     */
    _init() {
        this._data = this._cached.map((string) => string.toLocaleLowerCase());
    }
}

export {SearcherFastFat, SearcherSlowSlender, Searcher};

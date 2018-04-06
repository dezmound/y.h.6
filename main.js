/* eslint no-invalid-this: "off" */
import data from './streets.js';
let cahced = [];
let map = [];
document.getElementById('search').addEventListener('input', function() {
    const suggested = suggest(this.value.trim(), data);
    if (suggested) {
        document.getElementById('suggested').innerText = suggested.toString();
    } else {
        document.getElementById('suggested').innerText = '';
    }
});

/**
 * Поиск предложений по входной строке
 * @param {string} searched
 * @param {string[]} data
 * @return {stirng[]}
 */
function suggest(searched, data) {
    if (cahced != data) {
        cahced = data;
        map = buildIndex(data);
    }
    return map.get(searched.toLocaleLowerCase());
}
/**
 * Формирует индексы для массива строк
 * @param {string[]} data
 * @param {number} minWordLength
 * @return {Map<string>}
 */
function buildIndex(data, minWordLength) {
    const map = new Map();
    data.forEach((value) => {
        const set = getSubstringSet(value.toLocaleLowerCase());
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
function getSubstringSet(string, minStringLength = 1) {
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

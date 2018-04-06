/* eslint no-invalid-this: "off" */
import data from './streets.js';
import {SearcherFastFat, SearcherSlowSlender} from './search.js';

const searcherFastFat = new SearcherFastFat(data);
const searcherSlowSlender = new SearcherSlowSlender(data);

document.getElementById('search-ff').addEventListener('input', function() {
    const suggested = searcherFastFat.suggest(this.value.trim(), 10);
    if (suggested) {
        document.getElementById('suggested-ff').innerText =
            suggested.toString();
    } else {
        document.getElementById('suggested-ff').innerText = '';
    }
});
document.getElementById('search-ss').addEventListener('input', function() {
    const suggested = searcherSlowSlender.suggest(this.value.trim(), 10);
    if (suggested) {
        document.getElementById('suggested-ss').innerText =
            suggested.toString();
    } else {
        document.getElementById('suggested-ss').innerText = '';
    }
});


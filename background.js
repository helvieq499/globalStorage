cache = {};

// note: these 2 event handlers can be merge for perf
// [setter-guid, section, values]
window.addEventListener("message", event => {
    if (!Array.isArray(event.data) 
        || event.data.length != 3 
        || event.data[0] != "1bc85e29-1f2d-462e-9e09-72fa5eb99b34") return;
    cache[event.data[1]] = event.data[2];
    localStorage.setItem(event.data[1], JSON.stringify(event.data[2]));
});

// [getter-guid, section]
window.addEventListener("message", event => {
    if (!Array.isArray(event.data) 
        || event.data.length != 2 
        || event.data[0] != "c62f7e27-4d05-402c-8ad2-8f47a0105614") return;
    event.source.postMessage(getValue(event.data[1]), "*");
});

function getValue(section) {
    let val = cache[section];
    if (!val) 
        return cache[section] = JSON.parse(localStorage.getItem(section));
    else return val;
}

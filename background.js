console.log("Loaded globalStorage");

cache = {};

// section setter
// [guid, section, values]
window.addEventListener("message", event => {
    if (!Array.isArray(event.data) 
        || event.data.length != 3 
        || event.data[0] != "1bc85e29-1f2d-462e-9e09-72fa5eb99b34") return;
    cache[event.data[1]] = event.data[2];
    localStorage.setItem(event.data[1], JSON.stringify(event.data[2]));
});

// section key setter
// [guid, section, key, value]
window.addEventListener("message", event => {
    if (!Array.isArray(event.data) 
        || event.data.length != 3 
        || event.data[0] != "b4fb68dc-6c27-49d5-b39c-610261751bdc") return;
    if (!getValue(event.data[1]))
        cache[event.data[1]] = {};
    cache[event.data[1]][event.data[2]] = event.data[3];
    localStorage.setItem(event.data[1], JSON.stringify(event.data[2]));
});

// section getter
// [guid, section]
window.addEventListener("message", event => {
    if (!Array.isArray(event.data) 
        || event.data.length != 2 
        || event.data[0] != "c62f7e27-4d05-402c-8ad2-8f47a0105614") return;
    window.parent.postMessage(getValue(event.data[1]), "*");
});

// section key getter
// [guid, section, key]
window.addEventListener("message", event => {
    if (!Array.isArray(event.data) 
        || event.data.length != 2 
        || event.data[0] != "0d285481-615f-4262-a1c4-d61d0ea0b348") return;
    window.parent.postMessage(getValue(event.data[1])[event.data[2]], "*");
});

function getValue(section) {
    let val = cache[section];
    if (!val) 
        return cache[section] = JSON.parse(localStorage.getItem(section));
    else return val;
}

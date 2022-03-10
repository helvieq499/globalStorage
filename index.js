globalStorage = {
  __promises: [],
  __iframe: undefined,
  getSection: section => {
    let promise = new Promise((res, rej) => globalStorage.__promises.push([res, rej]));;
    i.contentWindow.postMessage(["c62f7e27-4d05-402c-8ad2-8f47a0105614", section], "*");
    return promise;
  }
}

let i = document.createElement("iframe");
i.src = "https://helvieq499.github.io/globalStorage";
i.style.display = "none";
document.head.appendChild(i);
globalStorage.__iframe = i

window.addEventListener("message", event => {
    if (event.origin != "https://helvieq499.github.io") return;
    globalStorage.__promises.shift()[0](event.data);
});

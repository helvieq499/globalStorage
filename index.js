globalStorage = {
  __promises: [],
  __iframe: undefined,
  __sendMessage: (values, resp) => {
    let promise = undefined;
    if (resp)
      promise = new Promise((res, rej) => globalStorage.__promises.push([res, rej]));;
    i.contentWindow.postMessage(values, "*");
    return promise;
  },
  get: section => globalStorage.__sendMessage(["c62f7e27-4d05-402c-8ad2-8f47a0105614", section], true),
  set: (section, value) => globalStorage.__sendMessage(["1bc85e29-1f2d-462e-9e09-72fa5eb99b34", section, value]),
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

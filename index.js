globalStorage = {
  __iframe,
}

let i = document.createElement("iframe");
i.src = "https://helvie499.github.io/globalStorage";
i.style.display = "none";
document.head.appendChild(i);
global.__iframe = i

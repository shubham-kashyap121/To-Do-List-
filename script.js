let items = []
let itemDiv = document.getElementById("items");
let input = document.getElementById('todoInput')
const storageKey = "items"

function renderItems() {
    itemDiv.innerHTML = '';
    
    for (const [idx,item] of Object.entries(items)) {
        const container = document.createElement('div')
        container.style.marginBottom = '10px'
        
        const text = document.createElement('p')
        text.style.display = 'inline';
        text.style.marginRight = '10px'
        text.textContent = item;
        
         const button = document.createElement('button')
        button.textContent = 'delete'
        button.onclick = ()=> deleteItems(idx);
        
        
        container.appendChild(text)
        container.appendChild(button)
        
        itemDiv.appendChild(container);
    }
}
// renderItems()
input.addEventListener('keypress',(e)=>{
    if (e.key ==="Enter") {
        addIdems()
    }
    saveItems();

})

function addIdems() {
    let value = input.value
    if (value.trim() === '' || !value) {
        alert('Please enter a valid item');
        return;
    }
    items.push(value);
    renderItems()
    input.value=''
    saveItems();
}


function loadItems() {
    const  oldItems = localStorage.getItem(storageKey)
    if (oldItems) items = JSON.parse(oldItems)
        renderItems()
}

 
function saveItems() {
    const stringItems = JSON.stringify(items);
    localStorage.setItem(storageKey,stringItems)
}


function deleteItems(idx) {
    items.splice(idx, 1);
    renderItems();
    saveItems()
}
document.addEventListener('DOMContentLoaded',loadItems)

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("todo-cache").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./script.js"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});

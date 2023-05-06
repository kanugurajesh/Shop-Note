import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://shopping-app-66686-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const dbRef = ref(database, "shopping");
const adder = document.getElementById("shopping-list")
let booksSet = new Set();

function clearList() {
    adder.innerHTML = "";
}

onValue(dbRef, (snapshot) => {
    // store all the snapchat values in a set
    if (snapshot.val() !== null) {
        // store all the snapshot values in a set
        booksSet = new Set(Object.values(snapshot.val()));
    }
    // booksSet = new Set(Object.values(snapshot.val()));

    clearList();

    // iterate over the set and append each item to the shopping list
    booksSet.forEach((book) => {
        appendItemToShoppingList(book);
    });
});

function appendItemToShoppingList(item) {
    let li = document.createElement("li");
    // li.setAttribute("value", 1)
    li.textContent = item;
    adder.appendChild(li);
}


let addtocart = document.getElementById("add-button");

addtocart.addEventListener("click", function () {
    // check if the item is already in the list
    let input = document.getElementById("input-field");

    if (booksSet.has(input.value)) {
        alert("Item already in the list");
        input.value = "";
        return;
    }
    push(dbRef, input.value)
    input.value = "";
});
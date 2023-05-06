// importing functions from the web
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Your web app's Firebase configuration
const appSettings = {
    databaseURL: "https://shopping-app-66686-default-rtdb.asia-southeast1.firebasedatabase.app"
}

// Initialize Firebase
const app = initializeApp(appSettings);
const database = getDatabase(app);
const databaseName = "shopping"
const dbRef = ref(database, databaseName);
const adder = document.getElementById("shopping-list")
let booksData = new Set();

// clear the list
function clearList() {
    adder.innerHTML = "";
}

// get the data from the database
onValue(dbRef, (snapshot) => {
    // store all the snapchat values in a set
    if (snapshot.val() !== null) {
        // store all the snapshot values in a set
        booksData = new Set(Object.entries(snapshot.val()));
    }

    clearList();

    booksData.forEach((book) => {
        appendItemToShoppingList(book);
    });
});

// append the item to the shopping list
function appendItemToShoppingList(item) {
    let li = document.createElement("li");
    li.setAttribute("value", item[0])
    li.textContent = item[1];

    // add a double click event listener to the item

    li.addEventListener("dblclick", function () {

        // get the value attribute of the item
        let value = li.getAttribute("value");
        let exactLocationOfItem = ref(database, databaseName + "/" + value);
        // remove(exactLocationOfItem);
        remove(exactLocationOfItem);
        // reload the database
        location.reload();
    });

    adder.appendChild(li);
}

let addtocart = document.getElementById("add-button");

addtocart.addEventListener("click", function () {
    // check if the item is already in the list
    let input = document.getElementById("input-field");
    if (input.value === "") {
        alert("Please enter a value");
        return;
    }
    for (let book of booksData) {
        if (book[1] === input.value) {
            alert("Item already in the list");
            input.value = "";
            return;
        }
    }

    push(dbRef, input.value)
    input.value = "";
});
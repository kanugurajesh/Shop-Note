/*
Challenge:
Make it so that when you click the 'Add to cart' button, whatever is written in the input field should be console logged.
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const appSettings = {
    databaseURL: "https://shopping-app-66686-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const dbRef = ref(database, "shopping");

console.log(app)

let addtocart = document.getElementById("add-button");

addtocart.addEventListener("click", function () {
    let input = document.getElementById("input-field");
    push(dbRef, input.value)
});
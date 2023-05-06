/*
Challenge:
Make it so that when you click the 'Add to cart' button, whatever is written in the input field should be console logged.
*/

let addtocart = document.getElementById("add-button");

addtocart.addEventListener("click", function () {
    let input = document.getElementById("input-field");
    console.log(input.value);
});
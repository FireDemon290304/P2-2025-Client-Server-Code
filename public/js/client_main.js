'use strict'

function testButton() {
    console.log("test button click :3");
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById("import-button");
    if (button) {
        button.addEventListener("click", testButton);
    }
});

console.log("loaded js");
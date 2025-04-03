'use strict'

function testButton() { console.log("test button click :3"); }

document.getElementById("import-button").addEventListener("click", testButton);

document.addEventListener('DOMContentLoaded', () => {
    console.log("loaded client js"); 
 });
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

function jump() {
    if (dino.classiList != "jump");
    dino.classList.add("jump");

    setTimeout(function () {
        dino.classList.remove("jump")
    }, 500);
}

let isAlive = setInterval(function () {
    
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

    let cactusLeft = parseInt(window.getComputedStyle(dino).getPropertyValue("left"));

    console.log(cactusLeft);

    if (cactusLeft <50 && cactusLeft > 0 && dinoTop >= 140) {

        alert("Game Over!!");
    }

}, 10);

document.addEventListener("keydown", function (event) {
    jump();
});
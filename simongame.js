let gameseq = [];
let userseq = [];
let btns = ["red", "blue", "orange", "purple"];
let started = false;
let level = 0;
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function() {
    if (!started) {
        console.log("Game is started!");
        started = true;
        levelup();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userseq = [];
    level++;
    h3.innerText = `Level ${level}`;
    let randidx = Math.floor(Math.random() * 4); // Corrected
    let randcolor = btns[randidx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    gameflash(randbtn);
}

function checkans(idx) {
    if (userseq[idx] == gameseq[idx]) {
        // If the answer is correct
        let btn = document.querySelector(`.${userseq[idx]}`);
        btn.classList.add("correct");
        setTimeout(function() {
            btn.classList.remove("correct");
        }, 250);

        if (userseq.length == gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        // If the answer is incorrect, flash the whole window red
        document.body.style.backgroundColor = "red";
        setTimeout(function() {
            document.body.style.backgroundColor = ""; // Revert back to default
        }, 250);

        h3.innerHTML = `Game over! Your score: ${level}`;
        reset();
    }
}

let btnpress = function() {
    let btn = this;
    userflash(btn);
    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor); 
    checkans(userseq.length - 1); // Correct function call
}

let allbtns = document.querySelectorAll(".red, .blue, .orange, .purple"); // Corrected selector
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
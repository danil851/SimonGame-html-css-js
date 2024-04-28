const green = document.querySelector(".first");
const red = document.querySelector(".second");
const yellow = document.querySelector(".third");
const blue = document.querySelector(".fourth");
const LooseText = document.querySelector(".loose-text");
const playBtn = document.querySelector(".play-btn");

const body = document.querySelector("body");

const bgc_change = document.querySelector(".backgroundColorC");
const sound_change = document.querySelector(".soundplay");
// const bgc_change = document.querySelector("");

var WhatClicked = "";
var sequenceSpeed = 1000;

var soundPlay = true;
var stage = 1;

var Ready = false;
var ColorSequence = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function delay (t) {
    return new Promise (res => setTimeout (res, t))
}

function playAudio(link) {
    let sound = new Audio(link);
    sound.play();
}

// Функция смены цвета фона
function ChangeBackgroundColor() {
    let color = ["#1E90FF", "#00FA9A", "#009A63", "#EE82EE", "#EBC7DF", "#C76574", "#AEA04B", "#8CCB5E", "#5ABA83", "#50C878", "#459CC4", "#5D76CB"];
    let rand = 0;
    rand = getRandomInt(color.length - 1);
    console.log(rand);
    if (rand == 0) { body.style.backgroundColor = color[rand]; }
    else if (rand == 1) { body.style.backgroundColor = color[rand]; }
    else if (rand == 2) { body.style.backgroundColor = color[rand]; }
    else if (rand == 3) { body.style.backgroundColor = color[rand]; }
    else if (rand == 4) { body.style.backgroundColor = color[rand]; }
    else if (rand == 5) { body.style.backgroundColor = color[rand]; }
    else if (rand == 6) { body.style.backgroundColor = color[rand]; }
    else if (rand == 7) { body.style.backgroundColor = color[rand]; }
    else if (rand == 8) { body.style.backgroundColor = color[rand]; }
    else if (rand == 9) { body.style.backgroundColor = color[rand]; }
    else if (rand == 10) { body.style.backgroundColor = color[rand]; }
};

async function changeColor(color) {
    if (WhatClicked == "g") {
        green.style.backgroundColor = color;
        await delay(200);
        green.style.backgroundColor = null;
    } else if (WhatClicked == "r") {
        red.style.backgroundColor = color;
        await delay(200);
        red.style.backgroundColor = null;
    }else if (WhatClicked == "y") {
        yellow.style.backgroundColor = color;
        await delay(200);
        yellow.style.backgroundColor = null;
    }else if (WhatClicked == "b") {
        blue.style.backgroundColor = color;
        await delay(200);
        blue.style.backgroundColor = null;
    }
};

function ColorSequenceGenerate() {
    let rand = 0;
    let arreyLength = 0;
    Ready = false;
    ColorSequence.splice(0, ColorSequence.length);
    if (stage == 1) {
        arreyLength = 4;
    } else if (stage == 2) {
        arreyLength = 6;
        sequenceSpeed = 750;
    } else if (stage == 3) {
        arreyLength = 8;
        sequenceSpeed = 750;
    } else if (stage == 4) {
        arreyLength = 10;
        sequenceSpeed = 750;
    } else if (stage == 5) {
        arreyLength = 12;
        sequenceSpeed = 500;
    } else if (stage == 6) {
        arreyLength = 14;
        sequenceSpeed = 500;
    } else if (stage == 7) {
        arreyLength = 16;
        sequenceSpeed = 500;
    } else if (stage == 8) {
        arreyLength = 18;
        sequenceSpeed = 350;
    } else if (stage == 9) {
        arreyLength = 20;
        sequenceSpeed = 300;
    } else if (stage >= 10) {
        arreyLength = 25;
        sequenceSpeed = 250;
    }
    for (let i = 0; i < arreyLength; i++) {
        rand = getRandomInt(4);
        if (rand == 0) {
            rand = getRandomInt(4);
            if (rand == 0) {
                ColorSequence.push("r");
            } else if (rand == 1) {
                ColorSequence.push("y");
            } else if (rand == 2) {
                ColorSequence.push("b");
            } else if (rand == 3) {
                ColorSequence.push("g");
            }
        } else if (rand == 1) {
            rand = getRandomInt(4);
            if (rand == 0) {
                ColorSequence.push("y");
            } else if (rand == 1) {
                ColorSequence.push("g");
            } else if (rand == 2) {
                ColorSequence.push("b");
            } else if (rand == 3) {
                ColorSequence.push("r");
            }
        } else if (rand == 2) {
            rand = getRandomInt(4);
            if (rand == 0) {
                ColorSequence.push("r");
            } else if (rand == 1) {
                ColorSequence.push("b");
            } else if (rand == 2) {
                ColorSequence.push("g");
            } else if (rand == 3) {
                ColorSequence.push("y");
            }
        } else if (rand == 3) {
            rand = getRandomInt(4);
            if (rand == 0) {
                ColorSequence.push("y");
            } else if (rand == 1) {
                ColorSequence.push("b");
            } else if (rand == 2) {
                ColorSequence.push("r");
            } else if (rand == 3) {
                ColorSequence.push("g");
            }
        }
    }
};

function ColorCheck() {
    let loose = false;
    for (let i = 0; i < 1; i++){
        if (WhatClicked == ColorSequence[i]) {
            ColorSequence.shift()[i];
            changeColor("#00FF7F");
        } else {
            changeColor("#DC143C");
            loose = true;
        }
        if (ColorSequence.length <= 0 && !loose) {
            playBtn.textContent = "Следующий этап";
            playBtn.removeAttribute('disabled');
            LooseText.style.textDecorationColor = "lime";
            LooseText.textContent = "этап №" + stage + " пройден!\nПереход к след. этапу.";
            Ready = false;
            stage++;
        } else if (loose){
            playBtn.textContent = "Заново";
            playBtn.removeAttribute('disabled');
            LooseText.style.textDecorationColor = "red";
            LooseText.textContent = "Вы ошиблись, игра остановлена!";
            Ready = false;
            stage = 1;
        }
    }
}

async function ColorPlay() {
    Ready = false;
    playBtn.setAttribute('disabled', '');
    LooseText.style.textDecorationColor = "gray";
    LooseText.textContent = "Запоминайте...";
    for (let i = 0; i < ColorSequence.length; i++) {
        var Sequence = ColorSequence[i]; 
        // console.log(Sequence);
        if (Sequence == "g") {
            if(soundPlay)playAudio("sound/green.wav");
            green.style.backgroundColor = "#006400";
            await delay(sequenceSpeed);
            green.style.backgroundColor =  null;
            await delay(200);
        } else if (Sequence == "r") {
            if(soundPlay)playAudio("sound/red.wav");
            red.style.backgroundColor = "#8B0000";
            await delay(sequenceSpeed);
            red.style.backgroundColor =  null;
            await delay(200);
        } else if (Sequence == "y") {
            if(soundPlay)playAudio("sound/yellow.wav");
            yellow.style.backgroundColor = "#808000";
            await delay(sequenceSpeed);
            yellow.style.backgroundColor =  null;
            await delay(200);
        } else if (Sequence == "b") {
            if(soundPlay)playAudio("sound/blue.wav");
            blue.style.backgroundColor = "#00008B";
            await delay(sequenceSpeed);
            blue.style.backgroundColor =  null;
            await delay(200);
        }
    }
    Ready = true;
    LooseText.style.textDecorationColor = "gray";
    LooseText.textContent = "Повторяйте...";
};

document.querySelector(".play-btn").addEventListener("click", function () {
    playBtn.setAttribute('disabled', '');
    ColorSequenceGenerate();
    ColorPlay();
});

sound_change.addEventListener("click", function() {
    if (soundPlay) {
        soundPlay = false;
        sound_change.style.textDecorationColor = "red";
        sound_change.textContent = "Включить звуки";
    } else if (!soundPlay) {
        soundPlay = true;
        sound_change.style.textDecorationColor = "greenyellow";
        sound_change.textContent = "Выключить звуки";
    }
});

bgc_change.addEventListener("click", function () {
    ChangeBackgroundColor();
});

green.addEventListener("click", function () {
    WhatClicked = "g";
    if(soundPlay){playAudio("sound/green.wav");}
    if(Ready){ColorCheck();}
});

red.addEventListener("click", function () {
    WhatClicked = "r";
    if(soundPlay)playAudio("sound/red.wav");
    if(Ready){ColorCheck();}
});

yellow.addEventListener("click", function () {
    WhatClicked = "y";
    if(soundPlay)playAudio("sound/yellow.wav");
    if(Ready){ColorCheck();}
});

blue.addEventListener("click", function () {
    WhatClicked = "b";
    if(soundPlay)playAudio("sound/blue.wav");
    if(Ready){ColorCheck();}
});

body.onload(ChangeBackgroundColor());
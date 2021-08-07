let yourVoteFor = document.querySelector('.d-1 span');
let title = document.querySelector('.d-1-2 span');
let numbersLetter = document.querySelector('.d-1-3-model');
let numbers_Space = document.querySelector('.d-1-3-spaceN');
let description = document.querySelector('.d-1-4');
let notice = document.querySelector('.screen-description');
let sideRight = document.querySelector('.screen-candidates');

let currentStage = 0;
let number = "";
let blankVote = false;
let BDVotes = [];

function startStage() {
    let stage = stages[currentStage];
    let numbersHtml = '';
    number = "";
    blankVote = false;

    for (let i = 0; i < stage.numbers; i++) {
        if (i === 0) {
            numbersHtml += '<div class="numero pisca"></div>';
        } else {
            numbersHtml += '<div class="numero"></div>';
        }
    }

    yourVoteFor.style.display = 'none';
    title.innerHTML = stage.title;
    description.innerHTML = "";
    notice.style.display = 'none';
    sideRight.innerHTML = "";
    numbersLetter.style.display = 'none';
    numbers_Space.innerHTML = numbersHtml;
}

function updateInterface() {
    let stage = stages[currentStage];
    let candidate = stage.candidates.filter((item) => {
        if (item.number === number) {
            numbersLetter.style.display = "block";
            return true
        } else {
            return false
        }
    });

    if (candidate.length > 0) {
        candidate = candidate[0];
        yourVoteFor.style.display = "block";
        notice.style.display = "block";
        description.innerHTML = `Nome: ${candidate.name}<br/>Partido: ${candidate.party}`;

        let picturesHtml = "";
        for (let i in candidate.pictures) {
            if (candidate.pictures[i].small) {
                picturesHtml += `<div class="d-1-image small"><img src="${candidate.pictures[i].url}" alt=""></img>${candidate.pictures[i].subtitle}</div>`;
            } else {
                picturesHtml += `<div class="d-1-image"><img src="${candidate.pictures[i].url}" alt=""></img>${candidate.pictures[i].subtitle}</div>`;
            }
        }

        sideRight.innerHTML = picturesHtml;

    } else {
        yourVoteFor.style.display = "block";
        notice.style.display = "block";
        description.innerHTML = `<div class="big-warning-number">NÚMERO ERRADO</div>
                                <div class="big-warning pisca">VOTO NULO</div>`;
    }
}

function clickButton(n) {
    let elNumber = document.querySelector(".numero.pisca");

    if (elNumber !== null) {
        elNumber.innerHTML = n;
        number = `${number}${n}`;

        elNumber.classList.remove('pisca');

        if (elNumber.nextElementSibling !== null) {
            elNumber.nextElementSibling.classList.add('pisca');
        } else {
            updateInterface();
        }

    }
}

function blank() {
    if (number === '') {
        blankVote = true;
        yourVoteFor.style.display = 'block';
        notice.style.display = 'block';
        numbersLetter.style.display = 'none';
        numbers_Space.innerHTML = "";
        description.innerHTML = `<div class="big-warning-blank pisca">VOTO EM BRANCO</div>`;
    } else {
        alert("Para votar em BRANCO, o campo de voto deve estar vazio.\nAperte CORRIGE para apagar o campo de voto.");
    }
}

function fix() {
    startStage();
}

function done() {
    let stage = stages[currentStage];
    let doneVote = false;

    if (blankVote === true) {
        doneVote = true;
        BDVotes.push({
            etapa: stages[currentStage].title,
            voto: 'Branco' 
        });
    } else if (number.length === stage.numbers) {
        doneVote = true;
        BDVotes.push({
            etapa: stages[currentStage].title,
            voto: number 
        });
    }

    if (doneVote) {
        currentStage++;
        if (stages[currentStage] !== undefined) {
            startStage();
        } else {
            document.querySelector(".screen").innerHTML = `<div class="giant-warning">FIM</div>`;
            console.log(BDVotes);
        }
    }
}

startStage();
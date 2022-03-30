const localURL = "http://localhost:4040"
const leagueURL = 'https://ddragon.leagueoflegends.com/cdn'
const champions = "/12.5.1/data/en_US"
const splash = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading"

const fortuneBtn = document.getElementById("fortuneButton");
const resultBox = document.getElementById('result');
const luckyBtn = document.getElementById("luckyButton");
const luckyResult = document.getElementById('numResult');
const leagueResult = document.getElementsByClassName('league-result-box');
const leagueButton = document.getElementById('leagueButton')
const leagueChImg = document.getElementsByClassName('league-chsplash')
const leagueChName = document.getElementsByClassName('league-charname')
const leagueChLore = document.getElementsByClassName('league-chlore')
const faveButton = document.getElementById('faveButton')
const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const header = document.querySelector('.header.container')
const eightballImg = document.getElementById('eightballimg')
const eightballResponse = document.getElementById('response')

function fortune() {
    axios.get(`/api/fortune`).then(res => {
        // alert(res.data);
        resultBox.textContent = res.data;
    })
};

function luckyNum(e) {
    axios.get(`/api/luckyNumber`).then(res => {
        e.preventDefault();
        luckyResult.textContent = res.data;
        
    })
};

function eightballRess() {
    axios.get(`/api/eightball`).then(res => {
        eightballResponse.textContent = res.data;     
    })
};

function leagueChamp() {
    axios.get(`${leagueURL}${champions}/champion.json`).then(res => {
        faveButton.src = './image/faveButton.png'
        faveButton.setAttribute('height','32px')
        faveButton.setAttribute('width','32px')
        const name = Object.keys(res.data.data)
        const randomName  = name[Math.floor(Math.random()*name.length)];
        leagueChName[0].textContent = randomName;
        leagueChImg[0].src = `${splash}/${randomName}_0.jpg`;
        axios.get(`https://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion/${randomName}.json`).then(res => {
            const chName = Object.values(res.data.data)
            leagueChLore[0].textContent = 'Lore: ' + chName[0].lore
        })
    })
    axios.get(`/api/faveChamp`).then(res => {
        const champName = leagueChName[0].innerHTML
        if(res.data.includes(champName)) {
            faveButton.setAttribute('src','./image/favedButton.png')
        } else {
            faveButton.src = './image/faveButton.png'
        }
    })
};

function faveButtonChange() {
    const champName = leagueChName[0].innerHTML
    axios.post(`/api/faveChamp`, {name:champName}).then(res => {  
        
    })
    axios.get(`/api/faveChamp`).then(res => {
        if(res.data.includes(champName)) {
            faveButton.setAttribute('src','./image/favedButton.png')
        } else {
            faveButton.src = './image/faveButton.png'
        }
    })
}

fortuneBtn.addEventListener('click',fortune);
luckyBtn.addEventListener('click',luckyNum);
eightballImg.addEventListener('click', eightballRess);
leagueButton.addEventListener('click',leagueChamp);
faveButton.addEventListener('click',faveButtonChange);
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll',() => {
    let scroll_position = window.scrollY;
    if(scroll_position > 250) {
        header.style.backgroundColor = "#29323c";
    } else {
        header.style.backgroundColor = "transparent";
    }
})
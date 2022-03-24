const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../website")));

const fortune = ["A pleasant surprise is waiting for you.",
  "A smooth long journey! Great expectations.",
  "An important person will offer you support.",
  "Better ask twice than lose yourself once.",
  "Bide your time, for success is near.",
  "Love can last a lifetime, if you want it to.",
  "The love of your life is stepping into your planet this summer.",
  "Wealth awaits you very soon.",
  "Keep your eye out for someone special.",
  "Its amazing how much good you can do if you dont care who gets the credit."];

const luckyNum = ['1','2','3','4','5','6','7','8','9','10'];

let faveChamps = [];

app.get("/api/fortune", (req, res) => {
    let randomIndex = Math.floor(Math.random()*fortune.length);
    let randomFortune = fortune[randomIndex];

    res.status(200).send(randomFortune);
})
app.get("/api/luckyNumber", (req, res) => {
  let randomIndex = Math.floor(Math.random()*luckyNum.length);
  let randomNumber = luckyNum[randomIndex];

  res.status(200).send(`Your lucky number is ${randomNumber}!`);
})

app.post("/api/faveChamp", (req, res) => {
  if(faveChamps.includes(req.body.name)){
    let index = faveChamps.indexOf(req.body.name)
    faveChamps.splice(index, 1)
    res.status(200).send('your favorite champion has been removed');
  } else {
    faveChamps.push(req.body.name)
    res.status(200).send('your favorite champion has been added!');
  }
})

app.get("/api/faveChamp", (req, res) => {
  res.status(200).send(faveChamps)
})

const PORT_NUMBER = process.env.PORT || 4004;

app.listen(PORT_NUMBER, () => {
    console.log('WE ARE LIVE!')
})

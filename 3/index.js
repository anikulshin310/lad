const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomNumber() {
  let numLength = getRandomInt(3, 6);
  let num = [];
  while (num.length < numLength) {
    let randomnumber = getRandomInt(0, 9);
    if (num.indexOf(randomnumber) > -1) continue;
    num[num.length] = randomnumber;
  }
  return num.join("");
}

let randomNumber = getRandomNumber();
function checkAnswer(num1, num2) {
  let correctNumPlace = [];
  let correctNums = [];
  for (let i = 0; i < num1.length; i++) {
    if (num1[i] === num2[i]) {
      correctNumPlace.push(num2[i]);
    }
    if (num1[i] !== num2[i] && num1.includes(num2[i])) {
      correctNums.push(num2[i]);
    }
  }

  console.log(
    `Цифр на своих местах - ${correctNumPlace.length}(${correctNumPlace.join(
      ","
    )}). Совпавших цифр не на своих местах - ${
      correctNums.length
    }(${correctNums.join(",")})`
  );
  console.log(`Осталось попыток: ${attempts}`);
}
let attempts = 10;

rl.setPrompt(
  `Угадайте число состоящее из ${randomNumber.length} цифр
`
);
rl.prompt();
rl.on("line", function (answer) {
  let answerNumber = answer;
  attempts--;
  if (randomNumber === answerNumber) {
    console.log("Вы угадали!");
    process.exit(0);
  }
  if (attempts === 0) {
    console.log(`Вы проиграли! Было загадано число ${randomNumber}`);
    process.exit(0);
  } else {
    checkAnswer(randomNumber, answerNumber);
  }
});

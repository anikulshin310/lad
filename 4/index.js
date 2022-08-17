const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Game {
  diffuculty;
  player;
  monster;
  constructor(player, monster) {
    this.player = player;
    this.monster = monster;
  }
  chooseDificulty() {
    rl.question(
      `Выберите сложность:
    1)Легко
    2)Нормально
    3)Сложно
    `,
      (answer) => {
        switch (answer) {
          case "1":
            this.diffuculty = "Легко";
            this.player.maxHealth = this.player.maxHealth + 5;
            break;
          case "2":
            this.diffuculty = "Нормально";
            this.player.maxHealth = this.player.maxHealth + 3;
            break;
          case "3":
            this.diffuculty = "Сложно";
            this.player.maxHealth = this.player.maxHealth + 1;
            break;
          default:
            break;
        }
        this.startGame();
      }
    );
  }
  calculateDamage(playerSkill, monsterSkill) {
    var playerDamage =
      playerSkill.physicalDmg -
      (playerSkill.physicalDmg / 100) * monsterSkill.physicArmorPercents +
      (playerSkill.magicDmg -
        (playerSkill.magicDmg / 100) * monsterSkill.magicArmorPercents);
    var monsterDamage =
      monsterSkill.physicalDmg -
      (monsterSkill.physicalDmg / 100) * playerSkill.physicArmorPercents +
      (monsterSkill.magicDmg -
        (monsterSkill.magicDmg / 100) * playerSkill.magicArmorPercents);
    this.monster.maxHealth = this.monster.maxHealth - Math.ceil(playerDamage);
    this.player.maxHealth = this.player.maxHealth - Math.ceil(monsterDamage);
  }
  startGame() {
    this.monster.chooseRandomSkill();
    console.log(
      `Выберите умение: ${this.player.moves.map(
        (move) =>
          ` \n${this.player.moves.indexOf(move)}) ${
            move.name
          } (Физический урон:${move.physicalDmg}, Магический урон:${
            move.magicDmg
          }, Защита от физического урона: ${
            move.physicArmorPercents
          }%, Защита от магического урона ${
            move.magicArmorPercents
          }%, кулдаун:${move.cooldown})`
      )}`
    );

    console.log(
      `\nВаше текущее здоровье: ${this.player.maxHealth}. Здоровье врага: ${this.monster.maxHealth}`
    );
    rl.on("line", (answer) => {
      if (this.player.maxHealth >= 0) {
        this.calculateDamage(this.player.moves[answer], this.monster.usedSkill);
        this.player.setCooldown(answer);
        this.monster.chooseRandomSkill();

        var available = this.player.setAvailable();

        console.log(
          `Выберите умение: ${available.map(
            (move) =>
              ` \n${this.player.moves.findIndex(
                (el) => move.name === el.name
              )}) ${move.name} (Физический урон:${
                move.physicalDmg
              }, Магический урон:${
                move.magicDmg
              }, Защита от физического урона: ${
                move.physicArmorPercents
              }%, Защита от магического урона: ${
                move.magicArmorPercents
              }%, кулдаун:${move.cooldown})`
          )}`
        );
        console.log(
          `\nВаше текущее здоровье: ${this.player.maxHealth}. Здоровье врага: ${this.monster.maxHealth}`
        );
      }
      if (this.player.maxHealth < 1) {
        console.log("Вы проиграли!");
        rl.close();
      }
      if (this.player.maxHealth > 0 && this.monster.maxHealth <= 0) {
        console.log("Вы победили!");
        rl.close();
      }
    });
  }
}

class Player {
  constructor(name, maxHealth, moves) {
    this.name = name;
    this.maxHealth = maxHealth;
    this.moves = moves;
  }
  usedSkill;
  setAvailable() {
    var usedSkills = this.movesOnCd.map((item) => item[0]);
    var available = this.moves.filter(
      (item) => !usedSkills.includes(item.name)
    );
    return available;
  }
  setCooldown(skill) {
    this.movesOnCd.forEach((item, i) => {
      item[1] = item[1] - 1;
      if (item[1] < 1) {
        this.movesOnCd.splice(i, 1);
      }
    });

    if (this.moves[skill].cooldown !== 0) {
      this.movesOnCd.push([this.moves[skill].name, this.moves[skill].cooldown]);
    }
  }

  movesOnCd = [];
}
class Monster extends Player {
  chooseRandomSkill() {
    function getRandomInt(array) {
      var rand = (Math.random() * array.length) | 0;
      var rValue = array[rand];
      return rValue;
    }

    var available = this.setAvailable();
    var availableIndex = available.map((move) =>
      this.moves.findIndex((el) => move.name === el.name)
    );
    var skillIndex = getRandomInt(availableIndex);
    this.setCooldown(skillIndex);
    this.usedSkill = this.moves[skillIndex];

    console.log(
      `${this.name} собирается использовать ${this.moves[skillIndex].name} (Физический урон:${this.moves[skillIndex].physicalDmg}, Магический урон:${this.moves[skillIndex].magicDmg}, Защита от физического урона: ${this.moves[skillIndex].physicArmorPercents}%, Защита от магического урона ${this.moves[skillIndex].magicArmorPercents}%, кулдаун:${this.moves[skillIndex].cooldown})`
    );
  }
}
var player = new Player("Евстафий", 7, [
  {
    name: "Удар боевым кадилом",
    physicalDmg: 2,
    magicDmg: 0,
    physicArmorPercents: 0,
    magicArmorPercents: 50,
    cooldown: 0,
  },
  {
    name: "Вертушка левой пяткой",
    physicalDmg: 4,
    magicDmg: 0,
    physicArmorPercents: 0,
    magicArmorPercents: 0,
    cooldown: 4,
  },
  {
    name: "Каноничный фаербол",
    physicalDmg: 0,
    magicDmg: 5,
    physicArmorPercents: 0,
    magicArmorPercents: 0,
    cooldown: 3,
  },
  {
    name: "Магический блок",
    physicalDmg: 0,
    magicDmg: 0,
    physicArmorPercents: 100,
    magicArmorPercents: 100,
    cooldown: 4,
  },
]);
var monster = new Monster("Лютый", 10, [
  {
    name: "Удар когтистой лапой",
    physicalDmg: 3, // физический урон
    magicDmg: 0, // магический урон
    physicArmorPercents: 20, // физическая броня
    magicArmorPercents: 20, // магическая броня
    cooldown: 0, // ходов на восстановление
  },
  {
    name: "Огненное дыхание",
    physicalDmg: 0,
    magicDmg: 4,
    physicArmorPercents: 0,
    magicArmorPercents: 0,
    cooldown: 3,
  },
  {
    name: "Удар хвостом",
    physicalDmg: 2,
    magicDmg: 0,
    physicArmorPercents: 50,
    magicArmorPercents: 0,
    cooldown: 2,
  },
]);
var game = new Game(player, monster);

game.chooseDificulty();

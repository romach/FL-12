function Fighter({ name, damage, hp, strength, agility }) {
  const totalHP = hp;
  let winsCount = 0;
  let lossesCount = 0;
  return {
    __proto__: this,
    getName: () => name,
    getDamage: () => damage,
    getStrength: () => strength,
    getAgility: () => agility,
    getHealth: () => hp,
    attack: defender => {
      const HUNDRED = 100;
      const damageResistence =
        (defender.getStrength() + defender.getAgility()) / HUNDRED;
      const attackValue = Math.random();
      if (attackValue > damageResistence) {
        defender.dealDamage(damage);
        console.log(`${name} makes ${damage} to ${defender.getName()}`);
      } else {
        console.log(`${name} attack missed`);
      }
    },
    logCombatHistory: () => {
      console.log(`Name: ${name}, Wins: ${winsCount}, Losses: ${lossesCount}`);
    },
    heal: healPoints => {
      const increasedHealth = hp + healPoints;
      hp = increasedHealth > totalHP ? totalHP : increasedHealth;
    },
    dealDamage: damagePoints => {
      const decreasedHealth = hp - damagePoints;
      hp = decreasedHealth < 0 ? 0 : decreasedHealth;
    },
    addWin: () => winsCount++,
    addLoss: () => lossesCount++
  };
}

function battle(attacker, defender) {
  const deadFighter = getDeadFighter(attacker, defender);
  if (deadFighter) {
    console.log(`${deadFighter.getName()} is dead and can't fight.`);
    return;
  }
  while (attacker.getHealth() > 0 && defender.getHealth() > 0) {
    attacker.attack(defender);
    [attacker, defender] = [defender, attacker]; //swap fighters
  }
  const winner =
    attacker.getHealth() > defender.getHealth() ? attacker : defender;
  const loser =
    attacker.getHealth() < defender.getHealth() ? attacker : defender;
  winner.addWin();
  loser.addLoss();
  console.log(`${winner.getName()} has won!`);

  function getDeadFighter(...fighters) {
    return fighters.find(fighter => fighter.getHealth() === 0);
  }
}

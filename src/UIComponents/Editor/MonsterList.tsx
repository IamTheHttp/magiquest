import React from 'react';
import monsterJSONData from '../../data/json/characters.json';

type MonsterDataJSON = {
  id: string;
  displayName: string;
  dmg: string;
  health: string;
  speed: string;
  vision: string;
  attackSpeed: string;
  radius: string;
  animationTypes: string;
};

/**
 * Displays the JSON data for each zone, and provides a button to navigate between them
 * @param props
 * @constructor
 */
export function MonsterList() {
  const monsters: MonsterDataJSON[] = [];
  for (let monsterID in monsterJSONData) {
    monsters.push(monsterJSONData[monsterID]);
  }

  const trs = monsters.map((monster: MonsterDataJSON) => {
    return (
      <tr>
        <td>{monster.id}</td>
        <td>{monster.displayName}</td>
        <td>{monster.dmg}</td>
        <td>{monster.health}</td>
        <td>{monster.speed}</td>
        <td>{monster.vision}</td>
        <td>{monster.attackSpeed}</td>
        <td>{monster.radius}</td>
        <td>{monster.animationTypes}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>display name</th>
          <th>damage</th>
          <th>health</th>
          <th>speed</th>
          <th>vision</th>
          <th>attackSpeed</th>
          <th>radius</th>
          <th>animationTypes</th>
        </tr>
      </thead>
      <tbody>{trs}</tbody>
    </table>
  );
}

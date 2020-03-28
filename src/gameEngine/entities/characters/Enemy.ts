import AIControlledComp from '../../components/AIControlledComp';
import SpawnedComponent from "components/SpawnedComponent";
import {LEVEL_COMP, SPAWNED_COMP} from "components/ComponentNamesConfig";
import LevelComp from "components/LevelComp";
import {ICharacterConfig, ICharacterInstanceAttr} from "entities/characters/ICharacterConfig";
import Character from "entities/characters/Character";


class Enemy extends Character {
  [SPAWNED_COMP]: SpawnedComponent;
  [LEVEL_COMP]: LevelComp;
  constructor(instanceAttributes: ICharacterInstanceAttr, charConfig:ICharacterConfig) {
    super(instanceAttributes, charConfig);
    let {col, row, characterLevel, spawningTileLocationID} = instanceAttributes;
    let {speed, health, radius, dmg, attackSpeed, vision, animationTypes, id, displayName} = charConfig;

    this.addComponent(new SpawnedComponent(spawningTileLocationID));
    this.addComponent(new AIControlledComp());
  }
}

export default Enemy;
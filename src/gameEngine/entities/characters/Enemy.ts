import {ICharacterConfig, ICharacterInstanceAttr} from './ICharacterConfig';
import {LEVEL_COMP, SPAWNED_COMP} from '../../components/ComponentNamesConfig';
import LevelComp from '../../components/LevelComp';
import AIControlledComp from '../../components/AIControlledComp';
import Character from './Character';
import SpawnedComponent from '../../components/SpawnedComponent';

class Enemy extends Character {
  [SPAWNED_COMP]: SpawnedComponent;
  [LEVEL_COMP]: LevelComp;
  constructor(instanceAttributes: ICharacterInstanceAttr, charConfig: ICharacterConfig) {
    super(instanceAttributes, charConfig);
    let {col, row, characterLevel, spawningTileLocationID} = instanceAttributes;
    let {speed, health, radius, dmg, attackSpeed, vision, animationTypes, id, displayName} = charConfig;

    this.addComponent(new SpawnedComponent(spawningTileLocationID));
    this.addComponent(new AIControlledComp());
  }
}

export default Enemy;

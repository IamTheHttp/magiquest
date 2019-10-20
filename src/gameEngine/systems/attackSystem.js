import GAME_PLATFORM from 'game-platform/dist';
import {
  ATTACK_COMP, HEALTH_COMP, IS_ATTACKING_COMP
} from '../components/ComponentNamesConfig';

let {Entity, entityLoop} = GAME_PLATFORM;

function attackSystem(systemArguments) {
  let entities = Entity.getByComps([IS_ATTACKING_COMP]);
  if (entities.length) {
    entityLoop(entities, (entity) => {
      let dmg = entity[ATTACK_COMP].damage;
      let targetTile = entity[IS_ATTACKING_COMP].targetTile;
      
  
      // set up the attack animation
      // options !
      // 1. The entity can have a component with the animation details, then remove this component
      // 2. Create a new Entity for the animation, destroy it when the animation is done
      // 3. Adda  'section' the UI Component somehow...
      
      // We'll try to go with 1, using the ATTACK_COMP
      entity[ATTACK_COMP].targetForAnimation = targetTile;
      
      for (let entID in targetTile.entities) {
        /**
         *
         * @type {BaseEntity}
         */
        let entTarget = targetTile.entities[entID];
        
        // ensure you can't accidentally attack yourself :D
        if (entTarget.hasComponents(IS_ATTACKING_COMP)) {
          continue;
        }
        
        // do the attack
        entTarget[HEALTH_COMP].current -= dmg;
        
        // remove dead entities
        if (entTarget[HEALTH_COMP].current <= 0) {
          // remove the entity from the tile...
          targetTile.removeEnt(entTarget);
          entTarget.destroy();
        }
      }
      
      entity.removeComponent(IS_ATTACKING_COMP);
    });
  }
}

export default attackSystem;



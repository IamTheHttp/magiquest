import {ISystemArguments} from '../../../../interfaces/IGameLoop';
import {IAction} from '../../../../interfaces/IGeneral';

export function performAction(systemArguments: ISystemArguments, action: IAction) {
  // Create menu entity through Canvas?
  // Create menu entity through HTML?
  // let {targetEntities, targetTile} = getEntitiesInTargetTile(systemArguments);
  // let {Entity, zone, gameEvents} = systemArguments;
  // let player = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED_COMP)[0];
  // entityLoop(targetEntities, (targetEnt) => {
  //   // try to attack
  //   if (targetEnt.isAttackable() && targetTile && !player.isAttacking()) {
  //     player.addComponent(new IsAttackingComp(targetTile));
  //   } else {
  //     // try to activate a trigger
  //     let triggers = zone.triggers.actOnEntity[targetEnt.name];
  //
  //     if (targetEnt instanceof FamNPC) {
  //       gameEvents.pushEvent(new InteractWithNPC(targetEnt));
  //     }
  //
  //     // TODO should the trigger system listen to Game Events?
  //     if (isNonEmptyArray(triggers)) {
  //       // activate all triggers related to acting on this entity
  //       for (let i = 0; i < triggers.length; i++) {
  //         let trigger = triggers[i];
  //
  //         if (trigger.type === 'dialog') {
  //           pushTrigger(
  //             new DialogTrigger({
  //               type: 'dialog',
  //               oneOff: trigger.oneOff,
  //               lines: trigger.lines,
  //               actedOnEntity: targetEnt
  //             })
  //           );
  //         }
  //       }
  //       return;
  //     }
  //   }
  // });
}


### Systems
- TriggerSystem (Can be picked up by other systems, happen at the start of each tick, emptied at stat of tick)
    - When a user moves, we can show dialog(s), or move him to a new location(portal)
    - When user performs action, we can show dialog(s), or move him to a new location(portal)
- GameEvents (Can be picked up by other systems, available from next tick, empties at end of tick)
    - EnemyKilled
    - InteractWithNPC

### Enemy Levels
- LevelLocations have a LevelCharacterLocation property
- LevelCharacterLocation property is then used when an Enemy is created, passed charaterLevel to new Enemy();
- Manually placed enemies (enemiesToPlace) always have a fixed level based on their configuration, this is  
  relevant for bosses, town NPCs etc. - this happens in placeLevelEntities();

### Experience
- Enemy level is provided by spawnEnemiesSystem to the Enemy
- When enemy is killed, an EnemyKill event is dispatched
- Experience system increases experience of player based on ${BaseXP} * ${enemyLevel}
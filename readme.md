
### Systems
- PixelArt created with https://www.piskelapp.com/

### Systems
- TriggerSystem (Can be picked up by other systems, happen at the start of each tick, emptied at stat of tick)
    - When a user moves, we can show dialog(s), or move him to a new location(portal)
    - When user performs action, we can show dialog(s), or move him to a new location(portal)
- GameEvents (Can be picked up by other systems, available from next tick, empties at end of tick)
    - EnemyKilled
    - InteractWithNPC

### Character Levels
- LevelLocations have a LevelCharacterLocation property
- LevelCharacterLocation property is then used when an Character is created, passed characterLevel to new Character();
- Manually placed enemies (enemiesToPlace) always have a fixed level based on their configuration, this is  
  relevant for bosses, town NPCs etc. - this happens in placeLevelEntities();

### Experience
- Character level is provided by spawnEnemiesSystem to the Character
- When enemy is killed, an EnemyKill event is dispatched
- Experience system increases experience of player based on ${BaseXP} * ${enemyLevel}

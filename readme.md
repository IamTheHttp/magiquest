### Enemy Levels
- LevelLocations have a LevelCharacterLocation property
- LevelCharacterLocation property is then used when an Enemy is created, passed charaterLevel to new Enemy();
- Manually placed enemies (enemiesToPlace) always have a fixed level based on their configuration, this is  
  relevant for bosses, town NPCs etc. - this happens in placeLevelEntities();

### Experience
- Enemy level is provided by spawnEnemiesSystem to the Enemy
- When enemy is killed, an EnemyKill event is dispatched
- Experience system increases experience of player based on ${BaseXP} * ${enemyLevel}
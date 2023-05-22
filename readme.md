### Tools

- PixelArt created with https://www.piskelapp.com/

### Triggers and Events

- The game engine has several communication channels
  - Triggers - Used by the TriggerSystem (Can be picked up by other systems, happen at the start of each tick, emptied at stat of tick)
    - When a user moves, we can show dialog(s), or move him to a new location(portal)
    - When user performs action, we can show dialog(s), or move him to a new location(portal)
  - GameEvents (Can be picked up by other systems, available from next tick, empties at end of tick)
    - EnemyKilled
    - InteractWithNPC

### Character Levels (NPCs, enemies, monsters etc.)

- LevelLocations have a LevelCharacterLocation property
- LevelCharacterLocation property is then used when an Character is created, passed entityLevel to new Character();
- Manually placed enemies (enemiesToPlace) always have a fixed level based on their configuration, this is  
  relevant for bosses, town NPCs etc. - this happens in placeLevelEntities();
- When creating a new character (Enemy or player), the entityLevels affects the damage and health.
  This is not updated when the character levels up, but only upon creation.
  Enemies don't level up, and we're not yet certain we want this behaviour on the player

### Experience

- Character level is provided by spawnEnemiesSystem to the Character(Enemy)
- When enemy is killed, an EnemyKill event is dispatched
- Experience system increases experience of player based on ${BaseXP} \* ${enemyLevel}
- Experience needed for next level is doubled every level.

### The database

- #### zones.json database

  - id -- {string} in the format of ${level}-${area}
  - act -- {number} > Acts, are the major blocks of the story progression
  - chapter -- {number} > Chapters are sub-sections of an Act, each Act has many Chapters
  - description -- {string} free text to describe the location
  - playerStartPos -- When level is loaded, where does the player start
  - spawnableEnemies -- Array of separated IDs of spawnable monsters in the area
  - noSpawnLocations - [{start: {col: number, row:number}, end: {col: number, row:number}}] Col/Row ranges in which enemies should not spawn.
  - exits - map of {act,chapter ->  {act: number, chapter: number, exitTile: { col: number, row:number}}
  - monsterDensity -- 0 < {number} < 1, the chance for a tile to contain a monster (0.2 -> 20% -> 20% of all tiles have enemies)

- #### ENTITIES.json database
  - id - {string} one of Enum's CHARACTERS;
  - display_name -- {string}
  - dmg -- {number}
  - health - {number}
  - vision - {number} indicating the vision range of an enemy
  - attack_speed - {string} One of Enum's ATTACK_SPEEDS_OPTIONS (FAST, FASTEST etc.)
  - radius - {number} currently constant 16
  - animation_types - {string} PLAYER_ANIMATION | ENEMY_ANIMATION

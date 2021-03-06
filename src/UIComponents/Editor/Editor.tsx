import * as React from 'react';
import tileSet from '../../assets/tileSet.png';
import {CSSProperties, useState} from 'react';
import {TILE_TYPES} from '../../gameEngine/createEntitySprites';
import Game from '../../gameEngine/Game';
import {GameCanvas} from 'game-platform';
import {ManagedCanvasMemo} from '../Components/ManagedCanvas';
import {getGridIdxFromPos} from '../../gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {EditorPopup} from './EditorPopup';
import {ZoneList} from './ZoneList';
import {TILE_SIZE} from '../../gameEngine/gameConstants';
import {MonsterList} from './MonsterList';
import {updateEditorServerTile} from './editorRequests/updateEditorServerTile';

type IProps = {
  onTileSelect?: (key: number) => void;
  onZoneNav: (act: number, chapter: number) => void;
  onPosNav: (col: number, row: number) => void;
  act: number;
  chapter: number;
  game: Game;
  gameCanvasManager: GameCanvas;
};

export function Editor(props: IProps) {
  const {game, gameCanvasManager} = props;
  const [selectedTileType, setSelectedTileType] = useState(null);

  const [isZonesListOpen, setIsZoneListOpen] = useState(false);
  const [isMonsterListOpen, setIsMonsterListOpen] = useState(false);

  gameCanvasManager.onViewMapClick = (e) => {
    if (selectedTileType === null) {
      return; // Do nothing if no selectedTileType
    }
    const {col, row} = getGridIdxFromPos(e.x, e.y);

    // Update the map in the server
    // This will also save the changes you make
    // TODO add server-error handling?
    updateEditorServerTile(game, col, row, selectedTileType);

    // Client side update (optimistic update that the server worked)
    game.tileIdxMap[`${col},${row}`].tile.setTileType(selectedTileType);
    game.renderBackground = true;
  };

  return (
    <>
      {isZonesListOpen && (
        <EditorPopup
          onClose={() => {
            setIsZoneListOpen(false);
          }}
        >
          <ZoneList
            onCreateNewZone={() => {}}
            onZoneNav={(act, chapter) => {
              console.log('Setting new act/chapter', act, chapter);

              // Sets the internal game
              props.game.setZoneByActAndChapter(act, chapter);
              props.game.loadCurrentZone({});
              props.game.requestBackgroundRender();
              const zone = props.game.getZone();
              props.game.mapAPI.panCamera(-zone.playerStartPos.col * TILE_SIZE, -zone.playerStartPos.row * TILE_SIZE);
            }}
          />
        </EditorPopup>
      )}
      {isMonsterListOpen && (
        <EditorPopup
          onClose={() => {
            setIsMonsterListOpen(false);
          }}
        >
          <MonsterList />
        </EditorPopup>
      )}

      <div id="editor-tile-selector">
        <button
          onClick={() => {
            setIsZoneListOpen(true);
          }}
          style={{width: '50%'}}
        >
          Zones
        </button>
        <button
          onClick={() => {
            setIsMonsterListOpen(true);
          }}
          style={{width: '50%'}}
        >
          Monsters
        </button>

        <h3>
          Current Zone: {props.act}-{props.chapter}
        </h3>
        <div id="editor-tiles">
          {Object.keys(TILE_TYPES).map((key) => {
            let {cropStartX, cropStartY, cropSizeX, cropSizeY} = TILE_TYPES[+key];

            let style: CSSProperties = {
              backgroundImage: `url("${tileSet}")`,
              flexBasis: '32px',
              color: 'black',
              backgroundPosition: `-${cropStartX}px -${cropStartY}px`,
              width: `${cropSizeX}px`,
              height: `${cropSizeY}px`,
              boxSizing: 'border-box'
            };

            let extraStyles = selectedTileType === key ? 'active' : '';

            return (
              <div
                key={key}
                className={`${extraStyles} editor-tile`}
                style={style}
                onClick={() => {
                  setSelectedTileType(key);
                }}
              />
            );
          })}
        </div>
        <button
          onClick={() => {
            const {x, y} = game.getZoneStartXY();
            game.mapAPI.panCamera(-(x - game.viewSize.viewWidth / 2), -(y - game.viewSize.viewHeight / 2));
            game.requestBackgroundRender();
          }}
        >
          Go to start position
        </button>
      </div>
      <div className="canvas-main-container">
        <ManagedCanvasMemo game={game} gameCanvasManager={gameCanvasManager} />
      </div>
    </>
  );
}

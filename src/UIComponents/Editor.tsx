import * as React from 'react';
import tileSet from '../assets/tileSet.png';
import {CSSProperties, useRef, useState} from 'react';
import {TILE_TYPES} from '../gameEngine/createEntitySprites';
import Game from '../gameEngine/Game';
import {GameCanvas} from 'game-platform';
import {ManagedCanvasMemo} from './Components/ManagedCanvas';
import {getGridIdxFromPos} from '../gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';

type IProps = {
  onTileSelect?: (key: number) => void;
  onZoneNav: (act: number, chapter: number) => void;
  onPosNav: (col: number, row: number) => void;
  act: number;
  chapter: number;
  game: Game;
  gameCanvasManager: GameCanvas;
};

function updateEditorServerTile(game: Game, col: number, row: number, tileType: number) {
  fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      act: game.currentAct,
      chapter: game.currentChapter,
      tileType,
      col,
      row
    })
  });
}

export function Editor(props: IProps) {
  const {game, gameCanvasManager} = props;
  const [selectedTileType, setSelectedTileType] = useState(null);

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
      <div id="editor-tile-selector">
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
        <div>
          <div>
            <input id="editor-act-selector" placeholder="Act" type="number" min="0" />
            <input id="editor-chapter-selector" placeholder="Chapter" type="number" min="0" />
            <button
              onClick={(e) => {
                let actEl = document.getElementById('editor-act-selector') as HTMLInputElement;
                let chapterEl = document.getElementById('editor-chapter-selector') as HTMLInputElement;
                props.onZoneNav(+actEl.value, +chapterEl.value);
              }}
            >
              Go
            </button>
          </div>
          <div>
            <input id="col" placeholder="Col" type="number" min="0" />
            <input id="row" placeholder="Row" type="number" min="0" />
            <button
              onClick={(e) => {
                let colEl = document.getElementById('col') as HTMLInputElement;
                let rowEl = document.getElementById('row') as HTMLInputElement;
                props.onPosNav(+colEl.value, +rowEl.value);
              }}
            >
              Go
            </button>
          </div>
        </div>
      </div>
      <div className="canvas-main-container">
        <ManagedCanvasMemo game={game} gameCanvasManager={gameCanvasManager} />
      </div>
    </>
  );
}

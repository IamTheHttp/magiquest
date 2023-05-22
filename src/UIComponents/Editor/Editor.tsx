import * as React from 'react';
import {CSSProperties, useEffect, useState} from 'react';
import Game from '../../gameEngine/Game';
import {Entity, GameCanvas} from 'game-platform';
import {ManagedCanvasMemo} from '../Components/ManagedCanvas';
import {getGridIdxFromPos} from '../../gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {EditorPopup} from './EditorPopup';
import {ZoneList} from './ZoneList';
import {TILE_SIZE} from '../../gameEngine/gameConstants';
import {PlaceableEntitiesList} from './PlaceableEntitiesList';
import {updateEditorServerTile} from './editorRequests/updateEditorServerTile';
import {getBrushSizeEntity} from './editorEntities/brushSizeEntity';
import {updateEditorStartPos} from './editorRequests/updateStartPosition';
import Position from '../../gameEngine/components/Position';
import {BaseEntity} from '../../gameEngine/BaseEntity';
import {getSprites, mapTileNameToTileType} from '../../gameEngine/getSprites';

type IProps = {
  onTileSelect?: (key: number) => void;
  onZoneNav: (act: number, chapter: number) => void;
  onPosNav: (col: number, row: number) => void;
  act: number;
  chapter: number;
  game: Game;
  gameCanvasManager: GameCanvas;
};

/**
 * Editor Component, wraps the managed canvas instance
 * @param props
 * @constructor
 */
export function Editor(props: IProps) {
  const {game, gameCanvasManager} = props;
  const [currentColHover, setCurrentCol] = useState(0);
  const [currentRowHover, setCurrentRow] = useState(0);
  const [selectedTileType, setSelectedTileType] = useState(null);
  const [selectedEditorEntity, setSelectedEditorEntity] = useState(null);
  const [currentBrushSize, setBrushSize] = useState(1);

  const [isZonesListOpen, setIsZoneListOpen] = useState(false);
  const [isMonsterListOpen, setIsMonsterListOpen] = useState(false);

  function modifyBackgroundTile() {
    if (selectedTileType === null) {
      return; // Do nothing if no selectedTileType
    }

    const col = currentColHover;
    const row = currentRowHover;
    // Update the map in the server
    // This will also save the changes you make
    // TODO add server-error handling?

    let colOffset = 0;
    let rowOffset = 0;

    while (rowOffset < currentBrushSize || colOffset < currentBrushSize) {
      updateEditorServerTile(game, col + colOffset, row + rowOffset, selectedTileType);
      game.indexedTileMap[`${col + colOffset},${row + rowOffset}`].tile.setTileType(selectedTileType);

      colOffset++;

      if (colOffset === currentBrushSize && rowOffset === currentBrushSize - 1) {
        break;
      }

      if (colOffset === currentBrushSize) {
        colOffset = 0;
        rowOffset++;
      }
    }

    game.renderBackground = true;
  }

  gameCanvasManager.onViewMapMove = (e) => {
    const {col, row} = getGridIdxFromPos(e.x, e.y);

    // Do nothing in case the cols/rows haven't changed
    if (col === currentColHover && row === currentRowHover) {
      return null;
    }

    // gets ot creates a brush size entity
    const brushSizeEnt = getBrushSizeEntity();

    brushSizeEnt.setBrushSize({currentBrushSize, col, row});

    // Set new state as needed.
    setCurrentCol(col);
    setCurrentRow(row);

    gameCanvasManager.mapAPI.drawAllShapesInLayer();
  };

  /**
   * Draw the selected tile on the background.
   * @param e
   */
  function doStuff(e: any) {
    const KEY_PRESSED = e.key;
    if (KEY_PRESSED === 'f') {
      modifyBackgroundTile();
    }
  }

  useEffect(() => {
    // On keypress, change the tile type where the cursor stands
    document.addEventListener('keydown', doStuff);
    return () => {
      document.removeEventListener('keydown', doStuff);
    };
  }, [currentColHover, currentRowHover]);

  // When clicking on the canvas, change the tile type where the cursor stands
  gameCanvasManager.onViewMapClick = (e) => {
    if (selectedTileType) {
      modifyBackgroundTile();
    }

    if (selectedEditorEntity) {
      updateEditorStartPos(game, currentColHover, currentRowHover);

      const startPosEntity = Entity.getByComp<BaseEntity>('START_POS')[0];

      startPosEntity.addComponent(
        new Position({
          x: currentColHover * TILE_SIZE + 0.5 * TILE_SIZE,
          y: currentRowHover * TILE_SIZE + 0.5 * TILE_SIZE,
          radius: TILE_SIZE / 2
        })
      );
    }
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
          <PlaceableEntitiesList />
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
          Placeable Entities
        </button>

        <h3>
          Current Zone: {props.act}-{props.chapter}
        </h3>
        <h3>
          Current Tile: {currentColHover}-{currentRowHover}
        </h3>
        <div className="editor-tiles">
          {Object.keys(getSprites())
            .filter((spriteName) => {
              return spriteName.startsWith('TILE');
            })
            .map((spriteName: keyof ReturnType<typeof getSprites>) => {
              const {cropStartX, cropStartY, cropSizeX, cropSizeY, image} = getSprites()[spriteName];

              const tileType = mapTileNameToTileType(spriteName);

              if (tileType === undefined) {
                console.log(spriteName);
              }

              const style: CSSProperties = {
                backgroundImage: `url("${image.src}")`,
                flexBasis: '32px',
                color: 'black',
                backgroundPosition: `-${cropStartX}px -${cropStartY}px`,
                width: `${cropSizeX}px`,
                height: `${cropSizeY}px`,
                boxSizing: 'border-box'
              };

              const extraStyles = selectedTileType === tileType ? 'active' : '';

              return (
                <div
                  key={tileType}
                  className={`${extraStyles} editor-tile`}
                  style={style}
                  onClick={() => {
                    setSelectedTileType(tileType);
                    setSelectedEditorEntity(null);
                  }}
                />
              );
            })}
        </div>

        <div className="editor-tiles">
          {(() => {
            const extraStyles = selectedEditorEntity === 'start-pos' ? 'active' : '';
            const style: CSSProperties = {
              flexBasis: '32px',
              width: `${TILE_SIZE}px`,
              height: `${TILE_SIZE}px`,
              boxSizing: 'border-box',
              backgroundColor: 'lime',
              borderRadius: 100
            };

            return (
              <div
                className={`${extraStyles} editor-tile`}
                style={style}
                onClick={() => {
                  setSelectedTileType(null);
                  setSelectedEditorEntity('start-pos');
                }}
              />
            );
          })()}
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
        <label>Brush Size</label>
        <input
          type={'number'}
          placeholder={'Brush Size'}
          onChange={(e) => {
            const newBrushSize = +e.target.value;

            if (newBrushSize <= 0) {
              setBrushSize(1);
            } else {
              setBrushSize(Math.min(10, newBrushSize));
            }
          }}
        />
      </div>
      <div className="canvas-main-container">
        <ManagedCanvasMemo game={game} gameCanvasManager={gameCanvasManager} />
      </div>
    </>
  );
}

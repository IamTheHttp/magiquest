import * as React from 'react';
import tileSet from 'assets/tileSet.png';
import {CSSProperties, useState} from 'react';
import {TILE_TYPES} from '../gameEngine/createEntitySprites';

type IProps = {
  onTileSelect?: (key: number) => void;
  onZoneNav: (act: number, chapter: number) => void;
  onPosNav: (col: number, row: number) => void;
  act: number;
  chapter: number;
};

export function Editor(props: IProps) {
  const [selectedTileKey, setSelectedTileKey] = useState(null);

  return (
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

          let extraStyles = selectedTileKey === key ? 'active' : '';

          return (
            <div
              key={key}
              className={`${extraStyles} editor-tile`}
              style={style}
              onClick={() => {
                setSelectedTileKey(key);
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
      <div></div>
    </div>
  );
}

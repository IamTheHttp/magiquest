import * as React from "react";
import {tileTypes} from "config";
import tileSet from "assets/tileSet.png";

type IProps = {
  onTileSelect: (key: number) => void,
  clickedTileIdx: null, // TODO isn't it state?
  onLevelAreaNav: (level: number, area: number) => void,
  onPosNav: (col: number, row: number) => void
}

class Editor extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div id={'editor-panel'}>

        <div id='tiles'>
          {Object.keys(tileTypes).map((key) => {
            let {cropStartX, cropStartY, cropSizeX, cropSizeY} = tileTypes[+key];

            let style = {
              backgroundImage: `url("${tileSet}")`,
              color: 'black',
              backgroundPosition: `-${cropStartX}px -${cropStartY}px`,
              width: `${cropSizeX}px`,
              height: `${cropSizeY}px`
            };

            let active = this.state.active === key ? 'active' : '';
            let cls = `tile ${active}`;

            return (
              <div
                key={key}
                className={cls}
                style={style}
                onClick={() => {
                  this.props.onTileSelect(+key);
                  this.setState({
                    active: key
                  });
                }}
              >

              </div>
            );
          })}
        </div>
        <div>
          <div>
            <input id='level' placeholder='Level' type='number' min="0"/>
            <input id='area' placeholder='Area' type='number' min="0"/>
            <button onClick={(e) => {
              let levelEl = document.getElementById('level') as HTMLInputElement;
              let areaEl = document.getElementById('area') as HTMLInputElement;
              this.props.onLevelAreaNav(+levelEl.value, +areaEl.value);
            }}>Go
            </button>
          </div>
          <div>
            <input id='col' placeholder='Col' type='number' min="0"/>
            <input id='row' placeholder='Row' type='number' min="0"/>
            <button onClick={(e) => {
              let colEl = document.getElementById('col') as HTMLInputElement;
              let rowEl = document.getElementById('row') as HTMLInputElement;
              this.props.onPosNav(+colEl.value, +rowEl.value);
            }}>Go
            </button>
          </div>

        </div>
        <div>
          <h1>Clicked Tile</h1>
          <h2>
            {this.props.clickedTileIdx}
          </h2>
        </div>
      </div>
    );
  }
}


export default Editor;
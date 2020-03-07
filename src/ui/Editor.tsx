import * as React from "react";
import {tileTypes} from "config";
import tileSet from "assets/tileSet.png";

type IProps = {
  onTileSelect: (key: string) => void,
  clickedTileIdx: null // TODO isn't it state?
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
                  this.props.onTileSelect(key);
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
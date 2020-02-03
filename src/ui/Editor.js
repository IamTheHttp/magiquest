"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var config_1 = require("config");
var tileSet_png_1 = require("assets/tileSet.png");
var Editor = /** @class */ (function (_super) {
    __extends(Editor, _super);
    function Editor(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Editor.prototype.render = function () {
        var _this = this;
        return (<div id={'editor-panel'}>

        <div id='tiles'>
          {Object.keys(config_1.tileTypes).map(function (key) {
            var _a = config_1.tileTypes[key], cropStartX = _a.cropStartX, cropStartY = _a.cropStartY, cropSizeX = _a.cropSizeX, cropSizeY = _a.cropSizeY;
            var style = {
                backgroundImage: "url(\"" + tileSet_png_1["default"] + "\")",
                color: 'black',
                backgroundPosition: "-" + cropStartX + "px -" + cropStartY + "px",
                width: cropSizeX + "px",
                height: cropSizeY + "px"
            };
            var active = _this.state.active === key ? 'active' : '';
            var cls = "tile " + active;
            return (<div key={key} className={cls} style={style} onClick={function () {
                _this.props.onTileSelect(key);
                _this.setState({
                    active: key
                });
            }}>

              </div>);
        })}
        </div>
        <div>
          <h1>Clicked Tile</h1>
          <h2>
            {this.props.clickedTileIdx}
          </h2>
        </div>
      </div>);
    };
    return Editor;
}(React.Component));
exports["default"] = Editor;

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
import * as React from "react";
import { tileTypes } from "config";
import tileSet from "assets/tileSet.png";
var Editor = /** @class */ (function (_super) {
    __extends(Editor, _super);
    function Editor(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Editor.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { id: 'editor-panel' },
            React.createElement("div", { id: 'tiles' }, Object.keys(tileTypes).map(function (key) {
                var _a = tileTypes[key], cropStartX = _a.cropStartX, cropStartY = _a.cropStartY, cropSizeX = _a.cropSizeX, cropSizeY = _a.cropSizeY;
                var style = {
                    backgroundImage: "url(\"" + tileSet + "\")",
                    color: 'black',
                    backgroundPosition: "-" + cropStartX + "px -" + cropStartY + "px",
                    width: cropSizeX + "px",
                    height: cropSizeY + "px"
                };
                var active = _this.state.active === key ? 'active' : '';
                var cls = "tile " + active;
                return (React.createElement("div", { key: key, className: cls, style: style, onClick: function () {
                        _this.props.onTileSelect(key);
                        _this.setState({
                            active: key
                        });
                    } }));
            })),
            React.createElement("div", null,
                React.createElement("h1", null, "Clicked Tile"),
                React.createElement("h2", null, this.props.clickedTileIdx))));
    };
    return Editor;
}(React.Component));
export default Editor;

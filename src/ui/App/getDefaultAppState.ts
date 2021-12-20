import {AllowedAttributes} from "../../data/attributesConfig";
import {AppState} from "./AppState";

export function getDefaultAppState(): AppState {
  return {
    mapCanvasEl: null,
    minimapCanvasEl: null,
    currentLevel: 0,
    currentArea: 0,
    mapHeight: null,
    mapWidth: null,
    minimap: null,
    map: null,
    active: null,
    isEditing: null,
    isGameRunning: false,
    mapAPI: null,
    clickedTileIdx: null,
    editorTileType: null,
    minimapAPI: null,
    debug: {
      countOfEnemyEntities:0,
      countOfTileEntities:0
    }
  }
}
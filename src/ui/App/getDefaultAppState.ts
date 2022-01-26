import {AllowedAttributes} from '../../data/attributesConfig';
import {AppState} from './AppState';

export function getDefaultAppState(): AppState {
  return {
    isGameRunning: false,
    isEditorOpen: false
  };
}

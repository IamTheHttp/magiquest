import * as React from 'react';
import './app.scss';
import './editor.scss';
import {RESOLUTION} from '../../gameEngine/gameConstants';
import {MainMenu} from '../Components/MainMenu/MainMenu';
import {AppState} from './AppState';
import {getDefaultAppState} from './getDefaultAppState';
import {MainOverlay} from '../Components/MainOverlay/MainOverlay';
import Game from '../../gameEngine/Game';
import {GameCanvas} from 'game-platform';
import {resizeGameElements} from '../utils/resizeGameElements';
import registerUserInputEvents from '../../utils/registerUserInputEvents';
import {Editor} from '../Editor';
import {ManagedCanvasMemo} from '../Components/ManagedCanvas';

export class App extends React.Component<any, AppState> {
  game: Game;
  gameCanvasManager: GameCanvas;

  constructor(props: object) {
    super(props);

    this.onEscPress = this.onEscPress.bind(this);
    // listen to esc key
    document.addEventListener('keydown', this.onEscPress);
    this.state = getDefaultAppState();
    window.addEventListener('resize', this.resize.bind(this));
    window.addEventListener('orientationchange', this.resize.bind(this));
  }

  /**
   * Unbind event listeners
   */
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscPress);
  }

  /**
   * Handle escape keypress to open a menu
   * The menu opening is not currently implemented
   * @param e
   */
  onEscPress(e: KeyboardEvent) {
    let isEscape = false;
    if ('key' in e) {
      isEscape = e.key === 'Escape' || e.key === 'Esc';
    } else {
      isEscape = e.keyCode === 27;
    }

    if (isEscape) {
    }
  }

  createCanvasManager() {
    this.gameCanvasManager = new GameCanvas({
      onViewMapClick(e) {
        console.log(e);
      },
      mapHeight: 0,
      mapWidth: 0,
      viewHeight: RESOLUTION.height,
      viewWidth: RESOLUTION.width
    });
  }

  /**
   * Creates a new Game object and wires up all the required events
   * Once the canvas is ready on the DOM, the game will begin
   */
  setupGameObject() {
    // whenever a new game is started, we go to full screen
    document.body.requestFullscreen();

    this.game = new Game({
      mode: 'playing',
      onZoneChange: (act, chapter, newPlayerPosition) => {}
    });

    // Game always starts at level 0, area 0
    // TODO we can use this to implement saving - the saved data can be level and area
    this.game.setZoneByActAndChapter(0, 0);

    this.createCanvasManager();
    registerUserInputEvents(this.game);

    // For convenience purposes only
    window.game = this.game;

    // Remove the main menu and show the Main Game Overlay
    this.setState(
      {
        isGameRunning: true,
        isEditorOpen: false
      },
      () => {
        console.log('Resizing after state change');
        this.resize();
      }
    );
  }

  startEditor() {
    this.game = new Game({
      mode: 'editing',
      onZoneChange: (act, chapter, newPlayerPosition) => {}
    });

    // Game always starts at level 0, area 0
    // TODO we can use this to implement saving - the saved data can be level and area
    this.game.setZoneByActAndChapter(0, 0);

    this.createCanvasManager();

    // Events for user playing, for Editor we might want to set different inputs
    registerUserInputEvents(this.game);

    // For convenience purposes only
    window.game = this.game;

    // Remove the main menu and show the Main Game Overlay
    this.setState(
      {
        isEditorOpen: true,
        isGameRunning: false
      },
      () => {
        console.log('Resizing after state change');
        this.resize();
      }
    );
  }

  resize() {
    resizeGameElements();
  }

  render() {
    const isGameStarted = this.state.isGameRunning;
    const isEditorOpen = this.state.isEditorOpen;

    if (!isGameStarted && !isEditorOpen) {
      return <MainMenu startNewGame={this.setupGameObject.bind(this)} startEditor={this.startEditor.bind(this)} />;
    } else if (!isGameStarted && isEditorOpen) {
      return (
        <MainOverlay game={this.game}>
          <div id="editor-wrapper">
            <Editor
              onZoneNav={() => {}}
              onPosNav={() => {}}
              act={this.game.currentAct}
              chapter={this.game.currentChapter}
              game={this.game}
              gameCanvasManager={this.gameCanvasManager}
            />
          </div>
        </MainOverlay>
      );
    } else {
      return (
        <MainOverlay game={this.game}>
          <div className="canvas-main-container">
            <ManagedCanvasMemo game={this.game} gameCanvasManager={this.gameCanvasManager} />
          </div>
        </MainOverlay>
      );
    }
  }
}

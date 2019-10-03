/**
 * The game tracker allows us to register stuff?
 * The game tracker will currently only
 */
class GameTracker {
  constructor() {
    this.actions = {};
  }

  track(action) {
    if (!this.actions[action]) {
      this.actions[action] = {
        count: 0
      };
    }

    this.actions[action].count++;
  }

  reset() {
    this.actions = {};
  }

  getReport() {
    return this.actions;
  }
}

export {GameTracker};
export default (new GameTracker());

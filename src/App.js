import React, { Component } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { getRandomInt } from './tools';

import './css/App.css';

const BOARD_SIZE = 20;
const FOOD_SCORE_VALUE = 1;
const FPS = 6;
const GET_NEXT_POSITION = {
  up: (x, y) => ([x, y - 1]),
  right: (x, y) => ([x + 1, y]),
  down: (x, y) => ([x, y + 1]),
  left: (x, y) => ([x - 1, y]),
};

const Status = (props) => {
  return <h2 className="status">
      Score: <span className="white f1">{props.score.toString().padStart(8, '0')}</span>
    </h2>;
}

const Cell = (props) => {
  return (
    <div className={'cell ' + (props.value ? props.value : '')}></div>
  );
}

const Board = (props) => {
  return (
    <div className="board">
      {props.board.map((row, i) => {
        return (
          <div key={i} className="row">
            {row.map((cell, j) => {
              return <Cell key={j} value={cell} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      board: this.getInitialBoard(),
      snake: this.getInitialSnake(),
      head: [0, 3],
      direction: 'down',
      isGameOver: false,
      isPaused: false,
      score: 0
    };

    // Draw snake on the board
    initialState.snake.forEach((coordinates) => {
      initialState.board[coordinates[1]][coordinates[0]] = 'snake';
    });

    return initialState;
  }

  /**
   * Empty initial board composed of a 2 dimensionnal array
   * containing rows of cells.
   * @todo :
   * - make it a 1 demensionnal array ?
   *   (and only create rows manually when looping over)
   */
  getInitialBoard() {
    let board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      let row = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        row.push(null);
      }
      board.push(row);
    }

    return board;
  }

  /**
   * Get initial snake position
   */
  getInitialSnake() {
    return [[0, 0], [0, 1], [0, 2], [0, 3]];
  }

  componentDidMount() {
    this.spawnFood();
    this.startGame();
  }

  /**
   * Start game loop
   */
  startGame() {
    this.loop = setInterval(() => {
      if (!this.state.isPaused) {
        this.tick();
      }

      if (this.state.isGameOver) {
        clearTimeout(this.loop);
      }
    }, 1000 / FPS);
  }

  /**
   * Represent a game loop.
   * Inside it we :
   * - compute snake move
   * - update board accordingly
   */
  tick() {
    // Copy arrays to avoid mutation.
    const board = this.state.board.slice();
    const snake = this.state.snake.slice();
    let score = this.state.score;

    // Get next head position.
    const head = this.getNextPosition(snake[snake.length - 1]);

    if (this.isHit(head)) {
      // Stop the game if head collides with walls or body.
      this.setState({
        isGameOver: true,
      });
      return;
    } else if (this.isFood(head)) {
      // Pop another food when eating one.
      this.spawnFood();
      score += FOOD_SCORE_VALUE;
    } else {
      // Remove the last part of the snake only when NOT eating food.
      // Keeping the last part when eating food expands the body by one.
      let tail = snake[0];
      board[tail[1]][tail[0]] = null;
      snake.shift();
    }

    board[head[1]][head[0]] = 'snake';
    snake.push(head);

    this.setState({
      board: board,
      snake: snake,
      score: score,
    });
  }

  /**
   * Check if coordinates are out of game bound,
   * or if cell is already accupied by the snake body.
   *
   * @param {Array} coordinates Array containing x and y position.
   */
  isHit(coordinates) {
    const [x, y] = coordinates;
    return (
      x >= BOARD_SIZE || x < 0
      || y >= BOARD_SIZE || y < 0
      || this.state.board[y][x] === 'snake'
    )
  }

  /**
   * Check is element at coordinates is food.
   *
   * @param {Array} coordinates
   */
  isFood(coordinates) {
    const [x, y] = coordinates;
    return (this.state.board[y][x] === 'food');
  }

  /**
   * @param {Array} coordinates Array containing x and y position.
   */
  getNextPosition(coordinates) {
    return GET_NEXT_POSITION[this.state.direction](...coordinates);
  }

  /**
   * @param {String} key The name of pressed kewboard key.
   */
  setDirection(key) {
    // Prevent changing to opposite or same direction.
    if (this.state.direction === 'up' || this.state.direction === 'down') {
      if (key === 'up' || key === 'down') {
        return;
      }
    } else {
      if (key === 'left' || key === 'right') {
        return
      }
    }

    this.setState({
      direction: key
    });
  }

  /**
   * Spawn food at random coordinates.
   * If spot is already taken, it will repeat the process
   * @todo :
   * - fix case when board is full, causes max call stack
   *   `get available spots array.filter(EMPTY)`
   * - board state should be only set inside tick function
   */
  spawnFood() {
    const coordinates = [
      getRandomInt(0, BOARD_SIZE - 1),
      getRandomInt(0, BOARD_SIZE - 1),
    ];

    let isEmptySpot = true;
    if (this.state.board[coordinates[1]][coordinates[0]]) {
      isEmptySpot = false;
    }

    if (!isEmptySpot) {
      // Get another random spot if spot is not available.
      this.spawnFood();
    } else {
      const board = this.state.board.slice();
      board[coordinates[1]][coordinates[0]] = 'food';
      this.setState({
        board: board
      });
    }
  }

  /**
   * Reset game
   */
  resetGame() {
    clearInterval(this.loop);
    this.setState(this.getInitialState());
    this.spawnFood();
    this.startGame();
  }

  togglePause() {
    this.setState({
      isPaused: !this.state.isPaused,
    });
  }

  render() {
    return (
      <div className={'app' + (this.state.isGameOver ? ' over' : '')}>
        <Status
          score={this.state.score}
        />
        <Board
          board={this.state.board}
          snake={this.state.snake}
        />
        <ul className="help">
          <li>Use the <kbd className="key">Arrow</kbd> keys to move.</li>
          <li>Press <kbd className="key">Space</kbd> to pause/resume the game.</li>
          <li>Press <kbd className="key">Enter</kbd> to restart the game.</li>
        </ul>
        <KeyboardEventHandler
          handleKeys={['up', 'right', 'down', 'left', 'space', 'enter']}
          onKeyEvent={
            (key) => {
              if (key === 'space') {
                this.togglePause();
              }

              if (key === 'enter') {
                this.resetGame();
              }

              if (!this.state.isPaused) {
                if (['up', 'right', 'down', 'left'].indexOf(key) >= 0) {
                  this.setDirection(key);
                }
              }
            }
          }
        />
      </div>
    );
  }
}

export default App;

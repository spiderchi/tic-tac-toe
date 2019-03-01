import reducer from './reducers';
import * as actions from './actions';
import * as operations from './operations';


describe('Game Duck', () => {
  const emptyBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  const drawBoard = [
    [2, 2, 1],
    [1, 1, 2],
    [2, 1, 1]
  ];

  const player1WinBoard = [
    [2, 2, 0],
    [1, 1, 1],
    [2, 2, 0]
  ];

  const player2WinBoard = [
    [2, 2, 2],
    [1, 1, 0],
    [1, 1, 0]
  ];

  describe('Reducers', () => {

    it('Start a new game', () => {
      // the current state 
      const state = {
        board: emptyBoard,
        gameover: true,
        player: 1,
        winner: -1
      };

    
      const expectedState = {
        board: emptyBoard.slice(),
        gameover: false,
        player: 1,
        winner: -1
      };

      
      const action = actions.newGame();
      
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it('End a game', () => {
      const state = {
        board: emptyBoard,
        gameover: false,
        player: 1,
        winner: -1
      };

      const expectedState = {
        board: emptyBoard,
        gameover: true,
        player: 1,
        winner: -1
      };

      const action = actions.gameover();
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it('Update the board when a player makes a move', () => {
      const state = {
        board: emptyBoard,
        gameover: false,
        player: 1,
        winner: -1
      };

      const expectedState = {
        board: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 1]
        ],
        gameover: false,
        player: 1,
        winner: -1
      };

      const player = 1;
      const row = 2;
      const col = 2;

      const action = actions.movePlayer(player, row, col);
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it('Win a game', () => {
      const state = {
        board: player1WinBoard,
        gameover: false,
        player: 1,
        winner: -1
      };

      const expectedState = {
        board: player1WinBoard,
        gameover: true,
        player: 1,
        winner: 1
      };

      const action = actions.winner(1);
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);
    });

    it('Switch players', () => {
      const state = {
        board: emptyBoard,
        gameover: false,
        player: 1,
        winner: -1
      };

      const expectedState = {
        board: emptyBoard,
        gameover: false,
        player: 2,
        winner: -1
      };

      const action = actions.switchPlayer(2);
      const result = reducer(state, action);

      expect(result).toEqual(expectedState);

      const state2 = Object.assign({}, expectedState);

      const expectedState2 = {
        board: emptyBoard,
        gameover: false,
        player: 2,
        winner: -1
      };

      const action2 = actions.switchPlayer(1);
      const result2 = reducer(state, action);

      expect(result2).toEqual(expectedState2);
    });
  });

  describe('Operations', () => {
    

    const { checkWinner, playTurn } = operations;

    it('Dispatch a winner', () => {
      const dispatch = jest.fn();
      const board = player1WinBoard;
      const player = 1;

      const winnerAction = actions.winner(1);
      const gameoverAction = actions.gameover();

      const winner = checkWinner(board, player)(dispatch);

      expect(winner).toBe(true);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0]).toEqual(winnerAction);
      expect(dispatch.mock.calls[1][0]).toEqual(gameoverAction);
    });

    it('Dispatch a draw', () => {
      const dispatch = jest.fn();
      const board = drawBoard;
      const player = 1;

      const winnerAction = actions.winner(0);
      const gameoverAction = actions.gameover();

      const winner = checkWinner(board, player)(dispatch);

      expect(winner).toBe(true);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0]).toEqual(winnerAction);
      expect(dispatch.mock.calls[1][0]).toEqual(gameoverAction);
    });

    it('Play a turn', () => {
      const dispatch = jest.fn();

      let player = 1;
      let row = 0;
      let col = 0;

      const move1 = actions.movePlayer(player, row, col);
      const switch1 = actions.switchPlayer(2); 

      playTurn(player, row, col)(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0]).toEqual(move1);
      expect(dispatch.mock.calls[1][0]).toEqual(switch1);

      player = 2;
      row = 1;
      col = 1;

      const move2 = actions.movePlayer(player, row, col);
      const switch2 = actions.switchPlayer(1); 

      playTurn(player, row, col)(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(dispatch.mock.calls[2][0]).toEqual(move2);
      expect(dispatch.mock.calls[3][0]).toEqual(switch2);
    });
  });
});
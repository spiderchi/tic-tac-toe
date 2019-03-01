import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { gameOperations } from '../../state/tic-tak/game';

import Board from '../components/Board.jsx';
import PlayerInfo from '../components/PlayerInfo.jsx';
import GameoverDialog from '../components/GameoverDialog.jsx';

class Game extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { showDialog: false };

    
    this.handleBoardOnMove = this.handleBoardOnMove.bind(this);
    this.handleDialogClick = this.handleDialogClick.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  handleBoardOnMove(square) {
    

    const { board, player, gameover, playTurn, checkWinner } = this.props;
    const { row, col } = square;

    
    if (gameover || board[row][col] !== 0) {
      return;
    }

    
    playTurn(player, row, col);
    
    const hasWinner = checkWinner(board, player);

    if (hasWinner) {
      this.setState({ showDialog: true });
    }
  }

  handleDialogClick(answer) {
   
    if (answer) {
      this.props.newGame();
    }

    
    this.setState({ showDialog: false });
  }

  handleDialogClose() {
       
    this.setState({ showDialog: false });
  }

  render() {
    const { showDialog } = this.state;
    const { board, player, gameover, winner } = this.props;
    const draw = winner === 0;

    return (
      
      <div>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6} md={4}>
            <Board board={board} onMove={this.handleBoardOnMove} />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <PlayerInfo player={player} gameover={gameover} />
          </Grid>
        </Grid>
        <GameoverDialog
          open={showDialog}
          isDraw={draw}
          player={winner}
          onClick={this.handleDialogClick}
          onClose={this.handleDialogClose} />
      </div>
    );
  }
}

const { arrayOf, number, func, bool } = PropTypes;


Game.propTypes = {
  board: arrayOf(arrayOf(number)).isRequired,
  player: number.isRequired,
  winner: number.isRequired,
  gameover: bool.isRequired,
  playTurn: func.isRequired,
  checkWinner: func.isRequired,
  newGame: func.isRequired
};

const mapStateToProps = (state) => {
  const { gameState } = state;

  return {
    board: gameState.board,
    player: gameState.player,
    gameover: gameState.gameover,
    winner: gameState.winner
  };
};

const mapDispatchToProps = {
  playTurn: gameOperations.playTurn,
  checkWinner: gameOperations.checkWinner,
  newGame: gameOperations.newGame
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
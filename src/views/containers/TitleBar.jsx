import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import Menu from '../components/Menu.jsx';

import { gameOperations } from '../../state/tic-tak/game';


const styles = () => ({
 
});

class TitleBar extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = { menuOpen: false };

    this.handleNewGameClick = this.handleNewGameClick.bind(this);
  }

  handleNewGameClick(itemKey) {
    
      this.props.newGame();

    this.setState({ menuOpen: false });
  }

  render() {
    const { classes } = this.props;
    const { menuOpen } = this.state;

    return (
      
      <div>
        <AppBar>
          <span
          onClick={this.handleNewGameClick}>New Game</span>
        </AppBar>
      </div>
    );
  }
}

const { object, func } = PropTypes;

TitleBar.propTypes = {
  classes: object.isRequired,
  newGame: func.isRequired
};

const mapDispatchToProps = {
  newGame: gameOperations.newGame
};

const styledTitleBar = withStyles(styles)(TitleBar);

export default connect(null, mapDispatchToProps)(styledTitleBar);

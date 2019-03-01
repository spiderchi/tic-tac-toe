import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Square from './Square.jsx';

const borderStyle = '1px solid black';

const styles = (theme) => ({
  
  square: {
    height: 100,
    width: 100,
    lineHeight: '100px', 
    fontSize: '48px', 
    cursor: 'pointer'
  },
  
  marked: { cursor: 'not-allowed' },
  
  row: { textAlign: 'center' },
  
  '0_1': { borderLeft: borderStyle, borderRight: borderStyle },
  '2_1': { borderLeft: borderStyle, borderRight: borderStyle },
  '1_1': { border: borderStyle },
  '1_0': { borderTop: borderStyle, borderBottom: borderStyle },
  '1_2': { borderTop: borderStyle, borderBottom: borderStyle }
});

const Board = ({ classes, board, onMove }) => {
  
  return (
    <Grid container>
      {board.map((row, rIdx) => (
        <Grid key={rIdx} item xs={12} className={classes.row}>
          <Grid container justify="center">
            {row.map((col, cIdx) => {
              
              const border = classes[`${rIdx}_${cIdx}`] || '';
              
              const marked = col !== 0 ? classes.marked : '';

              return (
                <Grid
                  key={cIdx}
                  item
                  className={classnames(classes.square, border, marked)}
                  onClick={() => onMove({ row: rIdx, col: cIdx })}>
                  <Square player={col} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

const { arrayOf, number, object, func } = PropTypes;

Board.propTypes = {
  classes: object.isRequired,
  board: arrayOf(arrayOf(number)).isRequired,
  onMove: func.isRequired
};

export default withStyles(styles)(Board);
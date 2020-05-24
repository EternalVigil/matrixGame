import React, { useEffect } from 'react';
import styled, {keyframes} from 'styled-components';
import {inject, observer} from 'mobx-react';
// import {toJS} from 'mobx';

import logo from './logo.svg';
import enemyIcon from './angular-icon.svg';


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 auto;
  height: 100vh;
  background-color: #4a4a4a;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 50vw;
`;

const Row = styled.div`
  display: flex;
  flex: 0 0 calc(100% / 9);
  width: 100%;
`;

const Cell = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 calc(100% / 9);
  height: 100%;
  border: 1px dashed #fff;
  overflow: hidden;
  cursor: pointer;

  &.playerRange {
    background-color: blue;
  }



  img {
    position: absolute;
    display: flex;
    width: 80%;
    height: auto;
  }

  .player {
    z-index: 2;
    animation: ${rotate} 4s linear infinite;
  }
`;

const App = ({AppStore}) => {
  const gridSize = 9;
  let rows = [];
  let cells = [];

  for(let i = 0; i < gridSize; i++) {
    
    for (let j = 0; j < gridSize; j++) {
      cells.push(<Cell coordinate={`${i}-${j}`} rowCoordinate={i} cellCoordinate={j} />);
    }

    rows[i] = cells;
    cells=[];
  }

  const playerPosition = AppStore.playerPosition;
  const playerAttackRange = AppStore.playerAttackRange.get();
  const enemyPosition = AppStore.enemyPosition;

  const highlightAttackRange = (row, cell) => {
    let cellClasses = [];

    if( 
        (row === playerPosition.row && (cell === playerPosition.cell - playerAttackRange || cell === playerPosition.cell + playerAttackRange))
        ||
        (cell === playerPosition.cell && (row === playerPosition.row - playerAttackRange || row === playerPosition.row + playerAttackRange))
      ) {
      cellClasses.push('playerRange');
    }
    

    return(cellClasses);

  };

  useEffect( () => {
     const handleInput = (input) => {
       // TO DO: Add check for out of bounds movement (diagonals still outstanding)
       // TO DO: Account for diagonal moves
       if(input.key === 'ArrowDown' && playerPosition.row < gridSize - 1) {
         AppStore.movePlayer(playerPosition.row + 1, playerPosition.cell);
         AppStore.moveEnemy();
       }

       if(input.key === 'ArrowUp' && playerPosition.row > 0) {
         AppStore.movePlayer(playerPosition.row - 1, playerPosition.cell);
         AppStore.moveEnemy();
       }

       if(input.key === 'ArrowLeft' && playerPosition.cell > 0) {
         AppStore.movePlayer(playerPosition.row, playerPosition.cell - 1);
         AppStore.moveEnemy();
       }

       if(input.key === 'ArrowRight' && playerPosition.cell < gridSize - 1) {
         AppStore.movePlayer(playerPosition.row, playerPosition.cell + 1);
         AppStore.moveEnemy();
       }

     };

     window.addEventListener('keydown', event => handleInput(event));
     return () => {window.removeEventListener('keydown', handleInput)};
  }, []);


  return (
    <AppContainer>
      <Grid>
        {
          rows &&
          rows.map((row, index) => {
            return(
              <Row key={index}>
                {
                  row &&
                  row.map((cell, index) => {
                    return(
                      <Cell 
                        key={`${cell.coordinate}-${index}`}
                        className={highlightAttackRange(cell.props.rowCoordinate, cell.props.cellCoordinate)}
                        onClick={ () => { 
                          AppStore.movePlayer(cell.props.rowCoordinate, cell.props.cellCoordinate);
                          AppStore.moveEnemy();
                        }}
                      >

                        {
                          playerPosition.row === cell.props.rowCoordinate &&
                          playerPosition.cell === cell.props.cellCoordinate &&
                          <img className='player' src={logo} alt='player icon' />
                        }

                        {
                          enemyPosition.row === cell.props.rowCoordinate &&
                          enemyPosition.cell === cell.props.cellCoordinate &&
                          <img className='enemy' src={enemyIcon} alt='enemy icon' />
                        }

                      </Cell>
                    );
                  })
                }
              </Row>
            );
          })
        }
      </Grid>
    </AppContainer>
  );
}

export default inject('AppStore')(observer(App));

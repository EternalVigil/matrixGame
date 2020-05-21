import React, { useEffect, useState } from 'react';
import styled, {keyframes} from 'styled-components';

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
  border: 1px dashed #ececec;
  overflow: hidden;
  cursor: pointer;

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

function App() {
  const [playerRowPosition, updatePlayerRowPosition] = useState(0);
  const [playerCellPosition, updatePlayerCellPosition] = useState(0);
  const [enemyPosition, updateEnemyPosition] = useState({rowCoordinate: 5, cellCoordinate: 5});

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

  const playerMove = (row, cell) => {
    console.log(`moving to ${row}, ${cell}`);
    if(playerRowPosition !== row || playerCellPosition !== cell) {
      updatePlayerRowPosition(row);
      updatePlayerCellPosition(cell);
      enemyMove();
    }
  };

  const enemyMove = () => {
    const randomDirection = Math.floor( Math.random() * 9) + 1;
    switch (randomDirection) {
      case 1:
        console.log('enemy move down left');
        if(enemyPosition.rowCoordinate < gridSize - 1 && enemyPosition.cellCoordinate > 0) {
          updateEnemyPosition({rowCoordinate: enemyPosition.rowCoordinate + 1, cellCoordinate: enemyPosition.cellCoordinate - 1});
        }
        break;
      case 2: 
        console.log('enemy move down');
        if(enemyPosition.rowCoordinate < gridSize - 1) {
          updateEnemyPosition({ rowCoordinate: enemyPosition.rowCoordinate + 1, cellCoordinate: enemyPosition.cellCoordinate});
        }
        break;
      case 3: 
        console.log('enemy move down right');
        if(enemyPosition.rowCoordinate < gridSize - 1 && enemyPosition.cellCoordinate < gridSize - 1) {
          updateEnemyPosition({rowCoordinate: enemyPosition.rowCoordinate + 1, cellCoordinate: enemyPosition.cellCoordinate + 1});
        }
        break;
      case 4: 
        console.log('enemy move left');
        if(enemyPosition.cellCoordinate > 0) {
          updateEnemyPosition({rowCoordinate: enemyPosition.rowCoordinate, cellCoordinate: enemyPosition.cellCoordinate - 1});
        }
        break;
      case 5: 
        console.log(`enemy won't move`);
        break;
      case 6: 
        console.log('enemy move right');
        if (enemyPosition.cellCoordinate < gridSize - 1) {
          updateEnemyPosition({rowCoordinate: enemyPosition.rowCoordinate, cellCoordinate: enemyPosition.cellCoordinate + 1})
        }
        break;
      case 7: 
        console.log('enemy move up left');
        if(enemyPosition.rowCoordinate > 0 && enemyPosition.cellCoordinate > 0) {
          updateEnemyPosition({rowCoordinate: enemyPosition.rowCoordinate - 1, cellCoordinate: enemyPosition.cellCoordinate - 1})
        }
        break;
      case 8: 
        console.log('enemy move up');
        if(enemyPosition.rowCoordinate > 0) {
          updateEnemyPosition({rowCoordinate: enemyPosition.rowCoordinate - 1, cellCoordinate: enemyPosition.cellCoordinate});
        }
        break;
      case 9: 
        console.log('enemy move up right');
        if(enemyPosition.rowCoordinate && enemyPosition.cellCoordinate < gridSize - 1) {
          updateEnemyPosition({rowCoordinate: enemyPosition.rowCoordinate - 1, cellCoordinate: enemyPosition.cellCoordinate + 1})
        }
        break;

      default: 
        console.log('oops');
        break;
    }
  };

  const handleInput = (input) => {
    console.log(input.key);
  };

  useEffect(() => {
    window.addEventListener('keydown', event => handleInput(event));
    return () => window.removeEventListener('keydown', handleInput);
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
                        onClick={ () => { playerMove(cell.props.rowCoordinate, cell.props.cellCoordinate)} }
                      >

                        {
                          playerRowPosition === cell.props.rowCoordinate &&
                          playerCellPosition === cell.props.cellCoordinate &&
                          <img className='player' src={logo} alt='player icon' />
                        }

                        {
                          enemyPosition.rowCoordinate === cell.props.rowCoordinate &&
                          enemyPosition.cellCoordinate === cell.props.cellCoordinate &&
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

export default App;

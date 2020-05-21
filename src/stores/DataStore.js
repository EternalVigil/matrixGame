import {observable, action} from 'mobx';

class DataStore {
	constructor(Data) {
		console.log('initializing datastore');
	}

	gridSize = observable.box(9);
	playerPosition = observable({row: 0, cell: 0});
	enemyPosition = observable({row: 4, cell: 4});

	movePlayer = action( (targetRow, targetCell) => {
		if(this.playerPosition.row !== targetRow) {
			this.playerPosition.row = targetRow;
		}

		if(this.playerPosition.cell !== targetCell) {
			this.playerPosition.cell = targetCell;
		}
	});

	moveEnemy = action( () => {
		const randomDirection = Math.floor( Math.random() * this.gridSize);

	    switch (randomDirection) {
	      case 1:
	        console.log('enemy move down left');
	        if(this.enemyPosition.row < this.gridSize - 1 && this.enemyPosition.cell > 0) {
	        	this.enemyPosition = ({ row: this.enemyPosition.row + 1, cell: this.enemyPosition.cell - 1});
	        }
	        break;
	      case 2: 
	        console.log('enemy move down');
	        if(this.enemyPosition.row < this.gridSize - 1) {
	          this.enemyPosition = ({ row: this.enemyPosition.row + 1, cell: this.enemyPosition.cell});
	        }
	        break;
	      case 3: 
	        console.log('enemy move down right');
	        if(this.enemyPosition.row < this.gridSize - 1 && this.enemyPosition.cell < this.gridSize - 1) {
	          this.enemyPosition = ({row: this.enemyPosition.row + 1, cell: this.enemyPosition.cell + 1});
	        }
	        break;
	      case 4: 
	        console.log('enemy move left');
	        if(this.enemyPosition.cell > 0) {
	          this.enemyPosition = ({row: this.enemyPosition.row, cell: this.enemyPosition.cell - 1});
	        }
	        break;
	      case 5: 
	        console.log(`enemy won't move`);
	        break;
	      case 6: 
	        console.log('enemy move right');
	        if (this.enemyPosition.cell < this.gridSize - 1) {
	          this.enemyPosition = ({row: this.enemyPosition.row, cell: this.enemyPosition.cell + 1})
	        }
	        break;
	      case 7: 
	        console.log('enemy move up left');
	        if(this.enemyPosition.row > 0 && this.enemyPosition.cell > 0) {
	          this.enemyPosition = ({row: this.enemyPosition.row - 1, cell: this.enemyPosition.cell - 1})
	        }
	        break;
	      case 8: 
	        console.log('enemy move up');
	        if(this.enemyPosition.row > 0) {
	          this.enemyPosition = ({row: this.enemyPosition.row - 1, cell: this.enemyPosition.cell});
	        }
	        break;
	      case 9: 
	        console.log('enemy move up right');
	        if(this.enemyPosition.row && this.enemyPosition.cell < this.gridSize - 1) {
	          this.enemyPosition = ({row: this.enemyPosition.row - 1, cell: this.enemyPosition.cell + 1})
	        }
	        break;

	      default: 
	        console.log('oops');
	        break;
	    }
	});
}

export default new DataStore();
seaBattle.Player = function () {
	var lastOrientation = null,
	lastShipX = 'empty',
	lastShipY = null,
	result = null,
	lastStepX = null,
	lastStepY = null,
	lastX = null,
	lastY = null,
	x = null;
	
	this.move = function () {
		if (result == 'miss') {
			result = null;
			return;
		}
		var self = this;
		setTimeout(function () {
			self.shoot();
			if (result == 'sank') {
				lastShipX = 'empty';
				lastShipY = null;
				lastOrientation = null;
				seaBattle.theGame.checkShipsLeft();				
			}
			self.move();
		}, 300);
	}
	//выбирает метод выстрела
	this.shoot = function () {
		if (lastShipX != 'empty' ) {
			if (lastOrientation) {
				this.shootShip();
				return;
				
			}
			else {
				this.findOrientation();
				return;
				
			}
		}	
		else { 
			this.shootRandomly();
			return;
			
		}
		
	}	
	// стрелять случайным образом
	this.shootRandomly = function () {
		var check = false;
		while (!(check)) {
			var randomX = ( Math.round( Math.random()*10- 0.5 ) );
			var randomY = ( Math.round( Math.random()*10- 0.5 ) );
			check = seaBattle.theGame.playerField.checkPlace( randomX, randomY, 1);
		}
		result = seaBattle.theGame.playerField.cells[randomX][randomY].checkShot();
		if (result == 'ship-crashed') {
		lastShipX = randomX;
		lastShipY = randomY;
		}
		return;
	}

	//если корабль сбит, но ориентация неизвестна
	this.findOrientation = function () {
		var check = false;
		while (!(check)) {
			lastStepX = Math.round( Math.random()*3 - 1.5 ) ;
			lastStepY = (lastStepX != 0) ? 0 : (Math.round( Math.random()*3 - 1.5));
			lastX = lastShipX + lastStepX;
			lastY = lastShipY + lastStepY;
			check = seaBattle.theGame.playerField.checkPlace( lastX, lastY, 1);
		}
		result = seaBattle.theGame.playerField.cells[lastX][lastY].checkShot();
		if (result == 'ship-crashed') {
			lastOrientation = (lastStepX != 0) ? 'horizontal' : 'vertical';
		}
		return;
	}

	// если ориентация известна
	this.shootShip = function () {
		var check = false;
		lastX = lastX + lastStepX;
		lastY = lastY + lastStepY;
		
		check = seaBattle.theGame.playerField.checkPlace( (lastX), (lastY), 1);
		if (!(check)) {
			lastStepX = -lastStepX;
			lastStepY = -lastStepY;
			lastX = lastShipX + lastStepX;
			lastY = lastShipY + lastStepY;
			
		}
		result = seaBattle.theGame.playerField.cells[lastX][lastY].checkShot();
		if (result == 'miss') {
			lastStepX = -lastStepX;
			lastStepY = -lastStepY;
			lastX = lastShipX;
			lastY = lastShipY;
		}
		return;
	}
	
}




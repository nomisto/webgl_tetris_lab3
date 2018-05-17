GameManager = function(){
	var numberUnitsHeight = 16;
	var numberUnitsWidth = 8;
	
	var gravity;
	var occupiedBlocks = [];
	
	var score;
	var scoremultiplier=1;
	var gravitationspeed = 600;
	
	//tetromino in focus of the gamemanager
	var current;
	//X and Y position in the virutal grid of the current tetromino
	var currX;
	var currY;
	
	
	/* Initializes a new game.
	   All variables(occupiedBlocks,gravity, scoremultiplier, etc.) are set to default.
	   A tetromino is spawned.
	*/
	function initializeNewGame(){
		
		for(i=0; i<8; i++){
			occupiedBlocks[i] = [];
			for(j=0; j<16; j++){
				occupiedBlocks[i][j]=0;
			}
		}
		
		gravity=false;
		scoremultiplier = 1;
		gravitationspeed = 600;
		score=0;
		
		updateDifficulty();
		updateScore();
		ObjectManager.deleteAll();
		spawnTetromino();
	}
	
	//alerts the user that the game is over and starts anew
	function stopGame(){
		alert("GameOver");
		initializeNewGame();
	}
	
	//spawns a random tetromino and starts the gravity
	function spawnTetromino(){
		var i = Math.floor((Math.random() * 7) + 1);
		ObjectManager.addTetromino(i);
		startGravity();
	}
	
	//helper function which applies one function to every block of current
	//orientationAfterRotation is optional (only needed for boundary checks before a rotation)
	function forEachBlockOfCurrent(func,orientationAfterRotation){
		if(current!=null){
			var currentBlocks = current.getRotatedBlocks(orientationAfterRotation);
			for(i=0; i<current.blocklength; i++){
					var x = currX + currentBlocks[2*i];
					var y = currY - currentBlocks[2*i+1];
					func(x,y);
			}
		}
	}
	
	//returns true if the blocks aren't occupied in the specified direction (movX,movY)
	//f.e. movX = 1, movY = 0 means one movement to the right
	function occupied(movX,movY,orientationAfterRotation){
		var result = false;
		forEachBlockOfCurrent(function(x,y){
			x += movX;
			y += movY;
			if(x >= numberUnitsWidth || y >= numberUnitsHeight || getBlock(x,y)){
				result += true;
			}
		},orientationAfterRotation);
		return result;
	}
	
	//if the space one unit to the right of the current tetromino isnt occupied the "right"-Animation is added to the 
	//Animationhandler and currX is incremented
	function moveRight(){
		if(!occupied(1,0)){
			AnimationHandler.addAnimation(1);
			currX++;
		}
	};
	
	//if the space one unit to the left of the current tetromino isnt occupied the "left"-Animation is added to the 
	//Animationhandler and currX is decremented
	function moveLeft(){
		if(!occupied(-1,0)){
			AnimationHandler.addAnimation(2);
			currX--;
		}
	};
	
	//rotates a tetromino counterclockwise if the rotation can be completed without any collisions after the rotation is finished
	function rotateCCl(){
		var orientationAfterRotation = current.getTetrominoOrientation() - 1;
		if(!occupied(0,0,orientationAfterRotation)){
			AnimationHandler.addAnimation(5);
		}
	};
	
	//rotates a tetromino clockwise if the rotation can be completed without any collisions after the rotation is finished
	function rotateCl(){
		var orientationAfterRotation = current.getTetrominoOrientation() + 1;
		if(!occupied(0,0,orientationAfterRotation)){
			AnimationHandler.addAnimation(6);
		}
	};
	
	/*Evolved as the core of the game, there are 3 options:
	  1. If space beneath a tetromino isnt occupied, the "down"-Animation is added to the Animationhandler and currY is incremented.
	  2. else if the space where the tetromino is now isn't occupied (needed because a tetromino spawnes everytime at a certain place and if this place is already occupied the game ends) 
	     occupiedblocks are updated and a check for a full line runs. Then a new tetromino is spawned.
	  3. the game ends, ObjectManager deletes the last tetromino for visual purposes
	*/
	function gravitate() {
		if(!occupied(0,1)){
			if(gravity){
				AnimationHandler.addAnimation(4);
				currY++;
			}
		} 
		else if(!occupied(0,0)){
			updateOccupiedBlocks();
			stopGravity();
			checkFullLine();
			spawnTetromino();
		} else {
			ObjectManager.deleteLast();
			stopGame();
		}
	}
	
	/*checks for full lines
	  if full lines are found, everyone is deleted one by one
	  first the row will be deleted and tetrominos altered (deleteFullLine and falldownAlteredTetros)
	  then all the other non-altered tetrominos will fall down as long as they can (falldownAll).*/
	function checkFullLine(){
		var fullY = [];
		forEachBlockOfCurrent(function(x,y){
			var check = 0;
			for(j=0; j<8; j++){
				if(occupiedBlocks[j][y]==0){break;}
				else {check++;}
			}
			
			if(check==8){
				fullY = fullY.filter(value => value!=y);
				fullY.push(y);
			}
		});
		if(fullY.length!=0){
			fullY.sort(function(a, b){return a - b});
			fullY.forEach(function(o){
				var alteredTetros = deleteFullLine(o);
				falldownAlteredTetros(alteredTetros,o);
				falldownAll();
				print();
			});
		}
	}
	
	
	// deletes one line and updates the score
	function deleteFullLine(o){
		score += 10 * scoremultiplier;
		updateScore();
		
		var changedTetros = [];
		for(k=0; k<8; k++){
			var tetrominoblockid = occupiedBlocks[k][o];
			var blockid = tetrominoblockid % 10;
			var tetrominoid = Math.floor(tetrominoblockid/10);
			var tetro = ObjectManager.getTetrominoByIndex(tetrominoid);
			console.log(blockid);
			tetro.deleteBlock(blockid);
			setCurrent(tetro);
			updateOccupiedBlocks();
			occupiedBlocks[k][o]=0;
			if(tetro.blocklength!=0){
				changedTetros = changedTetros.filter(value => value!=tetrominoid);
				changedTetros.push(tetrominoid);
			}
		}
		return changedTetros;
	}
	
	//lets the altered tetrominos fall down by one unit
	function falldownAlteredTetros(alteredTetros,o){
		alteredTetros.forEach(function(tetrominoid){
			setCurrent(ObjectManager.getTetrominoByIndex(tetrominoid));
			forEachBlockOfCurrent(function(x,y){
				if(y < o){
					occupiedBlocks[x][y]=0;
					current.blocks[2*i+1] -=1;
					if(current.getTetrominoOrientation() == 0) { mat4.translate(current.mvMatrixArray[i],current.mvMatrixArray[i],[0,-1,0]); }
					else if(current.getTetrominoOrientation() == 1) { mat4.translate(current.mvMatrixArray[i],current.mvMatrixArray[i],[1,0,0]); }
					else if(current.getTetrominoOrientation() == 2) { mat4.translate(current.mvMatrixArray[i],current.mvMatrixArray[i],[0,1,0]); }
					else if(current.getTetrominoOrientation() == 3) { mat4.translate(current.mvMatrixArray[i],current.mvMatrixArray[i],[-1,0,0]); }
				}
			});
			updateOccupiedBlocks();
		});
	}
	
	// Lets all tetrominos fall down as long as they dont collide with another tetromino
	function falldownAll() {
		var fallen = 0;
		ObjectManager.getAllTetrominos().forEach(function(tetro){
			if(tetro.blocklength!=0){
				setCurrent(tetro);
				forEachBlockOfCurrent(function(x,y){
					occupiedBlocks[x][y]=0;
				});
				if(!occupied(0,1)){
					fallen++;
					for(i=0; i<current.blocklength; i++){
						if(current.getTetrominoOrientation() == 0) { mat4.translate(current.mvMatrixArray[i],current.mvMatrixArray[i],[0,-1,0]); }
						else if(current.getTetrominoOrientation() == 1) { mat4.translate(current.mvMatrixArray[i],current.mvMatrixArray[i],[1,0,0]); }
						else if(current.getTetrominoOrientation() == 2) { mat4.translate(current.mvMatrixArray[i],current.mvMatrixArray[i],[0,1,0]); }
						else if(current.getTetrominoOrientation() == 3) { mat4.translate(current.mvMatrixArray[i],current.mvMatrixArray[i],[-1,0,0]); }
					}
					currY++;
				}
				updateOccupiedBlocks();
			}
		});
		if(fallen!=0) {falldownAll();}
	}
	
	//updates the occupied blocks array
	function updateOccupiedBlocks(){
			forEachBlockOfCurrent(function(x,y){
				occupiedBlocks[x][y]= current.index * 10 + i;
			});
			current.currX=currX;
			current.currY=currY;
	}
	
	//Starts the gravity, if gravity is already true triple the falldown speed
	function startGravity(){
		if(!gravity){
			AnimationHandler.setGravitationSpeed(gravitationspeed);
			gravity=true;
			gravitate();
		} else {
			AnimationHandler.setGravitationSpeed(gravitationspeed/3);
		}
	}
	
	//stops the gravity
	function stopGravity(){
		gravity=false;
	}
	
	// returns the block of occupiedblocks
	function getBlock(x,y){
		if(x<0) {return 1;}
		return occupiedBlocks[x][y];
	}
	
	// sets the current tetromino of the gamemanager
	function setCurrent(tetro){
		current = tetro;
		currX=tetro.currX;
		currY=tetro.currY;
	}
	
	// returns the current tetromino
	function getCurrent(){
		return current;
	}
	
	// increases the difficulty by raising the gravitationspeed
	function increaseDifficulty(){
		if(gravitationspeed > 100){
			scoremultiplier+=1;
			gravitationspeed-=100;
			
			AnimationHandler.setGravitationSpeed(gravitationspeed);
			updateDifficulty();
		}
	}
	
	// decreases the difficulty by lowering the gravitationspeed
	function decreaseDifficulty(){
		if(scoremultiplier>1){
			scoremultiplier-=1;
			gravitationspeed+=100;
			
			AnimationHandler.setGravitationSpeed(gravitationspeed);
			updateDifficulty();
		}
	}
		
	// prints the occupiedblocks array for debbuging purposes.
	function print(){
		console.log("----1-2-3-4-5-6-7-8----------\n");
		for(j=0; j<16; j++){
			var str = j + "|| ";
			for(i=0; i<8; i++){
				str += (Math.floor(occupiedBlocks[i][j]/10) + "" + occupiedBlocks[i][j]%10 + " ");
			}
			console.log(str + "\n");
		}
	}
	
	function updateScore(){
		document.getElementById('score').innerHTML = "Dein aktueller Score ist: " + score;
		if(score!=0 && score  > getScoreBoundary()){
			alert("New Difficulty reached!");
			increaseDifficulty();
		}
	}
	
	function getScoreBoundary(){
		res =0;
		for(i=1; i<=scoremultiplier; i++){
			res += i;
		}
		res *=100;
		return res;
	}
	
	function updateDifficulty(){
		var result = "Difficulty: " + scoremultiplier;
		document.getElementById('difficulty').setAttribute('value',result);
	}
	
	return{
		initializeNewGame: initializeNewGame,
		gravitate: gravitate,
		startGravity: startGravity,
		stopGravity: stopGravity,
		setCurrent: setCurrent,
		getCurrent: getCurrent,
		print: print,
		moveRight: moveRight,
		moveLeft: moveLeft,
		rotateCl: rotateCl,
		rotateCCl: rotateCCl,
		increaseDifficulty: increaseDifficulty,
		decreaseDifficulty: decreaseDifficulty
	}
}();
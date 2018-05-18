GameManager = function(){
	
	var gravity;
	var occupiedBlocks = [];
	
	var gravitationspeed = 600;
	
	//tetromino in focus of the gamemanager
	var current;
	
	

	function initializeNewGame(){
		
		for(var i=0; i<5; i++){
			occupiedBlocks[i] = [];
			for(var j=0; j<10; j++){
				occupiedBlocks[i][j]=[];
				for(var k=0; k<5; k++){
					occupiedBlocks[i][j][k]=0;
				}
			}
		}
		gravity=false;
		gravitationspeed = 600;
		
		ObjectManager.deleteAll();
		spawnTetracube();
	}
	
	//alerts the user that the game is over and starts anew
	function stopGame(){
		alert("GameOver");
		initializeNewGame();
	}
	
	//spawns a random tetracube and starts the gravity
	function spawnTetracube(){
		var i = Math.floor((Math.random() * 8) + 1);
		ObjectManager.addTetracube(1);
		AnimationHandler.resetAxis();
		toggleGravity();
	}
	
	//helper function which applies one function to every block of current
	//orientationAfterRotation is optional (only needed for boundary checks before a rotation)
	function forEachBlockOfCurrent(func){
		if(current!=null){
			for(i = 0; i < current.blocklength; i++){
				var coords = getArrayCoordsOfCurrentBlock(i);
				var x = Math.round(coords[0]);
				var y = Math.round(-coords[1]);
				var z = Math.round(coords[2]);
				func(x,y,z);
			}
		}
	}
	
	
	//returns true if the blocks aren't occupied in the specified direction (movX,movY)
	//f.e. movX = 1, movY = 0 means one movement to the right
	function occupied(movX,movY,movZ,rotation){
		var result = false;
		for(var i = 0; i < current.blocklength; i++){
			var coords = getArrayCoordsOfCurrentBlock(i,rotation);
			var x = Math.round(coords[0]) + movX;
			var y = Math.round(-coords[1]) + movY;
			var z = Math.round(coords[2]) + movZ;
			if(x >= 5 || x < 0 || y >= 10 || z >= 5 || z < 0 || getBlock(x,y,z)){
				result += true;
			}
		}
		return result;
	}
	
	
	function getArrayCoordsOfCurrentBlock(i,rotation){
		var test = vec4.fromValues(0,0,0,1);
		var mm = mat4.create();
		if(rotation!=null){
			mm = AnimationHandler.getFullRotation(i,rotation);
		} else {
			mat4.copy(mm,current.mvMatrixArray[i]);
		}
		var trans = mat4.create();
		mat4.identity(trans);
		mat4.translate(trans,trans,[4,-9,19]);
		mat4.multiply(mm,trans,mm);
		vec4.transformMat4(test,test,mm);
		vec4.scale(test,test,0.5);
		return test;
	}
	
	function isNextFree(i){
		switch(i){
			case 1: return !occupied(1,0,0);
			case 2: return !occupied(-1,0,0);
			case 3: return !occupied(0,0,1);
			case 4: return !occupied(0,0,-1);
			case 5: return !occupied(0,0,0,5);
			case 6: return !occupied(0,0,0,6);
			case 7: return !occupied(0,0,0,7);
			case 8: return !occupied(0,0,0,8);
			case 9: return !occupied(0,0,0,9);
			case 10: return !occupied(0,0,0,10);
			case 11: return !occupied(0,1,0);
		}
	}
	
	
	/*Evolved as the core of the game, there are 3 options:
	  1. If space beneath a tetromino isnt occupied, the "down"-Animation is added to the Animationhandler and currY is incremented.
	  2. else if the space where the tetromino is now isn't occupied (needed because a tetromino spawnes everytime at a certain place and if this place is already occupied the game ends) 
	     occupiedblocks are updated and a check for a full line runs. Then a new tetromino is spawned.
	  3. the game ends, ObjectManager deletes the last tetromino for visual purposes
	*/
	function gravitate() {
		if(gravity){
			if(!occupied(0,1,0)){
					AnimationHandler.addAnimation(11);
			}
			else if(!occupied(0,0,0)){
				updateOccupiedBlocks();
				toggleGravity();
				checkFullPlane();
				spawnTetracube();
			} else {
				ObjectManager.deleteLast();
				stopGame();
			}
		}
	}
	
	/*checks for full lines
	  if full lines are found, everyone is deleted one by one
	  first the row will be deleted and tetrominos altered (deleteFullLine and falldownAlteredTetros)
	  then all the other non-altered tetrominos will fall down as long as they can (falldownAll).*/
	function checkFullPlane(){
		var fullY = [];
		forEachBlockOfCurrent(function(x,y,z){
			var check = 0;
			for(var j = 0; j<5; j++){
				for(var k = 0; k<5; k++){
					if(occupiedBlocks[j][y][k]==0){break;}
					else {check++;}
				}
			}
			
			if(check==25){
				fullY = fullY.filter(value => value!=y);
				fullY.push(y);
			}
		});
		if(fullY.length!=0){
			fullY.sort(function(a, b){return a - b});
			fullY.forEach(function(o){
				var alteredTetras = deleteFullPlane(o);
				falldownAlteredTetras(alteredTetras,o);
				falldownAll();
			});
		}
	}
	
	
	// deletes one line and updates the score
	function deleteFullPlane(o){
		
		var changedTetras = [];
		for(k=0; k<5; k++){
			for(l=0; l<5; l++){
				var tetracubeblockid = occupiedBlocks[k][o][l];
				var blockid = tetracubeblockid % 10;
				var tetracubeid = Math.floor(tetracubeblockid/10);
				var tetra = ObjectManager.getTetracubeByIndex(tetracubeid);
				tetra.deleteBlock(blockid);
				setCurrent(tetra);
				updateOccupiedBlocks();
				occupiedBlocks[k][o][l]=0;
				if(tetra.blocklength!=0){
					changedTetras = changedTetras.filter(value => value!=tetracubeid);
					changedTetras.push(tetracubeid);
				}
			}
		}
		return changedTetras;
	}
	
	//lets the altered tetrominos fall down by one unit
	function falldownAlteredTetras(alteredTetras,o){
		alteredTetras.forEach(function(tetracubeid){
			setCurrent(ObjectManager.getTetracubeByIndex(tetracubeid));
			forEachBlockOfCurrent(function(x,y,z){
				if(y < o){
					occupiedBlocks[x][y][z]=0;
					var trans = mat4.create();
					mat4.identity(trans);
					mat4.translate(trans, trans, [0,-2,0]);
					mat4.multiply(current.mvMatrixArray[i], trans, current.mvMatrixArray[i]);
				}
			});
			updateOccupiedBlocks();
		});
	}
	
	// Lets all tetrominos fall down as long as they dont collide with another tetromino
	function falldownAll() {
		var fallen = 0;
		ObjectManager.getAllTetracubes().forEach(function(tetra){
			if(tetra.blocklength!=0){
				setCurrent(tetra);
				forEachBlockOfCurrent(function(x,y,z){
					occupiedBlocks[x][y][z]=0;
				});
				if(!occupied(0,1,0)){
					fallen++;
					for(i=0; i<current.blocklength; i++){
						var trans = mat4.create();
						mat4.identity(trans);
						mat4.translate(trans, trans, [0,-2,0]);
						mat4.multiply(current.mvMatrixArray[i], trans, current.mvMatrixArray[i]);
					}
				}
				updateOccupiedBlocks();
			}
		});
		if(fallen!=0) {falldownAll();}
	}
	
	//updates the occupied blocks array
	function updateOccupiedBlocks(){
		forEachBlockOfCurrent(function(x,y,z){
			
		console.log("x: " + x);
		console.log("y: " + y);
		console.log("z: " + z);
			occupiedBlocks[x][y][z] = current.index * 10 + i;
		});
	}
	
	//Starts the gravity, if gravity is already true triple the falldown speed
	function toggleGravity(){
		if(!gravity){
			AnimationHandler.setGravitationSpeed(gravitationspeed);
			gravity=true;
			gravitate();
		} else {
			gravity=false;
		}
	}
	
	function drop(){
		AnimationHandler.setGravitationSpeed(gravitationspeed/8);
		if(!gravity){
			gravity=true;
			gravitate();
		}
	}
	
	// returns the block of occupiedblocks
	function getBlock(x,y,z){
		return occupiedBlocks[x][y][z];
	}
	
	// sets the current tetromino of the gamemanager
	function setCurrent(tetra){
		current = tetra;
	}
	
	// returns the current tetromino
	function getCurrent(){
		return current;
	}
	
	return{
		initializeNewGame: initializeNewGame,
		gravitate: gravitate,
		toggleGravity: toggleGravity,
		setCurrent: setCurrent,
		getCurrent: getCurrent,
		drop: drop,
		isNextFree: isNextFree
	}
}();
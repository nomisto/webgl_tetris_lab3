ObjectManager = function(){

	var tetracubes = [];
	
	var index = 1;

	function addTetracube (input) {
		if(input==1){
			initTetracube(IShape);
		}
		else if(input==2){
			initTetracube(OShape);
		}
		else if(input==3){
			initTetracube(LShape);
		}
		else if(input==4){
			initTetracube(TShape);
		}
		else if(input==5){
			initTetracube(SShape);
		}
		else if(input==6){
			initTetracube(towRightShape);
		}
		else if(input==7){
			initTetracube(towLeftShape);
		}
		else if(input==8){
			initTetracube(tripodShape);
		}
	}

	function initTetracube(x){
		
		var mvMatrices = [];
		
		var blocks = x.getBlocks();
		
		var texturetypex = Math.floor((Math.random() * 5));
		var texturetypey = Math.floor((Math.random() * 2));
		var texcoords = Texture.getTextureCoords(texturetypex, texturetypey);
		
		for(i = 0; i<4; i++){
			var mvMatrix = mat4.create();
			mat4.identity(mvMatrix);
			mat4.translate(mvMatrix, mvMatrix, [0,9,-15]);
			mat4.translate(mvMatrix, mvMatrix, [blocks[i*3]*2, blocks[i*3+1]*2, blocks[i*3+2]*2]);
			mvMatrices.push(mvMatrix);
		}
		var x = new Tetracube(index, createTexcoordsBuffer(texcoords), mvMatrices, blocks, x.getVectorToRotationOrigin(), 0, 3,0,3);
		tetracubes.push(x);
		//GameManager.setCurrent(x);
		index++;
	}
	

	// Creates a texturecoordinations buffer and binds it 
	function createTexcoordsBuffer(texcoords){
		var vertexTexcoordsBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexcoordsBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
		return vertexTexcoordsBuffer;
	}
	
	// returns the array of all tetracubes
	function getAllTetracubes(){
		return tetracubes;
	}
	
	//returns a tetracube of given index
	function getTetracubeByIndex(index){
		return tetracubes[index-1];
	}
	
	//deletes the last tetracube (needed when the game ends)
	function deleteLast(){
		tetracubes.pop();
		index--;
	}
	
	//deletes all tetracubes
	function deleteAll(){
		tetracubes=[];
		index = 1;
	}
	
	
	return{
		addTetracube: addTetracube,
		getAllTetracubes: getAllTetracubes,
		getTetracubeByIndex: getTetracubeByIndex,
		deleteLast: deleteLast,
		deleteAll: deleteAll
	}
}();
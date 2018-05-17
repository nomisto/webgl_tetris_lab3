IShape = function(){
	function getBlocks(){
		return [
			0,0,0,
			0,-1,0,
			0,-2,0,
			0,-3,0
		]
	}
	
	function getVectorToRotationOrigin(){
		return [
			-0.5,-1.5,-0.5,
			-0.5,-0.5,-0.5,
			-0.5,0.5,-0.5,
			-0.5,1.5,-0.5
		]
	}
	
	return {
		getBlocks: getBlocks,
		getVectorToRotationOrigin: getVectorToRotationOrigin
	}
}();




OShape = function() {
	//returns an array of the vertices of this shape
	function getBlocks(){
		return [
			0,0,0,
			1,0,0,
			0,-1,0,
			1,-1,0
		];
	}
	
	function getVectorToRotationOrigin(){
		return [
			0.5,-0.5,-0.5,
			-0.5,-0.5,-0.5,
			0.5,0.5,-0.5,
			-0.5,0.5,-0.5
		]
	}

	return {
		getBlocks: getBlocks,
		getVectorToRotationOrigin: getVectorToRotationOrigin
	}
}();




LShape = function() {
	//returns an array of the vertices of this shape
	function getBlocks(){
		return [
			0,0,0,
			1,0,0,
			1,-1,0,
			1,-2,0
		];
	}
	
	//returns a vector to the rotation origin of each block
	function getVectorToRotationOrigin(){
		return [
			1,-1,0,
			0,-1,0,
			0,0,0,
			0,1,0
		]
	}
	
	return {
		getBlocks: getBlocks,
		getVectorToRotationOrigin: getVectorToRotationOrigin
	}
}();




TShape = function() {
	
	//returns an array of the vertices of this shape
	function getBlocks(){
		return [
			0,0,0,
			1,0,0,
			2,0,0,
			1,-1,0
		];
	}
	
	function getVectorToRotationOrigin(){
		return [
			1, 0,0,
			0, 0,0,
			-1, 0,0,
			0, 1,0
		]
	}

	return {
		getBlocks: getBlocks,
		getVectorToRotationOrigin: getVectorToRotationOrigin
	}
}();




SShape = function() {
	
	//returns an array of the vertices of this shape
	function getBlocks(){
		return [
			0,-1,0,
			1,-1,0,
			1,0,0,
			2,0,0
		];
	}
	
	function getVectorToRotationOrigin(){
		return [
			1,0,0,
			0,0,0,
			0,-1,0,
			-1,-1,0
		]
	}

	return {
		getBlocks: getBlocks,
		getVectorToRotationOrigin: getVectorToRotationOrigin
	}
}();




towRightShape = function() {
	
	//returns an array of the vertices of this shape
	function getBlocks(){
		return [
			1,0,0,
			1,-1,0,
			1,-1,1,
			0,-1,1
		];
	}
	
	function getVectorToRotationOrigin(){
		return [
			0,-1,0,
			0,0,0,
			0,0,-1,
			1,0,-1
		]
	}

	return {
		getBlocks: getBlocks,
		getVectorToRotationOrigin: getVectorToRotationOrigin
	}
}();

towLeftShape = function() {
	
	//returns an array of the vertices of this shape
	function getBlocks(){
		return [
			0,0,0,
			0,-1,0,
			0,-1,1,
			1,-1,1
		];
	}
	
	function getVectorToRotationOrigin(){
		return [
			0,-1,0,
			0,0,0,
			0,0,-1,
			-1,0,-1
		]
	}

	return {
		getBlocks: getBlocks,
		getVectorToRotationOrigin: getVectorToRotationOrigin
	}
}();

tripodShape = function() {
	
	//returns an array of the vertices of this shape
	function getBlocks(){
		return [
			1,0,0,
			0,-1,0,
			1,-1,1,
			1,-1,0
		];
	}
	
	function getVectorToRotationOrigin(){
		return [
			0,-1,0,
			1,0,0,
			0,0,-1,
			0,0,0
		]
	}

	return {
		getBlocks: getBlocks,
		getVectorToRotationOrigin: getVectorToRotationOrigin
	}
}();
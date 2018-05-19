IShape = function(){
	// returns an array of block composition of this tetracube
	function getBlocks(){
		return [
			0,0,0,
			0,-1,0,
			0,-2,0,
			0,-3,0
		]
	}
	
	// returns the vector to the rotation origin of each block
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

//further shapes see comments above


OShape = function() {
	
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

	function getBlocks(){
		return [
			0,0,0,
			1,0,0,
			1,-1,0,
			1,-2,0
		];
	}
	

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
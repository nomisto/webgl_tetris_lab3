Cylinder = function() {
	
	var vertexPositionBuffer;
	var vertexNormalBuffer;
	var vertexIndexBuffer;
	var vertexTexcoordsBuffer;
	
	// sets up the buffers for the vertices, indices, and normals of a cube.
	function setup(){
		
		var vertices = [];
		var indices = [];
		var normals = [];
		
		
		//VERTICES
		// Top
		vertices = vertices.concat([0,1,0]);
		for(var i = 0; i<360; i+=10){
			vertices = vertices.concat([getX(i),1,getZ(i)]);
		}
		
		//Bottom
		vertices = vertices.concat([0,-1,0]);
		for(var i = 0; i<360; i+=10){
			vertices = vertices.concat([getX(i),-1,getZ(i)]);
		}
		
		//Side
		for(var i = 0; i<360; i+=10){
			vertices = vertices.concat([getX(i),1,getZ(i)]);
		}
		for(var i = 0; i<360; i+=10){
			vertices = vertices.concat([getX(i),-1,getZ(i)]);
		}
		
		
		
		//INDICES
		//Top
		for(var i = 1; i<36; i++){
			indices = indices.concat([0,i,i+1]);
		}
		indices = indices.concat([0,1,36]);
		
		//Bottom
		for(var i = 38; i<73; i++){
			indices = indices.concat([37,i,i+1]);
		}
		indices = indices.concat([37,38,73]);
		
		
		//Side
		for(var i = 74; i<109; i++){
			indices = indices.concat([i,i+1,i+36]);
		}
		indices = indices.concat([74,109,145]);
		
		for(var i = 110; i<145; i++){
			indices = indices.concat([i,i+1,i-35]);
		}
		indices = indices.concat([74,110,145]);
		
		
		
		//NORMALS
		//Top
		for(var i = 0; i<37; i++){
			normals = normals.concat([0,1,0]);
		}
		//Bottom
		for(var i = 0; i<37; i++){
			normals = normals.concat([0,-1,0]);
		}
		//Side
		for(var i = 0; i<360; i+=10){
			normals = normals.concat([getX(i),1,getZ(i)]);
		}
		for(var i = 0; i<360; i+=10){
			normals = normals.concat([getX(i),-1,getZ(i)]);
		}
		
		var texcoords = [];
		for(var i = 0; i<146; i++){
			texcoords = texcoords.concat([0,0]);
		}

		
		vertexPositionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		vertexPositionBuffer.itemSize = 3;
		vertexPositionBuffer.numItems = vertices.length/3;
		
		vertexIndexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
		vertexIndexBuffer.itemSize = 1;
		vertexIndexBuffer.numItems = indices.length;
		
		vertexNormalBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
		vertexNormalBuffer.itemSize = 3;
		vertexNormalBuffer.numItems = normals.length/3;
		
		vertexTexcoordsBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexcoordsBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
		
	}
	
	// returns the x value of a circle with radius 1
	function getX(angle){
		return Math.cos(angle*Math.PI/180);
	}
	
	// returns the z value of a circle with radius 1
	function getZ(angle){
		return Math.sin(angle*Math.PI/180);
	}
	
	
	function getPositionBuffer(){
		return vertexPositionBuffer;
	}
	
	function getIndexBuffer(){
		return vertexIndexBuffer;
	}
	
	function getNormalBuffer(){
		return vertexNormalBuffer;
	}
	
	function getTexcoordsBuffer(){
		return vertexTexcoordsBuffer;
	}
	
	return {
		setup:setup,
		getPositionBuffer:getPositionBuffer,
		getNormalBuffer: getNormalBuffer,
		getIndexBuffer:getIndexBuffer,
		getTexcoordsBuffer: getTexcoordsBuffer
	}
}();
		
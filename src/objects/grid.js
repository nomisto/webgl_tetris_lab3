Grid = function() {
	
	var horizontalVertexPositionBuffer;
	var verticalVertexPositionBuffer;
	
	var horizontalVertexTexcoordsBuffer;
	var verticalVertexTexcoordsBuffer;
	
	var horizontalVertexNormalsBuffer;
	var verticalVertexNormalsBuffer;
	
	var topMMatrix;
	var bottomMMatrix;
	var leftMMatrix;
	var rightMMatrix;
	var frontMMatrix;
	var backMMatrix;
	
	// sets up the buffers and mMatrices of the grid pieces.
	function setup() {
		topMMatrix = mat4.create();
		mat4.identity(topMMatrix);
		mat4.translate(topMMatrix,topMMatrix,[0,10,-15]);
		
		bottomMMatrix = mat4.create();
		mat4.identity(bottomMMatrix);
		mat4.translate(bottomMMatrix,bottomMMatrix,[0,-10,-15]);
		
		leftMMatrix = mat4.create();
		mat4.identity(leftMMatrix);
		mat4.rotateX(leftMMatrix,leftMMatrix,Math.PI/2);
		mat4.rotateZ(leftMMatrix,leftMMatrix,Math.PI/2);
		mat4.translate(leftMMatrix,leftMMatrix,[-15,5,0]);
		
		rightMMatrix = mat4.create();
		mat4.translate(rightMMatrix,leftMMatrix,[0,-10,0]);
		
		frontMMatrix = mat4.create();
		mat4.rotateX(frontMMatrix,frontMMatrix,Math.PI/2);
		mat4.translate(frontMMatrix,frontMMatrix,[0,-10,0]);
		
		backMMatrix = mat4.create();
		mat4.translate(backMMatrix,frontMMatrix,[0,-10,0]);
		
		horizontalVertexPositionBuffer = setupVertexPositionBuffer(5,5);
		verticalVertexPositionBuffer = setupVertexPositionBuffer(5,10);
		
		setupHorizontalVertexTexcoordsBuffer();
		setupVerticalVertexTexcoordsBuffer();
		
		horizontalVertexNormalsBuffer = setupHorizontalVertexNormalsBuffer();
		verticalVertexNormalsBuffer = setupVerticalVertexNormalsBuffer();
		
	}
	
	// returns a vertex position buffer for a grid with following dimensions
	//bx ... numbers of grid fields on the x axis
	//hz ... numbers of grid fields on the z axis
	function setupVertexPositionBuffer(bx,hz){
		var res = [];
		
		// lines parallel to z
		for(i=0;i<((bx+1)*2);i++){
			var x = -bx + 2*Math.floor(i/2);
			var y = 0;
			var z;
			
			if(i%2==0){
				z = hz;
			} else {
				z = -hz;
			}
			res = res.concat(x);
			res = res.concat(y);
			res = res.concat(z);
		}
		
		// lines parallel to x
		for(i=0;i<((hz+1)*2);i++){
			var x;
			var y = 0;
			var z = -hz + 2*Math.floor(i/2);
			
			if(i%2==0){
				x = bx;
			} else {
				x = -bx;
			}
			res = res.concat(x);
			res = res.concat(y);
			res = res.concat(z);
		}
		return createVertexPositionBuffer(res);
	}
	
	
	// sets up the texcoords buffer of the grid (needed to use color and textures at the same time see main:152)
	function setupHorizontalVertexTexcoordsBuffer(){
		res = [];
		for(i=0;i<24;i++){
				res = res.concat([0,0]);
		}
		horizontalVertexTexcoordsBuffer = createVertexTexcoordsBuffer(res);
	}
	
	function setupVerticalVertexTexcoordsBuffer(){
		res = [];
		for(i=0;i<34;i++){
				res = res.concat([0,0]);
		}
		verticalVertexTexcoordsBuffer = createVertexTexcoordsBuffer(res);
	}
	
	// sets up the normal buffers for the grid vertices, all set to 0,0,0
	function setupHorizontalVertexNormalsBuffer(){
		res = [];
		for(i=0;i<24;i++){
				res = res.concat([0,0,0]);
		}
		return createVertexNormalsBuffer(res);
	}
	
	function setupVerticalVertexNormalsBuffer(){
		res = [];
		for(i=0;i<34;i++){
				res = res.concat([0,0,0]);
		}
		return createVertexNormalsBuffer(res);
	}
	
	
	// Functions to create the 3 different buffers and to get them or the mMatrices
	
	function createVertexPositionBuffer(vertices){
		var vertexPositionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		vertexPositionBuffer.itemSize = 3;
		vertexPositionBuffer.numItems = vertices.length/3;
		return vertexPositionBuffer;
	}
	
	function createVertexTexcoordsBuffer(texcoords){
		var vertexTexcoordsBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexcoordsBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
		return vertexTexcoordsBuffer;
	}
	
	function createVertexNormalsBuffer(normals){
		var vertexNormalsBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalsBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
		return vertexNormalsBuffer;
	}
	
	function getVertexPositionBuffer(i){
		if(i==='horiz'){return horizontalVertexPositionBuffer;}
		else {return verticalVertexPositionBuffer;}
	}
	
	function getVertexTexcoordsBuffer(i){
		if(i==='horiz'){return horizontalVertexTexcoordsBuffer;}
		else {return verticalVertexTexcoordsBuffer;}
	}
	
	function getVertexNormalsBuffer(i){
		if(i==='horiz'){return horizontalVertexNormalsBuffer;}
		else {return verticalVertexNormalsBuffer;}
	}
	
	function getMMatrices(i){
		switch(i){
			case 0 : return topMMatrix;
			case 1 : return bottomMMatrix;
			case 2 : return leftMMatrix;
			case 3 : return rightMMatrix;
			case 4 : return frontMMatrix;
			case 5 : return backMMatrix;
		}
	}
	
	return {
		getVertexPositionBuffer: getVertexPositionBuffer,
		getVertexTexcoordsBuffer: getVertexTexcoordsBuffer,
		getVertexNormalsBuffer: getVertexNormalsBuffer,
		getMMatrices: getMMatrices,
		setup: setup
	};
}();

var gl;
var shaderProgram;

// Creates, compiles and returns the shader of the given id.
function getShader(id) {
		var shaderScript = document.getElementById(id);
		if (!shaderScript) {
			return null;
		}
		var str = "";
		var k = shaderScript.firstChild;
		while (k) {
			if (k.nodeType == 3) {
				str += k.textContent;
			}
			k = k.nextSibling;
		}
		var shader;
		if (shaderScript.type == "x-shader/x-fragment") {
			shader = gl.createShader(gl.FRAGMENT_SHADER);
		} else if (shaderScript.type == "x-shader/x-vertex") {
			shader = gl.createShader(gl.VERTEX_SHADER);
		} else {
			return null;
		}
		gl.shaderSource(shader, str);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			alert(gl.getShaderInfoLog(shader));
			return null;
		}
		return shader;
	}

// Initializes the shader program
// Gets the location of the attributes and uniforms of the vertexShader and stores it in the shaderProgram
function initShaders(vertexShaderId, fragmentShaderId) {
	var fragmentShader = getShader(fragmentShaderId);
	var vertexShader = getShader(vertexShaderId);

	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert("Could not initialise shaders");
	}

	gl.useProgram(shaderProgram);

	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	shaderProgram.vertexTextureAttribute = gl.getAttribLocation(shaderProgram, "aTexCoords");
	gl.enableVertexAttribArray(shaderProgram.vertexTextureAttribute);

	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, "uMMatrix");
	shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
}

// sets the uniform uPMatrix of the vertexshader to the projection matrix
function setPMatrixUniform(pMatrix) {
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
}

// sets the uniform uMVMatrix of the vertexshader to the model matrix
function setMMatrixUniform(mMatrix) {
	gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, mMatrix);
}

// sets the uniform uMVMatrix of the vertexshader to the view matrix
function setVMatrixUniform(vMatrix) {
	gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, vMatrix);
}


//Draws the Arrays and hands over the belonging mvMatrix of all tetrominos/objects stored in the ObjectManager
//Also creates the perspective Matrix and sets it to the uniform.
function drawScene() {
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
    setPMatrixUniform(Projection.getMatrix());
	setVMatrixUniform(View.getMatrix());
	gl.bindTexture(gl.TEXTURE_2D, Texture.getWhiteTexture());
	if(zTest(0)>zTest(1)){
		drawGrid(1,24,'horiz');
	} else {
		drawGrid(0,24,'horiz');
	}
	
	if(zTest(2)>zTest(3)){
		drawGrid(3,34,'vert');
	} else {
		drawGrid(2,34,'vert');
	}
	
	if(zTest(4)>zTest(5)){
		drawGrid(5,34,'vert');
	} else {
		drawGrid(4,34,'vert');
	}
	
	gl.bindTexture(gl.TEXTURE_2D, Texture.getTexture());
	ObjectManager.getAllTetracubes().forEach(function(o) {
		for (i=0; i<o.blocklength; i++){
			if(o.mvMatrixArray[i]!=null){
				setMMatrixUniform(o.mvMatrixArray[i]);
				gl.bindBuffer(gl.ARRAY_BUFFER, Block.getPositionBuffer());
				gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
				gl.bindBuffer(gl.ARRAY_BUFFER, o.texcoordsBuffer);
				gl.vertexAttribPointer(shaderProgram.vertexTextureAttribute, 2, gl.FLOAT, false, 0, 0);
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Block.getIndexBuffer());
				gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
			}
		}
	});
}

function drawGrid(i,itmsize,orientation){
	setMMatrixUniform(Grid.getMMatrices(i));	
	gl.bindBuffer(gl.ARRAY_BUFFER, Grid.getVertexPositionBuffer(orientation));
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, Grid.getVertexTexcoordsBuffer(orientation));
	gl.vertexAttribPointer(shaderProgram.vertexTextureAttribute, 2, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.LINES, 0, itmsize);
}

function zTest(i){
	var test = vec4.fromValues(0,0,0,1);
	vec4.transformMat4(test,test,Grid.getMMatrices(i));
	vec4.transformMat4(test,test,View.getMatrix());
	return test[2];
}

// the render loop, which loops the whole runtime
function renderLoop() {
    InputHandler.handleInput();
	AnimationHandler.animate();
	drawScene();
    requestAnimFrame(renderLoop);
}

// the start point of the webgl program
function webGLStart() {
    // setup of WebGL
    var canvas = document.getElementById('lab01-canvas');
    gl = WebGLUtils.setupWebGL(canvas);
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;

    // define input handling functions
    document.onkeydown = InputHandler.handleKeyDown;
    document.onkeyup = InputHandler.handleKeyUp;
	Projection.toggle();
	
	// Initialize shaders, load textures and add the wanted tetrominos.
    initShaders("vertexshader","fragmentshader");

    // set clearColor to black (r,g,b,a) and enable depth test.
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
	
	ObjectManager.addTetracube(6);
	Texture.load();
	Grid.setup();
	Block.setup();
    renderLoop();
}
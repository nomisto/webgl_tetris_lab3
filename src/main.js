
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
	
	shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
	gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
	
	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, "uMMatrix");
	shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
	shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNormalMatrix");
	shaderProgram.kaUniform = gl.getUniformLocation(shaderProgram, "Ka");
	shaderProgram.kdUniform = gl.getUniformLocation(shaderProgram, "Kd");
	shaderProgram.ksUniform = gl.getUniformLocation(shaderProgram, "Ks");
}

// sets the uniform uPMatrix of the vertexshader to the projection matrix
function setPMatrixUniform(pMatrix) {
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
}

// sets the uniform uMMatrix of the vertexshader to the model matrix
function setMMatrixUniform(mMatrix) {
	gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, mMatrix);
}

// sets the uniform uVMatrix of the vertexshader to the view matrix
function setVMatrixUniform(vMatrix) {
	gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, vMatrix);
}

// sets the uniform uNormalMatrix to the normalMatrix
function setNormalMatrixUniform(normalMatrix){
	gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
}

// sets the ambient koefficient
function setkaUniform(ka){
	gl.uniform1f(shaderProgram.kaUniform, ka);
}

//sets the diffuse coefficient
function setkdUniform(kd){
	gl.uniform1f(shaderProgram.kdUniform, kd);
}

// sets the specular coefficient
function setksUniform(ks){
	gl.uniform1f(shaderProgram.ksUniform, ks);
}

// toggles if the fullgrid should show or not
var fullGrid = false;
function toggleGrid(){
	if(!fullGrid){
		fullGrid=true;
	} else {
		fullGrid=false;
	}
}

// toggles the shading methods
var gouraudnow = true;
var gouraud = true;
function toggleShading(){
	if(gouraud){
		gouraud = false;
	} else {
		gouraud = true;
	}
}

//Draws the Scene with the correct shaders
function drawScene() {
	if(gouraud == false && gouraudnow == true){
		//phong
		initShaders("vertexshaderphong","fragmentshaderphong");
		gouraudnow = false;
		setkaUniform(document.getElementById("ambient").value);
		setkdUniform(document.getElementById("diffuse").value);
		setksUniform(document.getElementById("specular").value);
		document.getElementById("shading").innerHTML = "Phong";
	} else if (gouraud == true && gouraudnow == false){
		//gouraud
		initShaders("vertexshadergouraud","fragmentshadergouraud");
		gouraudnow = true;
		setkaUniform(document.getElementById("ambient").value);
		setkdUniform(document.getElementById("diffuse").value);
		setksUniform(document.getElementById("specular").value);
		document.getElementById("shading").innerHTML = "Gouraud";
	}
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
    setPMatrixUniform(Projection.getMatrix());
	setVMatrixUniform(View.getMatrix());
	
	gl.bindTexture(gl.TEXTURE_2D, Texture.getWhiteTexture());
	
	if(fullGrid == true){
		drawGrid(1,24,'horiz');
		drawGrid(0,24,'horiz');
		drawGrid(3,34,'vert');
		drawGrid(2,34,'vert');
		drawGrid(5,34,'vert');
		drawGrid(4,34,'vert');
	} else {
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
	}
	
	
	gl.bindTexture(gl.TEXTURE_2D, Texture.getTexture());
	ObjectManager.getAllTetracubes().forEach(function(o) {
		for (i=0; i<o.blocklength; i++){
			if(o.mvMatrixArray[i]!=null){
				
				setMMatrixUniform(o.mvMatrixArray[i]);
				
				var normalMatrix = mat3.create();
				mat3.normalFromMat4(normalMatrix,o.mvMatrixArray[i]);
				setNormalMatrixUniform(normalMatrix);
				
				gl.bindBuffer(gl.ARRAY_BUFFER, Block.getNormalBuffer());
				gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
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

//draws the grid
function drawGrid(i,itmsize,orientation){
	setMMatrixUniform(Grid.getMMatrices(i));	
	
	var normalMatrix = mat3.create();
	mat3.normalFromMat4(normalMatrix,Grid.getMMatrices(i));
	setNormalMatrixUniform(normalMatrix);
				
	gl.bindBuffer(gl.ARRAY_BUFFER, Grid.getVertexNormalsBuffer(orientation));
	gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, Grid.getVertexPositionBuffer(orientation));
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, Grid.getVertexTexcoordsBuffer(orientation));
	gl.vertexAttribPointer(shaderProgram.vertexTextureAttribute, 2, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.LINES, 0, itmsize);
}

// determines the z value of each grid piece and returns it.
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
	
	// Initialize shaders
    initShaders("vertexshadergouraud","fragmentshadergouraud");

    // set clearColor to black (r,g,b,a) and enable depth test.
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
	
	// set the uniform of the different coefficient to the ones in the sliders of the ui
	setkaUniform(document.getElementById("ambient").value);
	setkdUniform(document.getElementById("diffuse").value);
	setksUniform(document.getElementById("specular").value);
	
	// loads the texture, sets up the buffers of the grid and block, starts a new game
	Texture.load();
	Grid.setup();
	Block.setup();
	GameManager.initializeNewGame();
    renderLoop();
}
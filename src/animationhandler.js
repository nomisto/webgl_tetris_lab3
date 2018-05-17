AnimationHandler = function(){
	var animationsStack = [];
	var animationsProgress = [];
	
	var xAxis = vec3.fromValues(1,0,0);
	var yAxis = vec3.fromValues(0,1,0);
	var zAxis = vec3.fromValues(0,0,1);
	
	var gravitationSpeed = 850;
	
	var current;
	
	// returns the time elapsed between two executions of this function
	var then = new Date().getTime();
	function getDeltaTime() {
		var now = new Date().getTime();
		var delta = now - then;
		then = now;
		return delta;
	}
	
	/* deletes the first item of the animationsStack and the animationsProgress.
	   If the finished animation was a counterclockwise rotation, the orientation of the tetromino-object decrements by one.
	   If the finished animation was a clockwise rotation, the orientation of the tetromino-object increments by one.
	   If the animation stack size is zero, it gravitates one time.
	   */
	function shift() {
		var last = animationsStack.shift();
		animationsProgress.shift();
		if(last==5){
			vec3.cross(yAxis,xAxis,yAxis);
			vec3.cross(zAxis,xAxis,zAxis);
		}
		else if(last==6){
			vec3.cross(yAxis,yAxis,xAxis);
			vec3.cross(zAxis,zAxis,xAxis);
		}
		else if(last==7){
			vec3.cross(xAxis,yAxis,xAxis);
			vec3.cross(zAxis,yAxis,zAxis);
		}
		else if(last==8){
			vec3.cross(xAxis,xAxis,yAxis);
			vec3.cross(zAxis,zAxis,yAxis);
		}
		else if(last==9){
			vec3.cross(xAxis,zAxis,xAxis);
			vec3.cross(yAxis,zAxis,yAxis);
		}
		else if(last==10){
			vec3.cross(xAxis,xAxis,zAxis);
			vec3.cross(yAxis,yAxis,zAxis);
		}
		if(animationsStack.length==0){
			//GameManager.gravitate();
		}
	}
	
	/* inserts the desired animation at the end of the queue animationsStack
	  1 ... Positive X dir
	  2 ... Negative X dir
	  3 ... Positive Z dir
	  4 ... Negative Z dir
	  5 ... Rotate Counterclockwise X
	  6 ... Rotate Clockwise X
	  7 ... Rotate Counterclockwise Y
	  8 ... Rotate Clockwise Y
	  9 ... Rotate Counterclockwise Z
	  10 ... Rotate Clockwise Z
	  11 ... Negative Y dir (gravitate)
	  and inserts a 0 at the end of the array animationsProgress, representing the Progress for this animation */
	function addAnimation(input){
		animationsStack.push(input);
		animationsProgress.push(0);
		//current = GameManager.getCurrent();
		current = ObjectManager.getAllTetracubes()[0];
	}
	
	
	/* animates the first requested animation of the animationsStack for one step
	  and refreshes the deltaTime */
	var deltaTime;
	function animate() {
		deltaTime = getDeltaTime();
		if (animationsStack[0] == 1){
			moveX(getValue());
		}
		else if (animationsStack[0] == 2){
			moveX(-getValue());
		}
		else if (animationsStack[0] == 3){
			moveZ(getValue());
		}
		else if (animationsStack[0] == 4){
			moveZ(-getValue());
		}
		else if (animationsStack[0] == 5){
			rotateX(getAngle());
		}
		else if (animationsStack[0] == 6){
			rotateX(-getAngle());
		}
		else if (animationsStack[0] == 7){
			rotateY(getAngle());
		}
		else if (animationsStack[0] == 8){
			rotateY(-getAngle());
		}
		else if (animationsStack[0] == 9){
			rotateZ(getAngle());
		}
		else if (animationsStack[0] == 10){
			rotateZ(-getAngle());
		}
		else if (animationsStack[0] == 11){
			moveY(-getValue());
		}
		
		if(animationsProgress[0]==100){
			shift();
		}
	}
	
	// returns the angle for one rotation animationstep using the deltatime
	function getAngle(){
		var angle = (75 * deltaTime) / 1000.0;		
		if ((angle+animationsProgress[0]) < 90) {
			animationsProgress[0] += angle;
		}
		else {
			angle = 90-animationsProgress[0];
			animationsProgress[0]=100;
		}
		return angle;
	}
	
	// returns the value of one horizontal/vertical-movement animationstep using the deltatime
	function getValue(){
		var value = deltaTime/gravitationSpeed;
		if ((value+animationsProgress[0]) < 2) {
			animationsProgress[0] += value;
		}
		else {
			value = 2 - animationsProgress[0];
			animationsProgress[0]=100;
		}
		return value;
	}
	
	function setGravitationSpeed(speed){
		gravitationSpeed=speed;
	}
	
	// determines the orientation of the object and translates it by the given value in relation to the display X-axis
	function moveX(value){
		for(i=0; i<current.blocklength; i++){
			var trans = mat4.create();
			mat4.identity(trans);
			mat4.translate(trans, trans, [value,0,0]);
			mat4.multiply(current.mvMatrixArray[i], trans, current.mvMatrixArray[i]);
		}
	}
	
	// determines the orientation of the object and translates it by the given value in relation to the display Y-axis
	function moveY(value){
		for(i=0; i<current.blocklength; i++){
			var trans = mat4.create();
			mat4.identity(trans);
			mat4.translate(trans, trans, [0,value,0]);
			mat4.multiply(current.mvMatrixArray[i], trans, current.mvMatrixArray[i]);
		}
	}
	
	
	function moveZ(value){
		for(i=0; i<current.blocklength; i++){
			var trans = mat4.create();
			mat4.identity(trans);
			mat4.translate(trans, trans, [0,0,value]);
			mat4.multiply(current.mvMatrixArray[i], trans, current.mvMatrixArray[i]);
		}
	}

	// converts the angle from degrees to radiant
	function gradToRad(angle){
		return angle * Math.PI / 180;
	}
	
	
	// calculates the rotation-matrix of the mvMatrix by the given angle around the z-axis
	function rotateX(angle) {
		for(i=0; i<current.blocklength; i++){
			mat4.translate(current.mvMatrixArray[i], current.mvMatrixArray[i], [current.vectorToRotationOriginArray[3*i]*2, current.vectorToRotationOriginArray[3*i+1]*2, current.vectorToRotationOriginArray[3*i+2]*2]);
			mat4.rotate(current.mvMatrixArray[i], current.mvMatrixArray[i], gradToRad(angle),xAxis);
			mat4.translate(current.mvMatrixArray[i], current.mvMatrixArray[i], [-current.vectorToRotationOriginArray[3*i]*2, -current.vectorToRotationOriginArray[3*i+1]*2, -current.vectorToRotationOriginArray[3*i+2]*2]);
		}
	}
	
	function rotateY(angle) {
		for(i=0; i<current.blocklength; i++){
			mat4.translate(current.mvMatrixArray[i], current.mvMatrixArray[i], [current.vectorToRotationOriginArray[3*i]*2, current.vectorToRotationOriginArray[3*i+1]*2, current.vectorToRotationOriginArray[3*i+2]*2]);
			mat4.rotate(current.mvMatrixArray[i], current.mvMatrixArray[i], gradToRad(angle),yAxis);
			mat4.translate(current.mvMatrixArray[i], current.mvMatrixArray[i], [-current.vectorToRotationOriginArray[3*i]*2, -current.vectorToRotationOriginArray[3*i+1]*2, -current.vectorToRotationOriginArray[3*i+2]*2]);
		}
	}
	
	function rotateZ(angle) {
		for(i=0; i<current.blocklength; i++){
			mat4.translate(current.mvMatrixArray[i], current.mvMatrixArray[i], [current.vectorToRotationOriginArray[3*i]*2, current.vectorToRotationOriginArray[3*i+1]*2, current.vectorToRotationOriginArray[3*i+2]*2]);
			mat4.rotate(current.mvMatrixArray[i], current.mvMatrixArray[i], gradToRad(angle),zAxis);
			mat4.translate(current.mvMatrixArray[i], current.mvMatrixArray[i], [-current.vectorToRotationOriginArray[3*i]*2, -current.vectorToRotationOriginArray[3*i+1]*2, -current.vectorToRotationOriginArray[3*i+2]*2]);
		}
	}
	
	
	
	
	return{
		addAnimation: addAnimation,
		animate: animate,
		setGravitationSpeed: setGravitationSpeed
	}
}();
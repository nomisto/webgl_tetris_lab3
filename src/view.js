View = function() {
	
	var z = 15;
	
	var vMatrix = mat4.create();
	mat4.identity(vMatrix);
	//rotateX(90);
	
	// converts degree to rad
	function deg2rad(deg){
		return deg/180*Math.PI;
	}
	
	// rotates the view matrix by a given angle a around the z axis
	function rotateZ(a){
		mat4.translate(vMatrix,vMatrix,[0,0,-z]);
		mat4.rotateZ(vMatrix,vMatrix,deg2rad(a));
		mat4.translate(vMatrix,vMatrix,[0,0,z]);
	}
	
	// rotates the view matrix by a given angle a around the x axis
	function rotateX(a){
		mat4.translate(vMatrix,vMatrix,[0,0,-z]);
		mat4.rotateX(vMatrix,vMatrix,deg2rad(a));
		mat4.translate(vMatrix,vMatrix,[0,0,z]);
	}
	
	// rotates the view matrix by a given angle a around the y axis
	function rotateY(a){
		mat4.translate(vMatrix,vMatrix,[0,0,-z]);
		mat4.rotateY(vMatrix,vMatrix,deg2rad(a));
		mat4.translate(vMatrix,vMatrix,[0,0,z]);
	}
	
	//returns the view matrix
	function getMatrix(){
		return vMatrix;
	}
	
	return{
		rotateZ:rotateZ,
		rotateX:rotateX,
		rotateY: rotateY,
		getMatrix: getMatrix
	}
}();
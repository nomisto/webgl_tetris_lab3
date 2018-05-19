Projection = function() {
	var zoom = 1;
	var proj = 0;
	var pMatrix = mat4.create();
    mat4.identity(pMatrix);
    mat4.ortho(pMatrix, -10.0/zoom, 10.0/zoom, -20.0/zoom, 20.0/zoom, 0.1, 100000);

	// toggles the projection type Ortho/perspective with respect to a zoom variable
	function toggle(){
		if(proj==1){
			mat4.identity(pMatrix);
			mat4.ortho(pMatrix, -10.0/zoom, 10.0/zoom, -20.0/zoom, 20.0/zoom, 0.1, 100000);
			proj=0;
		} else if(proj==0){
			mat4.identity(pMatrix);
			mat4.perspective(pMatrix, Math.PI/(2*zoom), (gl.viewportWidth/gl.viewportHeight), 0.1, 2000.0);
			proj=1;
		}
	}
	
	//increases the zoom
	function increaseZoom(){
		zoom = zoom + 0.01;
		console.log(zoom);
		toggle();
		toggle();
	}
	
	//decreases the zoom 
	function decreaseZoom(){
		if(zoom>0.51) zoom = zoom - 0.01;
		console.log(zoom);
		toggle();
		toggle();
	}
	
	// returns the projection matrix
	function getMatrix(){
		return pMatrix;
	}
	
	return{
		getMatrix: getMatrix,
		increaseZoom: increaseZoom,
		decreaseZoom: decreaseZoom,
		toggle: toggle
	}
}();
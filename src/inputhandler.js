InputHandler = function(){
	var e;
	var strokeBlock = false;
	
	/* Determines which key is currently pressed and adds the linked animation to the animationhandler.
	   The value strokeBlock prevents multiple strokes if one key is pressed. */
	function handleInput() {
		if(e!=null){
			//"->" or "d": move the object drawn one unit in the positive x direction 
			if ((e.keyCode==68 || e.keyCode==39) && strokeBlock == false) {
				strokeBlock=true;
				AnimationHandler.addAnimation(1);
				console.log("left");
			}
			//"<-" or "a": move the object drawn one unit in the negative x direction 
			if ((e.keyCode==65 || e.keyCode==37) && strokeBlock == false) {
				strokeBlock=true;
				AnimationHandler.addAnimation(2);
			}
			//"/\" or "w": move the object drawn one unit in the positive z direction 
			if ((e.keyCode==87 || e.keyCode==38) && strokeBlock == false) {
				strokeBlock=true;
				AnimationHandler.addAnimation(3);
			}
			//"\/" or "s": move the object drawn one unit in the negative z direction 
			if ((e.keyCode==83) && strokeBlock == false) {
				strokeBlock=true;
				AnimationHandler.addAnimation(4);
			}
			//"x": rotate the object drawn 90 degrees counterclockwise around the x axis 
			if (e.keyCode==88 && !e.shiftKey && strokeBlock == false) {
				strokeBlock=true;
				AnimationHandler.addAnimation(5);
			}
			//"X": rotate the object drawn 90 degrees clockwise around the x axis 
			if (e.keyCode==88 && e.shiftKey && strokeBlock == false) {
				strokeBlock=true;
				AnimationHandler.addAnimation(6);
			}
			//"y": rotate the object drawn 90 degrees counterclockwise around the y axis 
			if (e.keyCode==89 && !e.shiftKey && strokeBlock == false) {
				strokeBlock=true;
				AnimationHandler.addAnimation(7);
			}
			//"Y": rotate the object drawn 90 degrees clockwise around the y axis 
			if (e.keyCode==89 && e.shiftKey && strokeBlock == false) {
				strokeBlock=true;
				AnimationHandler.addAnimation(8);
			}
			//"z": rotate the object drawn 90 degrees counterclockwise around the z axis 
			if (e.keyCode==90 && !e.shiftKey && strokeBlock == false) {
				strokeBlock=true;
				AnimationHandler.addAnimation(9);
			}
			//"Z": rotate the object drawn 90 degrees clockwise around the z axis 
			if (e.keyCode==90 && e.shiftKey && strokeBlock == false) {
				strokeBlock=true;
				AnimationHandler.addAnimation(10);
			}
			//"p": (un)pause the game (i.e. stop/restart gravity) 
			if (e.keyCode==80 && strokeBlock == false) {
				strokeBlock=true;
			}
			
			//("g") that toggles between displaying the underlying 3D grid as a wireframe or not showing this grid
			if (e.keyCode==71 && strokeBlock == false) {
				strokeBlock=true;
			}
			
			//"j": the viewpoint should rotate counterclockwise about the Y-axis around the center of the grid.
			if (e.keyCode==74 && strokeBlock == false) {
				View.rotateY(1);
			}
			//"l": the viewpoint should rotate clockwise about the Y-axis around the center of the grid. 
			if (e.keyCode==76 && strokeBlock == false) {
				View.rotateY(-1);
			}
			//"i": the viewpoint should rotate counterclockwise about the X-axis around the center of the grid. 
			if (e.keyCode==73 && strokeBlock == false) {
				View.rotateX(1);
			}
			//"k": the viewpoint should rotate clockwise about the X-axis around the center of the grid. 
			if (e.keyCode==75 && strokeBlock == false) {
				View.rotateX(-1);
			}
			//"u": the viewpoint should rotate counterclockwise about the Z-axis around the center of the grid. 
			if (e.keyCode==85 && strokeBlock == false) {
				View.rotateZ(1);
			}
			//"o": the viewpoint should rotate clockwise about the Z-axis around the center of the grid. 
			if (e.keyCode==79 && strokeBlock == false) {
				View.rotateZ(-1);
			}
			//"+": zoom in
			if ((e.keyCode==107 || (e.keyCode==171 && !e.shiftKey)) && strokeBlock == false) {
				Projection.increaseZoom();
			}
			//"-": zoom out.
			if ((e.keyCode==109 || (e.keyCode==173 && !e.shiftKey)) && strokeBlock == false) {
				Projection.decreaseZoom();
			}
			//"v": toggle between orthographic and perspective viewing.
			if (e.keyCode==86 && strokeBlock == false) {
				strokeBlock=true;
				Projection.toggle();
			}
			
			//("f") that toggles between Gouraud and Per-Pixel-shading
			if (e.keyCode==70 && strokeBlock == false) {
				strokeBlock=true;
			}
			
			//"b" that toggles between blocks and cylinder
			if (e.keyCode==66 && strokeBlock == false) {
				strokeBlock=true;
			}
		}
	}

	// if a key is pressed, the value of the array currentlyPressedKeys in index keyCode is set to true
	function handleKeyDown(event) {
		e = event;
	}
	
	// if a key is pressed, the value of the array currentlyPressedKeys in index keyCode is set to true
	function handleKeyUp(event) {
		strokeBlock = false;
		e = null;
	}
	
	return{
		handleInput: handleInput,
		handleKeyDown: handleKeyDown,
		handleKeyUp: handleKeyUp
	}
}();
# webgl_tetris_lab1b
Mat. Nr.: 1463744
Assignment 3 for VU Foundations of Computer Graphics

All images from pexels.com under CC0 License.

This program requires a webserver to run, because of the image restrictions. (Tested with xampp - Apache webserver)

The phong and gouraud shading, arent visually different. This is I think because the normalvectors of the vertices are paralell for each side of the cube.

Didn't implement the cylinder, but the game over and the game starts anew point.
"->" or "d": move the object drawn one unit in the positive x direction
				"<-" or "a": move the object drawn one unit in the negative x direction
				"/\" or "w": move the object drawn one unit in the positive z direction
				"\/" or "s": move the object drawn one unit in the negative z direction
				"x": rotate the object drawn 90 degrees counterclockwise around the x axis
				"X": rotate the object drawn 90 degrees clockwise around the x axis
				"y": rotate the object drawn 90 degrees counterclockwise around the y axis
				"Y": rotate the object drawn 90 degrees clockwise around the y axis
				"z": rotate the object drawn 90 degrees counterclockwise around the z axis
				"Z": rotate the object drawn 90 degrees clockwise around the z axis
				"p": (un)pause the game (i.e. stop/restart gravity)
				"space bar": release the control of the current object (and have it drop down) 
				"g": toggles between displaying the underlying 3D grid as a wireframe or not
				"j": the viewpoint should rotate counterclockwise about the Y-axis around the center of the grid.
				"l": the viewpoint should rotate clockwise about the Y-axis around the center of the grid.
				"i": the viewpoint should rotate counterclockwise about the X-axis around the center of the grid.
				"k": the viewpoint should rotate clockwise about the X-axis around the center of the grid.
				"u": the viewpoint should rotate counterclockwise about the Z-axis around the center of the grid.
				"o": the viewpoint should rotate clockwise about the Z-axis around the center of the grid.
				"+": zoom in
				"-": zoom out.
				"v": toggle between orthographic and perspective viewing.
				"f": toggles between Gouraud and Per-Pixel-shading


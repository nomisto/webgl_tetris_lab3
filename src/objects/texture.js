Texture = function() {
	
	var texture;
	var whiteTexture;
	
	// asynchronosly loads the image, creates a texture and binds it
	function load(){
		texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		
		var image = new Image();
		image.src = "resources/texturessmall.png";
		image.addEventListener('load', function() {
		  gl.bindTexture(gl.TEXTURE_2D, texture);
		  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
		  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		});
		
		whiteTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, whiteTexture);
		var whitePixel = new Uint8Array([255, 255, 255, 255]);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, whitePixel);
	}
	
	//returns the texture for the tetracubes
	function getTexture(){
		return texture;
	};
	
	// returns the white textrue for the grid
	function getWhiteTexture(){
		return whiteTexture;
	};
		
	//calculates the texcoords for the cube and returns it as a array
	function getCubeTextureCoords(texturetypex, texturetypey){
		return [
			(128*texturetypex + 128) / 640, (128*texturetypey + 128) / 256, //Rechtsunten
			(128*texturetypex) / 640, (128*texturetypey + 128) / 256, //Rechtsoben
			(128*texturetypex) / 640, (128*texturetypey) / 256, //LinksOben
			(128*texturetypex + 128) / 640, (128*texturetypey) / 256, //Linksunten
			
			(128*texturetypex + 128) / 640, (128*texturetypey + 128) / 256, //Rechtsunten
			(128*texturetypex) / 640, (128*texturetypey + 128) / 256, //Rechtsoben
			(128*texturetypex) / 640, (128*texturetypey) / 256, //LinksOben
			(128*texturetypex + 128) / 640, (128*texturetypey) / 256, //Linksunten
			
			(128*texturetypex + 128) / 640, (128*texturetypey + 128) / 256, //Rechtsunten
			(128*texturetypex) / 640, (128*texturetypey + 128) / 256, //Rechtsoben
			(128*texturetypex) / 640, (128*texturetypey) / 256, //LinksOben
			(128*texturetypex + 128) / 640, (128*texturetypey) / 256, //Linksunten
			
			(128*texturetypex + 128) / 640, (128*texturetypey + 128) / 256, //Rechtsunten
			(128*texturetypex) / 640, (128*texturetypey + 128) / 256, //Rechtsoben
			(128*texturetypex) / 640, (128*texturetypey) / 256, //LinksOben
			(128*texturetypex + 128) / 640, (128*texturetypey) / 256, //Linksunten
			
			(128*texturetypex + 128) / 640, (128*texturetypey + 128) / 256, //Rechtsunten
			(128*texturetypex) / 640, (128*texturetypey + 128) / 256, //Rechtsoben
			(128*texturetypex) / 640, (128*texturetypey) / 256, //LinksOben
			(128*texturetypex + 128) / 640, (128*texturetypey) / 256, //Linksunten
			
			(128*texturetypex + 128) / 640, (128*texturetypey + 128) / 256, //Rechtsunten
			(128*texturetypex) / 640, (128*texturetypey + 128) / 256, //Rechtsoben
			(128*texturetypex) / 640, (128*texturetypey) / 256, //LinksOben
			(128*texturetypex + 128) / 640, (128*texturetypey) / 256, //Linksunten
		]
	}
	
	//calculates the texcoords for the cylinder and returns it as a array
	function getCylinderTextureCoords(texturetypex,texturetypey){
		var coords = [];
		coords = coords.concat([(128*texturetypex + 64) / 640, (128*texturetypey + 64) / 256]); //middle of circle
		for(var i = 0; i<360; i+=10){
			coords = coords.concat([(128*texturetypex + 64 + 58*getX(i)) / 640 , (128*texturetypey + 64 + 58*getZ(i)) / 256]);
		}
		
		coords = coords.concat(coords);
		
		for(var i = 0; i<360; i+=10){
			coords = coords.concat([(128* texturetypex + 64 + 58*getX(i)) / 640,(128*texturetypey) / 256]);
		}
		for(var i = 0; i<360; i+=10){
			coords = coords.concat([(128* texturetypex + 64 + 58*getX(i)) / 640,(128*texturetypey+128) / 256]);
		}
		return coords;
	}
	
	// returns the x value of a circle with radius 1
	function getX(angle){
		return Math.cos(angle*Math.PI/180);
	}
	
	// returns the z value of a circle with radius 1
	function getZ(angle){
		return Math.sin(angle*Math.PI/180);
	}
	
	return{
		load: load,
		getTexture: getTexture,
		getWhiteTexture: getWhiteTexture,
		getCubeTextureCoords: getCubeTextureCoords,
		getCylinderTextureCoords: getCylinderTextureCoords
	}
}();
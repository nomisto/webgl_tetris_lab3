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
		
	//calculates the texcoords and returns it as a array
	function getTextureCoords(texturetypex, texturetypey){
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
	
	return{
		load: load,
		getTexture: getTexture,
		getWhiteTexture: getWhiteTexture,
		getTextureCoords: getTextureCoords
	}
}();
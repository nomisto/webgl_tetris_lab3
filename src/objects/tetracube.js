class Tetracube{
	
	constructor(index, texcoordsBuffer, mvMatrixArray, blocks, vectorToRotationOriginArray, orientation, currX, currY, currZ) {
		this.index=index;
		this.texcoordsBuffer=texcoordsBuffer;
		this.mvMatrixArray = mvMatrixArray;
		this.vectorToRotationOriginArray = vectorToRotationOriginArray;
		this.blocks = blocks;
		this.orientation = orientation;
		this.currX = currX;
		this.currY = currY;
		this.currZ = currZ;
		this.blocklength=4;
	}
	
	// Special mod function needed because of negative integers
	mod(m,n){
		return ((m % n) + n) % n;
	}
	
	// returns the orientation of the tetromino
	getTetrominoOrientation(){
		return this.mod(this.orientation,4);
	}
	
	// if input is null it returns the position of the blocks according to the current orientation
	// else it returns the position of the blocks accordint to the orientation given through the input (needed for boundary checks before a rotation)
	getRotatedBlocks(input){
		var orientation;
		if(input!=null){
			orientation = this.mod(input,4);
		} else { 
			orientation = this.getTetrominoOrientation();
		}
		
		if(orientation==0){return this.blocks;}
		
		var result = [];
		for(i=0;i<this.blocklength;i++){
			var resultX = this.blocks[2*i] + this.vectorToRotationOriginArray[2*i];
			var resultY = this.blocks[2*i+1] + this.vectorToRotationOriginArray[2*i+1];
			
			if(orientation==1){
				resultX  -= this.vectorToRotationOriginArray[2*i+1];
				resultY += this.vectorToRotationOriginArray[2*i];
			} else if(orientation==2) {
				resultX  += this.vectorToRotationOriginArray[2*i];
				resultY += this.vectorToRotationOriginArray[2*i+1];
			} else if(orientation==3) {
				resultX  += this.vectorToRotationOriginArray[2*i+1];
				resultY -= this.vectorToRotationOriginArray[2*i];
			}
			
			if(this.mvMatrixArray[i]!=null){
				result.push(resultX);
				result.push(resultY);
			} else {
				result.push(null);
				result.push(null);
			}
		}
		return result;
	}
	
	//Deletes one block of given blockid (index)
	deleteBlock(blockid){
		this.vertexPositionBufferArray.splice(blockid,1);
		this.texcoordsBufferArray.splice(blockid,1);
		this.mvMatrixArray.splice(blockid,1);
		this.vectorToRotationOriginArray.splice(2*blockid,2);
		this.blocks.splice(2*blockid,2);
		this.blocklength-=1;
	}
	
	set index(i){
		this._index=i;
	}
	
	get index(){
		return this._index;
	}
	
	set blocklength(i){
		this._blocklength=i;
	}
	
	get blocklength(){
		return this._blocklength;
	}
	
	set currX(input){
		this._currX=input;
	}
	
	get currX(){
		return this._currX;
	}
	
	set currY(input){
		this._currY=input;
	}
	
	get currY(){
		return this._currY;
	}
	
	get blocks(){
		return this._blocks;
	}
	
	set blocks(value){
		this._blocks=value;
	}
	
};
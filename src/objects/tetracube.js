class Tetracube{
	
	constructor(index, texcoordsBuffer, mvMatrixArray, vectorToRotationOriginArray) {
		this.index=index;
		this.texcoordsBuffer=texcoordsBuffer;
		this.mvMatrixArray = mvMatrixArray;
		this.vectorToRotationOriginArray = vectorToRotationOriginArray;
		this.blocklength=4;
	}
	
	//Deletes one block of given blockid (index)
	deleteBlock(blockid){
		this.mvMatrixArray.splice(blockid,1);
		this.vectorToRotationOriginArray.splice(2*blockid,2);
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
class Tetracube{
	
	constructor(index, cubeTexcoordsBuffer, cylinderTexcoordsBuffer, mvMatrixArray, vectorToRotationOriginArray) {
		this.index=index;
		this.cubeTexcoordsBuffer=cubeTexcoordsBuffer;
		this.cylinderTexcoordsBuffer=cylinderTexcoordsBuffer;
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
};
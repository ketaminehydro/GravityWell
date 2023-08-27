/****************************************************************
 CLASS: CollisionPairs

 ->>>> NOT USED <<<<<<-
 ****************************************************************/
 class CollisionPairs{
    constructor(){
        this._array = [];
    }

    push(obj){
        this._array.push(obj);
    }

    getElement(i){
        return this._array[i];
    }

    getLength(){
        return this._array.length;
    }
 }
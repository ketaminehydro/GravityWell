/****************************************************************
 CLASS: ParticleEffectArray
 ****************************************************************/
class ParticleEffectArray{
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
    removeDeleted(){
        for(let i=0; i<this._array.length; i++){
            if(this._array[i].getIsDeleted()){
                delete this._array[i];
                this._array.splice(i,1);
            }
        }
    }

    clear(){
        // deletes the array
        this._array.splice(0, this._array.length);
    }

    update(milliSecondsPassed){
        this._array.forEach(element => {
            element.update(milliSecondsPassed);
        });
    }

    draw(){
        this._array.forEach(element =>{
            element.draw();
        });
    }
}

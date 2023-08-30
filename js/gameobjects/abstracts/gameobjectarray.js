/****************************************************************
 CLASS: GameObjectArray
 ****************************************************************/
class GameObjectArray{
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

    clearIsHit(){
        this._array.forEach(element =>{
            element.hitBox.setIsHit(false);
        });
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

    /*****************DEBUG **********************/
    toggleShowDebugGfx(){
        this._array.forEach(element => {
            element.toggleShowDebugGfx();
        });
    }

    toggleShowDebugInfo(){
        this._array.forEach(element => {
            element.toggleShowDebugInfo();
        });
    }
}

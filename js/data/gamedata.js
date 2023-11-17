/****************************************************************
 CLASS: GameData
 ****************************************************************/
class GameData{
  constructor(){
    this.stages = null;
    this.stagesLoaded = false;
    this.enemies = null;
    this.enemiesLoaded = false;
    this.dataError = false;
    
    this.loadJSON("./js/data/stages.json", this.stage);
  }

  loadJSON(file, attribute){
      fetch(file)
      .then(response => {
          if (!response.ok) {
              throw new Error("HTTP error " + response.status);
          }
          return response.json();
      })
      .then(json => {       
          this.stagesData = json;
          this.stagesLoaded = true;
      })
      .catch(function () {
          this.dataError = true;
      })
  }
}
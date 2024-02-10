/****************************************************************
 CLASS: GameData
 ****************************************************************/
class GameData{
  constructor(){
    // data
    this.general = {};
    this.stages = {};
    this.enemies = {};
    this.player = {};
    this.playerShips = {};
    this.inputControls = {};

    this.isLoadingError = false;
    this.numberOfFiles = 6;   // note: adjust this if new files are added
    this.numberOfFilesLoaded = 0;
  }

  isAllFilesLoaded(){
    return (this.numberOfFiles === this.numberOfFilesLoaded);
  }

  loadGeneral(file){
    this.loadJSON(file, this.general);
  }
  
  loadStages(file){
    this.loadJSON(file, this.stages);
  }

  loadEnemies(file){
    this.loadJSON(file, this.enemies);
  }
  loadPlayer(file){
    this.loadJSON(file, this.player);
  }

  loadPlayerShips(file){
    this.loadJSON(file, this.playerShips);
  }

  loadInputControls(file){
    this.loadJSON(file, this.inputControls);
  }


  loadJSON(file, element){
      fetch(file)
      .then(response => {
          if (!response.ok) {
              throw new Error("HTTP error: " + response.status);
          }
          return response.json();
      })
      .then(json => {       
        // Modify the properties of the passed "element" object
        Object.assign(element, json);
        gameData.numberOfFilesLoaded++;
        console.log(file+" loaded ("+this.numberOfFilesLoaded+"/"+this.numberOfFiles+")");
      })
      .catch(function () {
          gameData.isLoadingError = true;
      })
  }
}
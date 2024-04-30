
function updateAndSavePlayerData() {
    localStorage.setItem("playerData", JSON.stringify(player));
  }
  
  function restartExperience() {
    player.exp = 0;
    localStorage.setItem("playerData", JSON.stringify(player));
    infochart.querySelector("#exp").innerText = `Experiencia: ${player.exp}`;
  }
  
  function levelUp() {
    player.level++;
    player.attack += 100;
    player.hitPoints = player.hitPoints + 50;
    player.exp = 0;
    player.maxExp += 25;
    

    player.hitPoints = player.hitPoints > 1000 ? 1000 : player.hitPoints;
    
   
    infochart.querySelector("#level").innerText = `Nivel: ${player.level}`;
    infochart.querySelector("#exp").innerText = `Experiencia: ${player.exp}`;
    infochart.querySelector("#attack").innerText = `Ataque: ${player.attack}`;
    infochart.querySelector("#hitPoints").innerText = `Vida: ${player.hitPoints}`;
  
    
    updateAndSavePlayerData();
}
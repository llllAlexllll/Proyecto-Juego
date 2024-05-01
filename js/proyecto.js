let player = {
  level: 1,
  exp: 0,
  maxExp: 25,
  attack: 1000,
  hitPoints: 1000
};

infochart.innerHTML = `
  <p id="level">Nivel: ${player.level}</p>
  <p id="exp">Experiencia: ${player.exp}</p>
  <p id="attack">Ataque: ${player.attack}</p>
  <p id="hitPoints">Vida: ${player.hitPoints}</p>
`;

//para que elija primero de la memoria
try {
  const storedPlayerData = JSON.parse(localStorage.getItem("playerData"));
  if (storedPlayerData) {
    player = storedPlayerData;
  } else {
    localStorage.setItem("playerData", JSON.stringify(player));
  }
} catch (error) {
  console.error('Error al cargar', error);
} finally { 
}

let monstrous = [];

const info = document.getElementById("info");
const notificacion = document.getElementById("notificacion");
const avanzar = document.getElementById("avanzar");
const agregarMoustro = document.getElementById("crearmob");
const infochart = document.getElementById("infochart");
const infoMob = document.getElementById("infomob");

const storedMonstrous = JSON.parse(localStorage.getItem("monstrous")) || [];
monstrous.push(...storedMonstrous);
renderMobs(monstrous);

avanzar.addEventListener("click", () => {
  clickButton();
  updateAndSavePlayerData();
});

function clickButton() {
  info.innerText = "";
  notificacion.innerText = "";    
  caminar();
}

agregarMoustro.addEventListener("click", crearMob);

//para crear nuevos mobs usando sweetalert
function crearMob() {
  Swal.fire({
    title: 'Agregar Monstrou',
    confirmButtonText: 'Aceptar',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    html: `
      <input type="text" id="nameMonster" class="swal2-input" placeholder="Nombre">
      <input type="number" id="atkMonster" class="swal2-input" placeholder="Ataque">
      <input type="number" id="hpMonster" class="swal2-input" placeholder="Vida">
    `,
    preConfirm: () => {
      const nameInput = Swal.getPopup().querySelector('#nameMonster').value;
      const atkInput = Swal.getPopup().querySelector('#atkMonster').value;
      const hpInput = Swal.getPopup().querySelector('#hpMonster').value;
      if (!nameInput || !atkInput || !hpInput) {
        Swal.showValidationMessage('Todos los campos son obligatorios');
      }
      return { name: nameInput, attack: parseInt(atkInput), hitPoints: parseInt(hpInput) };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const monstruo = result.value;
      const storedMonstrous = JSON.parse(localStorage.getItem("monstrous")) || [];
      storedMonstrous.push(monstruo);
      localStorage.setItem("monstrous", JSON.stringify(storedMonstrous));
      renderMobs(storedMonstrous);
      Swal.fire({
        title: '¡Monstrous agregado!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        window.location.reload();
      });
    }
  });
}
//contador para ver cuantas veces se ataca
function random() {
  return Math.floor(Math.random() * 10);
}

//para variar el monstrou
function getRandomMonster() {
  const allMonsters = monstrous.concat(storedMonstrous);
  const randomIndex = Math.floor(Math.random() * allMonsters.length);
  return allMonsters[randomIndex];
}

function peleaChart(vueltas, monster) {
  let damage = 0;
  let life = 0;
  let hp = monster.hitPoints;
  let totalDamage = 0;

  for (let i = 0; i < vueltas; i++) {
      damage = player.attack;
      totalDamage += damage;
      life = hp - totalDamage;

      if (life <= 0) {
          info.innerText += `Le has pegado ${damage} y matado al ${monster.name}\n`;
          showNotification(`Has matado a un ${monster.name}`);
          updateExp(monster.hitPoints);
          break;
      }
      info.innerText += `Le has pegado al ${monster.name} y le quitaste ${damage}, le queda ${life} de vida\n`;
  }
}


function peleaMonstro(vueltas, monster) {
  let damage = 0;
  let life = 0;
  let hp = parseInt(infochart.querySelector("#hitPoints").innerText.split(":")[1]);
  let totalDamage = 0;

  for (let i = 0; i < vueltas; i++) {
      damage = monster.attack;
      totalDamage += damage;
      life = hp - totalDamage;

      if (life <= 0) {
          info.innerText += `Te han pegado ${damage} y has muerto\n `;
          showNotification("Has Muerto ,y volveras a lvl 1");
          resetPlayer();
          break;
      }
      info.innerText += `Te han pegado y te quito ${damage}, te queda ${life} de vida\n `;
      infochart.querySelector("#hitPoints").innerText = `Vida: ${life}`;
      updateAndSavePlayerData()
  }
}

function caminar() {
  if (Math.random() < 0.5) {
      const randomMonster = getRandomMonster();
      info.innerText = `Te encontraste a un ${randomMonster.name} \n`;
      if (Math.random() < 0.5) {
          const vecesAtaque = random();
          peleaChart(vecesAtaque, randomMonster);
          peleaMonstro(vecesAtaque, randomMonster);
      } else {
          info.innerText = `El ${randomMonster.name} huyó`;
      }
  } else {
      info.innerText = `No hay nada`;
  }
}
//cuando muere
function resetPlayer() {
  player.level = 1;
  player.attack = 1000;
  player.hitPoints = 1000;
  player.exp = 0;

  localStorage.setItem("playerData", JSON.stringify(player));

  infochart.querySelector("#level").innerText = `Nivel: ${player.level}`;
  infochart.querySelector("#attack").innerText = `Ataque: ${player.attack}`;
  infochart.querySelector("#hitPoints").innerText = `Vida: ${player.hitPoints}`;
  infochart.querySelector("#exp").innerText = `Experiencia: ${player.exp}`;
}

function renderMobs(mobsArray) {
  mobsArray.forEach(monstrou => {
      const card = document.createElement("div");
      card.className ="monster-card";
      card.innerHTML = `<h3>${monstrou.name}</h3>
                         <p>Ataque: ${monstrou.attack}</p>
                         <p>Vida: ${monstrou.hitPoints}</p>`;
      infoMob.appendChild(card);
  });
}


//exp que gana 
function updateExp(monsterLife) {
  const expGained = Math.floor(monsterLife / 2);
  player.exp += expGained;

  if (player.exp >= player.maxExp) {
    levelUp();
  } else {
    infochart.querySelector("#exp").innerText = `Experiencia: ${player.exp}`;
  }
}

//api con datos de monstrous
fetch('https://www.moogleapi.com/api/v1/monsters')
  .then(response => response.json())
  .then(data => {
        monstrous = data;
      renderMobs(monstrous);
  })
  .catch(error => console.error('Error', error));


function showNotification(message) {

  Toastify({
      text: message,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", 
      position: "left", 
      stopOnFocus: true, 
      style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function(){} 
  }).showToast();
}

const monstrous = [{nombre:"Slime",hp:"10",atk:3},{nombre:"Baphomet",hp:"10000",atk:300}]

const char = [{atk:4,hp:"50"}]




let info = document.getElementById("info")
let notificacion = document.getElementById("notificacion")


let avanzar = document.getElementById("avanzar")
avanzar.addEventListener("click", clickBotton)
function clickBotton () {
      info.innerText=""
      notificacion.innerText=""    
       caminar()
}

////////////////////crear mob
let agregarMoustro = document.getElementById("crearmob")

agregarMoustro.addEventListener("click",creadorMob)

function creadorMob () {

  const card = document.createElement("div")
        card.innerHTML = `<input type="text" id="nameMonster">Nombre <br>
                          <input type="text" id="atkMonster">Ataque <br>
                          <input type="text" id="hpMonster">Vida<br>
                          <button id="aceptarMob">Aceptar</button>
                          `
      agregarMoustro.appendChild(card)

      agregarMoustro.removeEventListener("click", creadorMob);

      let aceptarMob = document.getElementById("aceptarMob")

       aceptarMob.addEventListener("click",sumarMob)
}

function sumarMob(){
  const nameInput = document.getElementById("nameMonster").value
  const atkInput = document.getElementById("atkMonster").value
  const hpInput = document.getElementById("hpMonster").value

  const monstruo = {
    nombre: nameInput,
    atk: parseInt(atkInput),
    hp: parseInt(hpInput)
};
monstrous.push(monstruo);

document.getElementById("nameMonster").value = "";
document.getElementById("atkMonster").value = "";
document.getElementById("hpMonster").value = "";

infoMob.innerHTML = "";
renderMobs(monstrous)

localStorage.setItem("monstrouPersonalizados", JSON.stringify(monstrous))



}

//random de 0 a 9

function random() {
  let numero = (Math.random() * 10).toFixed(0)
  return numero
}



//pelea
function peleaChart(vueltas) {
    let daño=0
    let vida=0
    let hp=monstrous[0].hp
    let sumaDaño = 0
    
     for (var i = 0; i <vueltas;i++) {
     daño = char[0].atk
     sumaDaño += daño
     vida = hp- sumaDaño
     
     

     if (vida <= 0){
      
      info.innerText +=`le has pegado ${daño}  y matado al ${monstrous[0].nombre}\n`
      notificacion.innerHTML= `<h2> Has matado a un ${monstrous[0].nombre}</h2>`
       

        break
      }
    info.innerText +=`Le has pegado al ${monstrous[0].nombre} y le quitaste ${daño} le queda de hp ${vida}\n`
}
}

function peleaMonstro(vueltas){
    let daño=0
    let vida=0
    let hp=char[0].hp
    let sumaDaño = 0
    
     for (var i = 0; i <vueltas;i++) {
     daño = monstrous[0].atk
     sumaDaño += daño
     vida = hp- sumaDaño
     
     
     if (vida <= 0){
        info.innerText +=`Te han pegado ${daño} y has muerto\n `
        notificacion.innerHTML= `<h2> Has Muerto</h2>`
        break
      }
      info.innerText +=`Te han pegado y te quito ${daño} te queda de hp ${vida}\n `
    
}
}
//caminar
function caminar() {
if (Math.random() < (0.5)){
  info.innerText=`Te encontraste a un ${monstrous[0].nombre} \n`
    if (Math.random() < (0.5)){
    let vecesAtaque = random()
    peleaChart(vecesAtaque)
    peleaMonstro(vecesAtaque)
  }else{
    info.innerText=`El ${monstrous[0].nombre} huyo`
  
}
}else{
  info.innerText=`No hay nada`

}
}


///////////////panel izq



let infochart = document.getElementById("infochart")

infochart.innerText=`Ataque: ${char[0].atk}\n Vida: ${char[0].hp}`

///////////panel der

const storedMonstrous = JSON.parse(localStorage.getItem("monstrouPersonalizados"));

const mobsArray = storedMonstrous || monstrous;

let infoMob = document.getElementById("infomob")

function renderMobs(mobsArray) {
    mobsArray.forEach (monstrou => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>${monstrou.nombre}</h3>
                           <p>Ataque: ${monstrou.atk}</p>
                          <p>Vida: ${monstrou.hp}</p>
                          `
       infoMob.appendChild(card)
    })
    
}
renderMobs(mobsArray)


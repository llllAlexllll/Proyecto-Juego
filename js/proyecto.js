const monstrous = [{nombre:"slime",hp:"10",atk:3}]

const char = [{atk:4,hp:"50"}]

///menu
let numero = 0
while (numero != 3) {
    
    let menu =prompt("elegi una opcion \n 1:Caminar \n 2:Agregar Monstrou \n 3:salir") 

switch (menu){
    case '1':
        console.log("Estas caminando")
        caminar()
        break;
    case '2':
        console.log("Agregar")
        agregarMon()
        break;
     case '3':
        console.log("salir")
        numero = 3
        break;
    default:
        console.log("Opcion no valida")
}
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
        console.log("le has pegado "+daño+ " y matado al "+monstrous[0].nombre)
        alert("Has matado a un "+monstrous[0].nombre)
        break
      }
    console.log("Le has pegado al "+monstrous[0].nombre +" y le quitaste "+daño+" le queda de hp "+vida)
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
        console.log("Te han pegado "+daño+ " y has muerto ")
        break
      }
    console.log("Te han pegado y te quito "+daño+" te queda de hp "+vida)
}
}
//caminar
function caminar() {
if (Math.random() < (0.5)){
  console.log("Te encontraste a un "+monstrous[0].nombre)
  if (Math.random() < (0.5)){
    let vecesAtaque = random()
    peleaChart(vecesAtaque)
    peleaMonstro(vecesAtaque)
  }else{
  console.log("El "+monstrous[0].nombre+" huyo")
}
}else{
console.log("No hay nada")
}
}

//agregar monstrou

function agregarMon() {
  
  const nombre = prompt("Ingrese el nombre")
  const hp = prompt("Ingrese la vida")
  const atk = prompt("Ingrese el ataque")
   
  const monstrouNuevo ={
    nombre:nombre,
    hp:hp,
    atk:atk
  }
  monstrous.push(monstrouNuevo)
  console.log(monstrous)
  
}


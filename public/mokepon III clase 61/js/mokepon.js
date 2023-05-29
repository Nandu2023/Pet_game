//Variables Globales
const contentCards = document.getElementById("contentCards");
const attacksDefinition = ["AQUA", "TERRA", "FIRE"];
const gvimagegamer = document.getElementById("imagegamer")
const sectionWatchMap = document.getElementById("watchMap")
const map = document.getElementById("map")
const widthMaxMap = 550
const maxSizeWindowWidth  = 800
const maxSizeWindowHeight = 600

let contentAttacksGamer = document.getElementById("contentAttacksGamer");
let contentAttacksEnemy = document.getElementById("contentAttacksEnemy");
let sectionChoiceAttack = document.getElementById("choice_attack");
let buttonPetPlayer = document.getElementById("button_pet")
let sectionChoicePet = document.getElementById("choice_pet")
let pets_array = document.getElementsByName("pets");
let gamerChoice = 999;
let idResultCombat = document.getElementById("idresult");
let idAttackGamerCombat = document.getElementById("idattackgamer");
let idAttackEnemyCombat = document.getElementById("idattackenemy");
let sectionMessages = document.getElementById("Messages");
let gvimageenemy = document.getElementById("imageenemy")
let optionOfMokepones
let optionOfAttacks
let attackGamer
let attackEnemy
let attackMokepon
let mokepones = [];
let buttonFire
let buttonAqua
let buttonTerra
let buttonReset
let arrayAttackGamer = []
let arrayAttackEnemy = []
let ContainArrayAttacksGamer
let ContainArrayAttacksEnemy
let lienzo = map.getContext("2d")
let intervalo
let attributePetGamer
let attributePetEnemy
let mapBackground = new Image()
mapBackground.src = "./assets/mokemap.png"
let heightSearch

if (window.innerWidth > maxSizeWindowWidth) {
    window.innerWidth = maxSizeWindowWidth
}

if (window.innerHeight > maxSizeWindowHeight) {
    window.innerHeight = maxSizeWindowHeight
}

let widthMap = window.innerWidth - 20

if (widthMap > widthMaxMap) {
    widthMap = widthMaxMap - 20
}

heightSearch = widthMap * 600 / 800
map.width = widthMap
map.height = heightSearch

// Clases

class Mokepon {
    constructor(name, photo, lifes, title, photoMap) {  //x y y, pueden llevar valor por defecto, si no se envia en el parametro
        this.name = name
        this.photo = photo
        this.lifes = lifes
        this.title = title
        this.attacks = [] //se llena mas adelante
        this.widthAncho = 50
        this.heightAlto = 50        
        this.x = random(0, map.width - 20 - this.widthAncho)
        this.y = random(0, map.height - 20 - this.heightAlto)
        this.mapPhoto = new Image()
        this.mapPhoto.src = photoMap
        this.speedX = 0
        this.speedY = 0
    }

    paintMokepon() {
        lienzo.drawImage(
            this.mapPhoto,
            this.x,
            this.y,
            this.widthAncho,
            this.heightAlto
        )
    }
}

let dogEvil = new Mokepon('dog', './assets/dog_pet.png', 3, 'Dog Evil', './assets/dog_pet_head.png');
let catWizard = new Mokepon('cat', './assets/cat_pet.png', 3, 'Cat Wizard', './assets/cat_pet_head.png');
let mouseSuper = new Mokepon('mouse', './assets/mouse_pet.png', 3, 'Mouse Super', './assets/mouse_pet_head.png');
let canaryAvenger = new Mokepon('canary', './assets/canary_pet.png', 3, 'Canary Avenger', './assets/canary_pet_head.png');



dogEvil.attacks.push(
    { name: '💧', id: 'button_aqua', title: 'AQUA' },
    { name: '💧', id: 'button_aqua', title: 'AQUA' },
    { name: '💧', id: 'button_aqua', title: 'AQUA' },
    { name: '🔥', id: 'button_fire', title: 'FIRE' },
    { name: '🌎', id: 'button_terra', title: 'TERRA' },
)

catWizard.attacks.push(
    { name: '🌎', id: 'button_terra', title: 'TERRA' },
    { name: '🌎', id: 'button_terra', title: 'TERRA' },
    { name: '🌎', id: 'button_terra', title: 'TERRA' },
    { name: '💧', id: 'button_aqua', title: 'AQUA' },
    { name: '🔥', id: 'button_fire', title: 'FIRE' },
)

mouseSuper.attacks.push(
    { name: '🔥', id: 'button_fire', title: 'FIRE' },
    { name: '🔥', id: 'button_fire', title: 'FIRE' },
    { name: '🔥', id: 'button_fire', title: 'FIRE' },
    { name: '💧', id: 'button_aqua', title: 'AQUA' },
    { name: '🌎', id: 'button_terra', title: 'TERRA' },
)

canaryAvenger.attacks.push(
    { name: '💧', id: 'button_aqua', title: 'AQUA' },
    { name: '💧', id: 'button_aqua', title: 'AQUA' },
    { name: '💧', id: 'button_aqua', title: 'AQUA' },
    { name: '🔥', id: 'button_fire', title: 'FIRE' },
    { name: '🌎', id: 'button_terra', title: 'TERRA' },
)

mokepones.push(dogEvil, catWizard, mouseSuper, canaryAvenger)

//console.log(dogEvil)

// funcion que se utiliza para que se cargue la informacion, cuando se da click en el boton del attackGamer
function startGame() {

    sectionChoiceAttack.style.display = "none"
    sectionWatchMap.style.display = "none"

    mokepones.forEach((Mokepon) => {

        optionOfMokepones = `
        <input type="radio" name="pets" id=${Mokepon.name} title=${Mokepon.name} />
        <label class="classlabelchoicepet" for=${Mokepon.name}>
            <p class="classptitlepets">${Mokepon.title}</p>
            <img src=${Mokepon.photo} alt=${Mokepon.name} class="classimgpet">
        </label>`

        contentCards.innerHTML += optionOfMokepones

    })

    //    document.getElementById("livesGamer").innerHTML = 3;
    //    document.getElementById("livesEnemy").innerHTML = 3;

    buttonPetPlayer.addEventListener("click", choicePetPlayer)

}

//Extraer los ataques de la mascota
function extraerAttacks(petGamer) {

    for (let inc = 0; inc < mokepones.length; inc++) {
        if (petGamer.name === mokepones[inc].name) {
            return mokepones[inc].attacks
            break;
        }

    }
}

// muestra los ataques de la mascota

function showAttacksGamer(attacks) {
    attacks.forEach((attacks) => {

        attackMokepon = `
        <button id=${attacks.id} name="attacks" class="buttonattack BAttack" title=${attacks.title}>${attacks.name}</button>
        `
        contentAttacksGamer.innerHTML += attackMokepon
    })

    buttonFire = document.getElementById("button_fire")
    buttonAqua = document.getElementById("button_aqua")
    buttonTerra = document.getElementById("button_terra")

    buttons = document.querySelectorAll('.BAttack') //Esto es para que repita los elementos BAttack que son 3 botones del mismo nombre

    buttonReset = document.getElementById("buttonResetGame")

    buttonFire.addEventListener("click", attackFire)
    buttonAqua.addEventListener("click", attackAqua)
    buttonTerra.addEventListener("click", attackTerra)

    buttonReset.addEventListener("click", resetGame)
    buttonReset.style.display = "none"
}

function showAttacksEnemy(attacks) {
    attacks.forEach((attacks) => {

        attackMokepon = `
        <button id=${attacks.id} name="attacksenemy" class="buttonattackenemy" title=${attacks.title}>${attacks.name}</button>
        `
        contentAttacksEnemy.innerHTML += attackMokepon
    })

    buttonFire = document.getElementById("button_fire")
    buttonAqua = document.getElementById("button_aqua")
    buttonTerra = document.getElementById("button_terra")

    buttonReset.style.display = "none"
}

// 
function sequenceAttacks() {
    buttons.forEach((button) => {  //Por cada button que exista en el arreglo de buttons debe hacer algo

        button.addEventListener("click", (eventClick) => {

            if (eventClick.target.id === buttonFire.id) {

                arrayAttackGamer.push(eventClick.target.title)
                idAttackGamerCombat.innerHTML = eventClick.target.title
                eventClick.target.disabled = true
                button.style.background = '#8a2be2'
                //                button.click();  //No se para que se utiliza, pero me disparaba 2 veces el boton de ataque

            } else if (eventClick.target.id === buttonAqua.id) {

                arrayAttackGamer.push(eventClick.target.title)
                idAttackGamerCombat.innerHTML = eventClick.target.title
                eventClick.target.disabled = true
                button.style.background = '#8a2be2'
                //                button.click();

            } else if (eventClick.target.id === buttonTerra.id) {

                arrayAttackGamer.push(eventClick.target.title)
                idAttackGamerCombat.innerHTML = eventClick.target.title
                eventClick.target.disabled = true
                button.style.background = '#8a2be2'
                //                button.click();

            }
            selectAttackEnemy();  //Ingresa solo cuando se da click en un boton de ataque
            startFight();
        })
    }
    )

}

function startFight() {
    if (arrayAttackEnemy.length === 5) {
        newFight()
    }

}

function newFight() {

    countLivesGamer = 0
    countLivesEnemy = 0

    for (let index = 0; index < arrayAttackEnemy.length; index++) {

        if (arrayAttackEnemy[index] == arrayAttackGamer[index]) {

            //Ganaste si: fuego vs tierra //agua vs fuego //Tierra vs agua
        } else if ((arrayAttackGamer[index] == attacksDefinition[2] && arrayAttackEnemy[index] == attacksDefinition[1]) ||
            (arrayAttackGamer[index] == attacksDefinition[0] && arrayAttackEnemy[index] == attacksDefinition[2]) ||
            (arrayAttackGamer[index] == attacksDefinition[1] && arrayAttackEnemy[index] == attacksDefinition[0])) {

            countLivesEnemy = countLivesEnemy + 1;

        } else { //Cualquier otro, perdiste

            countLivesGamer = countLivesGamer + 1;
        }
    }

    idResultCombat.innerHTML = ""
    if (countLivesEnemy > countLivesGamer) {
        createFinalMessage("😢😢 YOU LOST 😢😢");

    } else if (countLivesGamer > countLivesEnemy) {

        createFinalMessage("🎈🎈 CONGRATULATIONS YOU WIN 🎈🎈");
    } else {

        createFinalMessage("🎈🎈 THE GAME ENDED IN A DRAW 🎈🎈");
    }

}

// funcion que determina que mascota escogio el attackGamer
function choicePetPlayer() {

    // Deshabilito el boton seleccionar mascota

    sectionChoicePet.style.display = "none"
    let maxNumberArrayPets = mokepones.length;

    // loop al array

    if (maxNumberArrayPets > 0) {
        for (let inc = 0; inc < maxNumberArrayPets; inc++) {

            let pets_input = pets_array[inc];

            if (pets_array[inc].checked) {

                gvimagegamer.setAttribute("src", mokepones[inc].photo)
                namepetgamer.innerHTML = mokepones[inc].title
                attributePetGamer = mokepones[inc]

                gamerChoice = inc;
                petsInputTitle = pets_input.title;

                ContainArrayAttacksGamer = extraerAttacks(mokepones[inc])
                showAttacksGamer(ContainArrayAttacksGamer)

                break;
            }
        }

    }

    if (gamerChoice == 999) {
        alert("You don't choice any Pet. Try again ❗❗❗");
        resetGame();
    } else {

        sectionWatchMap.style.display = "flex"

        startWalkMap()

        selectPetEnemy(petsInputTitle);
        sequenceAttacks();
    }
}

// funcion para elegir un numero aleatorio
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Selecciona la mascota aleatoria del enemigo, pero no puede ser igual al escogido por el attackGamer
function selectPetEnemy(gamerSelectTitle) {

    let distinctChoiceGamer = false

    while (distinctChoiceGamer === false) {
        let petEnemyNumber = random(1, mokepones.length);

        // Para que lo ubique en el array correctamente        
        petEnemyNumber = petEnemyNumber - 1;

        // Leo el array, para traer todas las mascotas    
        let pets_input = pets_array[petEnemyNumber];

        if (pets_input.title != gamerSelectTitle) {

            ContainArrayAttacksEnemy = extraerAttacks(mokepones[petEnemyNumber])
            showAttacksEnemy(ContainArrayAttacksEnemy)

            gvimageenemy.setAttribute("src", mokepones[petEnemyNumber].photo)
            namepetenemy.innerHTML = mokepones[petEnemyNumber].title
            attributePetEnemy = mokepones[petEnemyNumber]
            distinctChoiceGamer = true;

        }
    }
}

// Cuando se da click en el boton ataque de fuego
function attackFire() {

    attackGamer = attacksDefinition[2];
}

// Cuando se da click en el boton ataque de agua
function attackAqua() {
    attackGamer = attacksDefinition[0];

}

// Cuando se da click en el boton ataque de tierra
function attackTerra() {
    attackGamer = attacksDefinition[1];
}

function selectAttackEnemy() {
    //  Debemos buscar en los botoles del enemigo uno con el ataque    
    let buttonSelectEnemy = document.getElementsByName("attacksenemy")
    let attackEnemyNumber

    let freeArray = false
    while (freeArray === false) {
        attackEnemyNumber = random(1, 5);

        // Para que lo ubique en el array correctamente        
        attackEnemyNumber = attackEnemyNumber - 1;

        if (buttonSelectEnemy[attackEnemyNumber].title != 'XXXX') {
            freeArray = true
        }
    }

    // Leo el array, para traer todos los ataques
    attackEnemy = ContainArrayAttacksEnemy[attackEnemyNumber];

    arrayAttackEnemy.push(attackEnemy.title)
    idAttackEnemyCombat.innerHTML = attackEnemy.title

    buttonSelectEnemy[attackEnemyNumber].style.background = '#8a2be2'
    buttonSelectEnemy[attackEnemyNumber].title = 'XXXX' //Para que ese boton no lo vuelva a colorear
}

function fight() {

    let countLivesGamer = document.getElementById("livesGamer").innerHTML;
    let countLivesEnemy = document.getElementById("livesEnemy").innerHTML;

    //COMBATE

    if (attackEnemy == attackGamer) {
        createMessage("DRAW ");

        //Ganaste si: fuego vs tierra //agua vs fuego //Tierra vs agua
    } else if ((attackGamer == attacksDefinition[2] && attackEnemy == attacksDefinition[1]) || (attackGamer == attacksDefinition[0] && attackEnemy == attacksDefinition[2]) || (attackGamer == attacksDefinition[1] && attackEnemy == attacksDefinition[0])) {
        createMessage(" YOU WIN ");
        document.getElementById("livesEnemy").innerHTML = countLivesEnemy = countLivesEnemy - 1;

    } else { //Cualquier otro, perdiste

        createMessage(" YOU LOST ");
        document.getElementById("livesGamer").innerHTML = countLivesGamer = countLivesGamer - 1;
    }

    if (countLivesGamer == 0) {
        createFinalMessage("😢😢 YOU LOST 😢😢");
        //        resetGame();
    }
    if (countLivesEnemy == 0) {
        createMessage(" ");
        createFinalMessage("🎈🎈 CONGRATULATIONS YOU WIN 🎈🎈");
        //        resetGame();
    }
}

function createMessage(resultCombat) {

    idResultCombat.innerHTML = resultCombat
    idAttackGamerCombat.innerHTML = attackGamer
    idAttackEnemyCombat.innerHTML = attackEnemy

}

function createFinalMessage(finalResult) {

    let paragraph = document.createElement("p")

    paragraph.innerHTML = finalResult;
    sectionMessages.appendChild(paragraph);

    // Deshabilita los botones para evitar que se siga jugando    

    buttonFire.disabled = true
    buttonAqua.disabled = true
    buttonTerra.disabled = true
    buttonReset.style.display = "block"
}

function resetGame() {
    location.reload();
}

function paintCanvasMap() {
    attributePetGamer.x = attributePetGamer.x + attributePetGamer.speedX
    attributePetGamer.y = attributePetGamer.y + attributePetGamer.speedY

    lienzo.clearRect(0, 0, map.width, map.height)
    lienzo.drawImage(
        mapBackground,
        0,
        0,
        map.width,
        map.height

    )
    attributePetGamer.paintMokepon()
    attributePetEnemy.paintMokepon()
    if (attributePetGamer.speedX != 0 || attributePetGamer.speedY) {
        testCollition()
    }
}

function moveLeft() {
    attributePetGamer.speedX = -5
    paintCanvasMap()
}

function moveRight() {
    attributePetGamer.speedX = 5
    paintCanvasMap()
}

function moveUp() {
    attributePetGamer.speedY = -5
    paintCanvasMap()
}

function moveDown() {
    attributePetGamer.speedY = 5
    paintCanvasMap()
}

function stopMove() {
    attributePetGamer.speedX = 0
    attributePetGamer.speedY = 0
}

function pressKey(event) {   //con un addEventListener, retorna usualmente las caracteristicas del objeto
    switch (event.key) {
        case "ArrowRight":
            moveRight()
            break;
        case "ArrowLeft":
            moveLeft()
            break;
        case "ArrowDown":
            moveDown()
            break;
        case "ArrowUp":
            moveUp()
            break;
        default:
            break;
    }
    console.log(event.key)
}

function startWalkMap() {

    //  map.width = 600
    //  map.height = 360
    intervalo = setInterval(paintCanvasMap, 50)  //Cada cuantos milisegundos se ejecuta la funcion
    window.addEventListener("keydown", pressKey)
    window.addEventListener("keyup", stopMove)
}

function testCollition() {
    const upPetEnemy = attributePetEnemy.y
    const downPetEnemy = attributePetEnemy.y + attributePetEnemy.heightAlto
    const rightPetEnemy = attributePetEnemy.x + attributePetEnemy.widthAncho
    const leftPetEnemy = attributePetEnemy.x

    const upPetGamer = attributePetGamer.y
    const downPetGamer = attributePetGamer.y + attributePetGamer.heightAlto
    const rightPetGamer = attributePetGamer.x + attributePetGamer.widthAncho
    const leftPetGamer = attributePetGamer.x

    if (downPetGamer < upPetEnemy ||
        upPetGamer > downPetEnemy ||
        rightPetGamer < leftPetEnemy ||
        leftPetGamer > rightPetEnemy) {
        return;
    }
    stopMove()

    // habilito los ataques
    sectionChoiceAttack.style.display = "flex"
    sectionWatchMap.style.display = "none"   //La primera vez se oculta el mapa
    //    alert("COLLITION !!!")
}

// Para que solo cuando termine de cargar la pagina, inicie las oattackEnemyiones del juego
window.addEventListener("load", startGame);


//Variables Globales
let attacksDefinition = ["AQUA", "TERRA", "FIRE"];
let attackGamer
let attackEnemy

// funcion que se utiliza para que se cargue la informacion, cuando se da click en el boton del attackGamer
function startGame() {

    let sectionChoiceAttack = document.getElementById("choice_attack");
    sectionChoiceAttack.style.display = "none"

    document.getElementById("livesGamer").innerHTML = 3;
    document.getElementById("livesEnemy").innerHTML = 3;

    let buttonPetPlayer = document.getElementById("button_pet")
    buttonPetPlayer.addEventListener("click", choicePetPlayer)

    let buttonFire = document.getElementById("button_fire")
    buttonFire.addEventListener("click", attackFire)

    let buttonAqua = document.getElementById("button_aqua")
    buttonAqua.addEventListener("click", attackAqua)

    let buttonTerra = document.getElementById("button_terra")
    buttonTerra.addEventListener("click", attackTerra)

    let buttonReset = document.getElementById("buttonResetGame")
    buttonReset.addEventListener("click", resetGame)
    buttonReset.style.display = "none"

}

// funcion que determina que mascota escogio el attackGamer
function choicePetPlayer() {

    // Deshabilito el boton seleccionar mascota
    let sectionChoicePet = document.getElementById("choice_pet")
    sectionChoicePet.style.display = "none"

    // Leo el array, para traer todas las mascotas    
    let pets_array = document.getElementsByName("pets");
    let gamerChoice = 999;

    // loop al array
    let maxNumberArrayPets = pets_array.length;

    if (maxNumberArrayPets > 0) {
        for (let inc = 0; inc < maxNumberArrayPets; inc++) {

            let pets_input = pets_array[inc];

            if (pets_array[inc].checked) {
                const gvimagegamer = document.getElementById("imagegamer")
                switch (inc) {
                    case 0:
                        gvimagegamer.setAttribute("src", "./assets/dog_pet.png")
//                        gvimagegamer.setAttribute("alt", "hipodoge")
                        break;

                    case 1:
                        gvimagegamer.setAttribute("src", "./assets/cat_pet.png")
                        break;

                    case 2:
                        gvimagegamer.setAttribute("src", "./assets/mouse_pet.png")
                        break;
                }

                gamerChoice = inc;
                petsInputTitle = pets_input.title;

                break;
            }
        }

    }

    if (gamerChoice == 999) {
        alert("You don't choice any Pet. Try again ❗❗❗");
        resetGame();
    } else {

        // habilito los ataques
        let sectionChoiceAttack = document.getElementById("choice_attack");
        sectionChoiceAttack.style.display = "flex"

        selectPetEnemy(petsInputTitle);
    }
}

// funcion para elegir un numero aleatorio
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Selecciona la mascota aleatoria del enemigo, pero no puede ser igual al escogido por el attackGamer
function selectPetEnemy(gamerSelectTitle) {

    let distinctChoiceGamer = false

    while (distinctChoiceGamer == false) {
        let petEnemyNumber = random(1, 3);

        // Para que lo ubique en el array correctamente        
        petEnemyNumber = petEnemyNumber - 1;

        // Leo el array, para traer todas las mascotas    
        let pets_array = document.getElementsByName("pets");

        let pets_input = pets_array[petEnemyNumber];

        if (pets_input.title != gamerSelectTitle) {
            const gvimageenemy = document.getElementById("imageenemy")
            switch (petEnemyNumber) {
                case 0:
                    gvimageenemy.setAttribute("src", "./assets/dog_pet.png")
//                        gvimagegamer.setAttribute("alt", "hipodoge")
                    break;

                case 1:
                    gvimageenemy.setAttribute("src", "./assets/cat_pet.png")
                    break;

                case 2:
                    gvimageenemy.setAttribute("src", "./assets/mouse_pet.png")
                    break;
            }
            distinctChoiceGamer = true;
        }
    }
}

// Cuando se da click en el boton ataque de fuego
function attackFire() {

    attackGamer = attacksDefinition[2];
    selectAttackEnemy();
    fight();
}

// Cuando se da click en el boton ataque de agua
function attackAqua() {
    attackGamer = attacksDefinition[0];
    selectAttackEnemy();
    fight();

}

// Cuando se da click en el boton ataque de tierra
function attackTerra() {
    attackGamer = attacksDefinition[1];
    selectAttackEnemy();
    fight();
}

function selectAttackEnemy() {
    let attackEnemyNumber = random(1, 3);

    // Para que lo ubique en el array correctamente        
    attackEnemyNumber = attackEnemyNumber - 1;

    // Leo el array, para traer todos los ataques
    attackEnemy = attacksDefinition[attackEnemyNumber];
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

    let idResultCombat = document.getElementById("idresult");
    let idAttackGamerCombat = document.getElementById("idattackgamer");
    let idAttackEnemyCombat = document.getElementById("idattackenemy");

    idResultCombat.innerHTML = resultCombat
    idAttackGamerCombat.innerHTML = attackGamer
    idAttackEnemyCombat.innerHTML = attackEnemy

}

function createFinalMessage(finalResult) {

    let paragraph = document.createElement("p")
    let sectionMessages = document.getElementById("Messages");

    paragraph.innerHTML = finalResult;
    sectionMessages.appendChild(paragraph);

    // Deshabilita los botones para evitar que se siga jugando    

    let buttonFire = document.getElementById("button_fire")
    buttonFire.disabled = true

    let buttonAqua = document.getElementById("button_aqua")
    buttonAqua.disabled = true

    let buttonTerra = document.getElementById("button_terra")
    buttonTerra.disabled = true

    let buttonReset = document.getElementById("buttonResetGame")
    buttonReset.style.display = "block"
}

function resetGame() {
    location.reload();
}

// Para que solo cuando termine de cargar la pagina, inicie las oattackEnemyiones del juego
window.addEventListener("load", startGame);


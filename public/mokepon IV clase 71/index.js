const express = require("express")  //importar la libreria express, previamente instalada en nodejs
const cors = require("cors")        //importar la libreria cors, previamente instalada en nodejs
const { response } = require("express")

const app = express() // se crea una instancia del servidor que se va a utilizar

app.use(cors())  //para que no surjan mas errores tipo CORS

app.use(express.static("public"))  //Nos sirve para que el servidor pueda dar un archivo statico: .html. jps.css
app.use(express.json())  //como se va a utilizar peticiones tipo POST, para activar las peticiones tipo JSON

const gamers = []

class Gamer {
    constructor(id) {
        this.id = id
    }
    assignMokepon(mokepon) {
        this.mokepon = mokepon
    }
    updatePosition(x, y) {
        this.x = x
        this.y = y
    }
    assignAttacks(attacks) {
        this.attacks = attacks
    }
}

class Mokepon {
    constructor(name) {
        this.name = name
    }
}

app.get("/unirse", (req, res) => {//cada vez que el cliente solicite un recurso, vamos a hacer algo, como recibir algo y como enviar algo
    //en que url, en este caso /, req requerimiento y resp, reponder

    const id = `${Math.random()}`
    const gamer = new Gamer(id)

    gamers.push(gamer)

    res.setHeader("Access-Control-Allow-Origin", "*") //Desde que origen vamos a permitir que se hagan peticiones "*" todas la ubicaciones

    res.send(id)
})

app.post("/mokepon-iv-clase-71/:gamerId", (req, res) => {  //Esta peticion se consume desde el front
    const gamerId = req.params.gamerId || ""  //el "" es si no llega el nombre de la variable gamerId    

    // extraer el body del json enviado, en este caso el mokepon 
    const nameMokepon = req.body.mokepon || ""  //el "" es si no llega el nombre de la variable mokepon    

    const mokepon = new Mokepon(nameMokepon)

    const gamerIndex = gamers.findIndex((gamer) => gamerId === gamer.id)  //si devuelve nro positivo existe, de lo contrario no existe

    if (gamerIndex >= 0) {
        gamers[gamerIndex].assignMokepon(mokepon)
    }

    //nos permite buscar en toda la lista algun elemento que cumpla la condicion
    console.log(gamers)
    res.end()
})

// Recibir las coordenadas X y Y del mokepon
app.post("/mokepon-iv-clase-71/:gamerId/posicion", (req, res) => {

    const gamerId = req.params.gamerId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const gamerIndex = gamers.findIndex((gamer) => gamerId === gamer.id)

    if (gamerIndex >= 0) {
        gamers[gamerIndex].updatePosition(x, y)
    }

    const enemies = gamers.filter((gamer) => gamerId !== gamer.id)

    console.log(enemies)
    res.send({
        enemies

    })  //para devolver la respuesta solo atraves de un JSON 
})

// Recibir los ataques de jugador
app.post("/mokepon-iv-clase-71/:gamerId/ataques", (req, res) => {

    const gamerId = req.params.gamerId || ""
    const attacksGamer = req.body.attacks    //asi viene del body JSON    

    const gamerIndex = gamers.findIndex((gamer) => gamerId === gamer.id)

    if (gamerIndex >= 0) {
        gamers[gamerIndex].assignAttacks(attacksGamer)
    }

})

//Buscar jugador, para obtener los ataques
app.get("/mokepon-iv-clase-71/:gamerId/ataques", (req, res) => {

    const gamerId = req.params.gamerId || ""
    const gamer  = gamers.find((gamer) => gamer.id === gamerId)

    res.send({
        attacks: gamer.attacks || [] 
    })
})


app.listen(8080, () => {  //para que escuche las peticiones del los clientes, con el puerto
    console.log("Servidor funcionando")
})
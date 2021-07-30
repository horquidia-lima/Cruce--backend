const express = require('express')
const app = express()

//CORS
const cors = require('cors')
app.use(cors())

//POST
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/products', (request, response) => {
    response.json(products)
})

app.get('/api/products/:id', (request, response)=>{
    const id = Number(request.params.id)
    const product = products.find(product => product.id === id)

    if(product) {
        response.json(product)
    }else {
        response.status(404).end()
    }
    
})

app.delete('/api/products/:id', (request,response) => {
    const id = Number(request.params.id)
    /*products = products.filter(product => product.id !== id)

    response.status(204).end()*/
    prod = products.filter((item, index) => {
        if(item.id == id){
            products.splice(index, 1)
        }
    })

    response.json(prod)
})

const generateId = () => {
    const maxId = products.length > 0
        ? Math.max(...products.map(p => p.id))
        : 0
    return maxId + 1
}

app.post('/api/products', (request, response) => {
    const body = request.body
    
    if(!body.name){
        return response.status(400).json({
            error: 'name missing'
        })
    }

    const product = {
        id: generateId(),
        image: body.image,
        name: body.name,
        price: body.price,
        stock: body.stock,
    }

    products = products.concat(product)

    response.json(product)
})

app.put('/api/products/:id', (request, response) => {
    const id = Number(request.params.id)
    const body = request.body

    prod = products.filter(item => {
        if(item.id == id){
            item.name = body.name,
            item.image = body.image,
            item.price = body.price,
            item.stock = body.stock
        }
    })

    response.json(prod)
})
let products = [
    {
        "id": 1,
        "image": "./images/daenerys.svg",
        "name": "Funko POP | Game Of Thrones - Daenerys 25",
        "price": 1269,
        "stock": 3,
        "sale": true
    },
    {
        "id": 2,
        "image": "./images/davos.svg",
        "name": "Funko POP | Game Of Thrones - Daenerys 25",
        "price": 2390,
        "stock": 5,
        "sale": false
    },
    {
        "id": 3,
        "image": "./images/tormund.svg",
        "name": "Funko POP | Game Of Thrones - Daenerys 25",
        "price": 300,
        "stock": 0,
        "sale": false
    },
    {
        "id": 4,
        "image": "./images/tyrion.svg",
        "name": "Funko POP | Game Of Thrones - Daenerys 25",
        "price": 1269,
        "stock": 6,
        "sale": true
    },
    {
        "id": 5,
        "image": "./images/jon.svg",
        "name": "Funko POP | Game Of Thrones - Daenerys 25",
        "price": 2390,
        "stock": 8,
        
        "sale": false
    },
    {
        "id": 6,
        "image": "./images/night.svg",
        "name": "Funko POP | Game Of Thrones - Daenerys 25",
        "price": 2390,
        "stock": 7,
        "sale": false
    },
    {
        "id": 7,
        "image": "./images/brienne.svg",
        "name": "Funko POP | Game Of Thrones - Daenerys 25",
        "price": 1269,
        "stock": 6,
        "sale": true
    },
    {
        "id": 8,
        "image": "./images/ghost.svg",
        "name": "Funko POP | Game Of Thrones - Daenerys 25",
        "price": 1269,
        "stock": 6,
        "sale": true
    }
]

const PORT = process.env.PORT|| 3001
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})




const express = require('express')
const PORT = process.env.PORT || 3001

const app = express()

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Welcome to our crib')
})

app.get('/greetings/:name', (req, res) => {
    let name = req.params.name
    console.log(name)
    res.send(`Well fancy seeing you here, ${name}`)
})

app.get('/roll/:num', (req, res) => {
    let value = Number(req.params.num)
    console.log(value)
    if(isNaN(value)){
        res.send('please enter a number')
    } else {
        res.send(`Your roll is: ${Math.floor(Math.random() *value)}`)
    }
})

const collectibles = [
    {name: 'Original Shiny Charizard Card', price: 150},
    {name: 'deconstructed jack-o-lantern', price: 1000},
    {name: 'vintage sweater, dusted with genuine catfur', price: 10}
]

app.get('/collectibles/:num', (req, res) => {
    let item = Number(req.params.num)
    item < collectibles.length? res.send(`I caught you eyeing that genuine ${collectibles[item].name}. It's pretty rare. I couldn't possibly part with it for less than $${collectibles[item].price}.`) : res.send(`I don't have anything like that. Did you want to look for something else? We have ${collectibles.length} items in stock.`)
})

app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`)
})

app.get('/shoes', (req, res) => {
    console.log('new request')
    let matchingShoes =[
        { name: "Birkenstocks", price: 50, type: "sandal" },
        { name: "Air Jordans", price: 500, type: "sneaker" },
        { name: "Air Mahomeses", price: 501, type: "sneaker" },
        { name: "Utility Boots", price: 20, type: "boot" },
        { name: "Velcro Sandals", price: 15, type: "sandal" },
        { name: "Jet Boots", price: 1000, type: "boot" },
        { name: "Fifty-Inch Heels", price: 175, type: "heel" }
    ]


    console.log(matchingShoes)
    if (req.query.minPrice) {
        console.log(req.query.minPrice)
        for (let i = 0; i < matchingShoes.length; i++) {
            if (Number(req.query.minPrice) <= matchingShoes[i].price) {
                // console.log(shoes[i].price)
                console.log('in budget')
            } else {
                // console.log(shoes[i].price)
                matchingShoes.splice(i, 1)
                i--
            }
            
        }
        console.log(matchingShoes)
    } else {
        console.log('no min price')
    }
        
    if (req.query.maxPrice) {
        console.log(req.query.maxPrice)
        for (let i = 0; i < matchingShoes.length; i++) {
            if (Number(req.query.maxPrice) > Number(matchingShoes[i].price) ) {
                console.log('in budget')
            } else {
                console.log(`${Number(req.query.maxPrice)} is less than ${matchingShoes[i].price}`)
                matchingShoes.splice(i, 1)
                i--
            }
        }
        console.log(matchingShoes)
    } else {
        console.log('no max price')
    }
        
    if (req.query.type) {
        console.log(req.query.type)
        for (let i = 0; i < matchingShoes.length; i++) {
            if(req.query.type === matchingShoes[i].type) {
                console.log('matches')
            } else {
                matchingShoes.splice(i, 1)
                i--
            }
        }
    
        console.log(matchingShoes)
    } else {
        console.log('no type')
    }
    res.send(matchingShoes)
})
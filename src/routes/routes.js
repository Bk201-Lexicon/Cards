'use strict'

const server=require('../server')

const bcrypt = require('bcrypt');
const {usersCollection}=require('../models/index')
const {cardsCollection}=require('../models/index')


const bearer = require('./middleware/bearer.middleware');
const basic = require('./middleware/basic.middleware');
const acl = require('./middleware/acl.middleware');




// auth routes

server.post('/sign-up',signUpHandeler)
server.post('/signin', basic, signInHandeler)


// CRUD routes 

server.post('/cards', bearer, acl('create'), createCardHandeler) 
server.get('/cards/:id', bearer, readCardHandeler )
server.put('/cards/:id', bearer, acl('update'), updateCardHandeler)
server.delete('/cards/:id', bearer, acl('delete'), deleteCardHandeler)



// Handelerss

async function signUpHandeler(req,res) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 5); 
        const record = await usersCollection.create(req.body);
        res.status(201).json(record);
      } catch (error) {
        res.status(403).send("Error occurred");
      }
    
}
/////////////////////////////////////////

async function signInHandeler(req,res) {

    res.status(200).json(req.user);
    
}
///////////////////////////////////////

async function readCardHandeler(req, res) {

    try {
        
    let id =req.params.id;
    let readCard= await cardsCollection.read(id)
   res.status(200).json(readCard)
        
    } catch (error) {
        console.log(error.messege);
        
    }
}
///////////////////////////////////////
async function createCardHandeler(req,res) {
    try {
        let id =req.params.id
        let newCard= await cardsCollection.create(id)
        res.status(201).json(newCard)
        
    } catch (error) {
        console.log(error.messege);
        
    }
   
}
//////////////////////////////////////////

async function updateCardHandeler(req,res) {
try {
    let id =req.params.id;
    let updatedCard=await cardsCollection.update(id)
    res.status(200).json(updatedCard)
    
} catch (error) {
    console.log(error.messege);
    
}
}

//////////////////////////////
async function deleteCardHandeler(req,res) {
    try {
        let id =req.params.id;
        let deletedCard=await cardsCollection.delete(id)
        res.status(203).json(deletedCard)
        
    } catch (error) {
        console.log(error.messege);
        
    }
    
}

    
  module.exports = server;







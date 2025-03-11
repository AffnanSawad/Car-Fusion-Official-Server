const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.port || 5000

app.use(express.json())
app.use(cors())

require('dotenv').config





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://Car-Fusion-Ltd:Abc123456@atlascluster.5qhzsjb.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

   
    // Database Collections :
    
    const database = client.db("Car-Fusion");
    const carsCollections = database.collection("carsCollections");

    // Dashoboard Carts

    const myCartCollection = client.db("Car-Fusion").collection('myCarts')



 

    //  CRUD OPERATIONS :

    app.get('/CarsCollections' , async(req,res)=>{
    
        const curson = carsCollections.find()
        const result = await curson.toArray()

        res.send(result);

    })


    // DashBoard Carts
    app.post('/myCarts' ,async(req,res)=>{
       
      const user = req.body ;

      const result = await myCartCollection.insertOne(user) 

      res.send(result);

    })

    app.get( '/myCarts' , async(req,res)=>{
     
      // email filtering and get data as the email
      const email = req.query.email;
      
      const query = {email : email}
      
      const result = await myCartCollection.find(query).toArray();
  
      res.send(result);
  
    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







app.get('/',(req,res)=>{
    res.send('Server Is Running ')
})

app.listen(port , ()=>{

    console.log(`Suerver is running for Car Fusion Ltd on ${port}`)
})
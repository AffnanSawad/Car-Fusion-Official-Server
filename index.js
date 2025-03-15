const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000

// jwt
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

require('dotenv').config();

// stripe.payment related
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// Middlewares : 
app.use(express.json())
app.use(cors())
app.use(cookieParser())







const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@atlascluster.5qhzsjb.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



//  JWT MIDDLEWARES :

const logger = (req,res,next)=>{
  console.log('log-info', req.method , req.url);

  next();
}

const verifyToken = (req,res,next)=> {

  const token = req?.cookies?.token ;

  if(!token){

    return res.status(401).send({message:'Unauthorized Access'})
  }
  jwt.verify(token, process.env.ACCESS_TOKEN,

    (err,decoded)=>{
      if(err){
        return res.status(401).send({message:'Unauthorized Access'})
      }
      req.user = decoded;
      next()
    }
  )
}

//  JWT MIDDLEWARE ENDS 



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

   
    // Database Collections :
    
    const database = client.db("Car-Fusion");
    const carsCollections = database.collection("carsCollections");

    // Dashoboard Carts

    const myCartCollection = client.db("Car-Fusion").collection('myCarts')

   
    //  reviewForm

    const submitReviewForm = client.db("Car-Fusion").collection('myreview')
    
    // payment
    const paymentCollection = client.db("Car-Fusion").collection('payments');

    // user selling car :

    const userSellingCar = client.db('Car-Fusion').collection('sellingCars');

    //  DATABASE COLLECTION ENDS HERE : MONGODB ATLAS => BROWSE COLLECTION

   
    // JWT Related API :

    // Token Generating :
    app.post('/jwt', logger,verifyToken, async(req,res)=>{

      const user = req.body ;

      console.log('JWT Token Generating' , user);

      const token = jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn:'1h'})

      res.cookie('token',token,{
        httpOnly: true ,
        secure:true ,
        sameSite:'none' 
      }).send({success: true})
    })

    app.post('/logout', async(req,res)=>{

      const user = req.body ;

      console.log('logout jwt ',user);

      res.clearCookie('token', {maxAge:0}).send({success:true})
    })
  
    //  JWT RELATED API'S ENDING 




    //  CRUD OPERATIONS :

    app.get('/CarsCollections' ,  async(req,res)=>{
    
        const curson = carsCollections.find()
        const result = await curson.toArray()

        res.send(result);

    })


    // DashBoard Carts
    app.post('/myCarts' , async(req,res)=>{
       
      const user = req.body ;

      const result = await myCartCollection.insertOne(user) 

      res.send(result);

    })

    app.get( '/myCarts' ,  async(req,res)=>{
     
      // email filtering and get data as the email
      const email = req.query.email;
      
      const query = {email : email}
      
      const result = await myCartCollection.find(query).toArray();
  
      res.send(result);
  
    })


      //  delete item from my cart
  app.delete( '/myCarts/:id' , async(req,res)=>{
     
    const id = req.params.id;

    const query = { _id : new ObjectId(id)  };

    const result = await myCartCollection.deleteOne(query);

    res.send(result);


  })


    //  Review : 

    app.post('/myreview' , async(req,res)=>{

      const user = req.body ;

      const result = await submitReviewForm.insertOne(user)

      res.send(result)
    })


    // User Selling Cars :
    app.post('/sellingCars',  async(req,res)=>{

   
      const user = req.body ;

      const result = await userSellingCar.insertOne(user)

      res.send(result)


    })



    // Payments= stripe
     // payment intent
     app.post('/create-payment-intent',  async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      console.log(amount, 'amount inside the intent')

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
      });

      res.send({
        clientSecret: paymentIntent.client_secret
      })
    });



    app.post('/payments',  async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentCollection.insertOne(payment);

      //  carefully delete each item from the cart
      console.log('payment info', payment);
      const query = {
        _id: {
          $in: payment.cartIds.map(id => new ObjectId(id))
        }
      };

      const deleteResult = await myCartCollection.deleteMany(query);

      res.send({ paymentResult, deleteResult });
    })


    // CRUD OPERATIONS ENDING HERE : 







    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
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

    console.log(`Server is running for Car Fusion Ltd on ${port}`)
})
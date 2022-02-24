/*
server.js with MongoDB connection
*/

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

require('dotenv').config({path:'../.env'})



const path = require("path");
const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const { MongoClient } = require('mongodb');
const session = require('express-session')
const jwt = require('jsonwebtoken');
// const { restart } = require('nodemon');
const SECRET = process.env.SECRET
const cors = require('cors')

app.use(cors())

const uri = "mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PW+"@cluster0.a0dor.gcp.mongodb.net/meeto?retryWrites=true&w=majority";
const client = new MongoClient(uri)
const database = client.db("meeto")
const usersdb = database.collection('users')
const meetodb = database.collection('meetos')

app.use(express.static(path.join(__dirname, 'static')));
app.use(cookieParser())

app.use(express.urlencoded({ extended: false }))

app.use(session({ cookie: { maxAge: 60000 }, 
secret: SECRET,
resave: false, 
saveUninitialized: false}));

async function dbtest() {
    try {
        await client.connect()
        const test = await usersdb.findOne({
            email: "w@w"
            })
        return test

    } catch {
        console.log("error")
        return 0
    } finally {
        await client.close()
    }

}

async function getMeetos() {
    try {
        await client.connect()
        const test = await meetodb.find({}).toArray()
        return test

    } catch {
        console.log("error")
        return 0
    } finally {
        await client.close()
    }

}

async function addUser(userObj) {
try {
    await client.connect()
    await usersdb.insertOne(userObj)
    console.log("Added user successfully!")
    return "ee"
} catch {
    console.log("error")
}
finally {
    await client.close()
}
}

async function addPublicMeeto(meetoObj) {
    try {
        await client.connect()
        await meetodb.insertOne(meetoObj)
    } catch {
        console.log("error")
    } finally {
        await client.close()
    }
}






// middleware
app.use((req, res, next) => {

// const user = req.cookies.user ?? {}
const user = req.body.cookie ?? {}

let decoded = false
try {
    decoded = jwt.verify(user, SECRET)
} catch(e) {}

if (decoded) {
    req.user = decoded
    req.loggedIn = true
} else {
    req.loggedIn = false
}

return next()
})

//Find user based on email
async function findOne(emailVar) {

const client = await MongoClient.connect(uri, { useNewUrlParser: true })
    .catch(err => { console.log(err); });

if (!client) {
    return;
}

try {

    const db = client.db("meeto");

    let collection = db.collection('users');

    let query = { email: emailVar }

    let res = await collection.findOne(query);

    console.log(res);

    return res

} catch (err) {

    console.log(err);
} finally {

    client.close();
}
}

async function postMeeto(email, name, post_title, post_content) {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true })
        .catch(err => { console.log(err); });
    
    if (!client) {
        return;
    }
    
    try {
    
        const db = client.db("meeto");
    
        let collection = db.collection('meetos');
    
        var userObj = {
            id: Date.now().toString(),
            name: name,
            email: email,
            post_title: post_title,
            post_content: post_content
            }
            
    
        let res = await collection.insertOne(userObj);

        return res

    
    } catch (err) {
    
        console.log(err);
    } finally {
    
        client.close();
    }
    }

app.get('/timeline', async (req, res) => {
    if (req.loggedIn) {
    console.log("hello")
    await res.render('timeline.ejs', { name: req.user.name })
    return
    }
    
    
await res.render('timeline.ejs', { name: ""})
})


app.get('/express_backend', async (req, res) => { //Line 9
    res.json(await dbtest()); //Line 10
  });

app.get('/api', (req, res) => res.send('Its working!'));


// app.get('/', async (req, res) => {
// if (req.loggedIn) {
    
//     let holder = await req.user
//     console.log(holder)
//     let useName = await `${holder.name}`
//     await res.render('index.ejs', { name: useName })
//     return
// } 
//     console.log("Hello!")
//     await res.render('index.js')

// })

// app.get('/timeline', async (req, res) => {
//   if (req.loggedIn) {
//     await console.log(req.user)
//     let holder = await req.user.name.split(" ")
//     let useName = await `${holder[0]} ${holder[holder.length - 1][0]}`
//     await res.render('timeline.ejs', { name: useName })
//     return
//   }
//     res.render('timeline.ejs', { name: ""})

// })


app.get('/testapi', async function(req, res) {
    //res.json(thing)
    res.json(await dbtest())
})

app.get('/login', (req, res) => {
if (req.loggedIn) {
    res.redirect('/')
    return
}
res.render('login.ejs', { message: req.flash('message')})
})

app.post('/postmeeto', async (req,res) => {
    if (req.loggedIn) {
        const user = await req.body.cookie ?? {}
        let decoded = await jwt.verify(user, SECRET)
        console.log(req.body)
        await postMeeto(decoded.email, decoded.name, req.body.body.post_title, req.body.body.post_content)
    }
})

app.get('/getmeetos', async (req, res) => {
    const meetos = await getMeetos()
    return res.send(meetos)
})

app.post('/checkloggedin', async (req, res) => {
    console.log(req.loggedIn)
    if (await req.loggedIn) return res.send(true)
    return res.send(false)
})

app.post('/login', async (req, res) => {
console.log(req.body)
const email = req.body.email
const password = req.body.password
const user = await findOne(email)
// try {
    
// if (user == null) {
//   return done(null, false, { message: 'No user with that email' })
// }
// console.log("1:" + password)
// console.log("2:" + user.password)
// console.log("3:", user)
console.log(1)
await bcrypt.compare(password, user.password, function(err, res) {
    if (err){
    // handle error
    console.log(err)
    }
    if (res) {
    // Send JWT
    console.log(`Hello ${res}`)
    } else {
    // response is OutgoingMessage object that server response http request
    console.log("password not correct")
    }
})
console.log(2)
const token = jwt.sign({
    name: user.name,
    email: user.email,
    id: user.id,
}, SECRET);
console.log(3)
console.log(res.cookie('user', token, { maxAge: 900000, httpOnly: false }));
console.log(token)
console.log(4)
return res.send({success: true, cookieData: token})
})

app.get('/register', (req, res) => {
res.render('register.ejs', { message: req.flash('message') })
})


app.post('/makemeeto', async (req, res) => {
    var meetoObj = {
        id: Date.now().toString(),
        name: req.body.name,
        comments: [{[req.body.name]: "Welcome to my Meeto!"}]
    }
    await addPublicMeeto(meetoObj)
})


app.post('/register', async (req, res) => {
try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    // make connection
    // const connection = await connectToDB()

    // query here pass connection
    // const results = await addUser(connection, userObj)


    // close
    // connection.close()

    var userObj = {
    id: Date.now().toString(),
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    admin: false
    }
    const catchVal = await addUser(userObj)
    catchVal.split("")
    res.redirect('/login')
} catch(err) {
    console.error(err)
    req.flash('message',"e-mail already in use")
    res.redirect('/register')
}
})

app.post('/logout', async (req, res) => {
res.cookie('user', '{}', { maxAge: 900000, httpOnly: true });
return res.redirect('/')
})

app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
 });
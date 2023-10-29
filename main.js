const admin = require("firebase-admin");
const jwt = require('jsonwebtoken');
const cors = require('cors');
//const cookieParser = require('cookie-parser');
const serviceAccount = require("./titanmap-bc8cf-firebase-adminsdk-lfmn3-741d8df0f9.json");
const express = require('express');
const app = express();
const pass = "1337";
app.use(express.json());
//app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.use(express.static('public'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
// Function to add a user
async function addUser(userData) {
   // check if email exists
   const snapshot = await db.collection("Users")
   .where('email', '==', userData.email)
   .get();
   
 if(!snapshot.empty) {
   // Email already exists
   return 'Email already exists';
 }
  const userRef = db.collection("Users").doc(); // Generates a unique ID
  await userRef.set(userData);
  return 'User added';
}

// Function to add a pin
async function addPin(pinData) {
  const pinRef = db.collection("Pins").doc(); // Generates a unique ID
  await pinRef.set({ ...pinData });
}

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];
    jwt.verify(token, pass, (err, authData) => {
      if (err) {
        res.status(403).send('Forbidden');
      } else {
        req.authData = authData;
        next();
      }
    });
  } else {
    res.status(403).send('Forbidden');
  }
}

async function checkLogin(req, res) {
  const { email, password } = req.body;
  // assume you validate and it's all good
  
  if (await isValidUser(email, password)) {
    /*res.cookie('userEmail', email, {
      maxAge: 1000*60*60*24*7*2, // expires in 2 weeks
      httpOnly: true,
      secure: false, // set to true if you're using HTTPS
      sameSite: 'lax',
      domain: 'localhost',
      signed: false,
    });
    console.log(res.getHeaders())*/
    const token = jwt.sign({ email }, pass, { expiresIn: '2h' });
    res.status(200).json({ token });
    console.log("Logged in as " + email)
  } else {
    res.status(401).send('Invalid credentials.');
  }
}



async function isValidUser(email, password) {
  const snapshot = await db.collection("Users")
  .where('email', '==', email)
  .where('password', '==', password)  // this is not secure, btw
  .get();

  return !snapshot.empty;
}

module.exports = { addUser, addPin, checkLogin };



app.post('/addUser', async (req, res) => {
  try {
    const userData = req.body;
    const result = await addUser(userData);  //function to add a user to Firestore
    if (result === 'Email already exists') {
      res.status(400).send(result);
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(400).send('Could not add user.');
  }
});

app.post('/checkLogin', async (req, res) => {
  try {
    await checkLogin(req, res);  //existing function to check login
  } catch (error) {
    console.log(error);
    res.status(400).send('Could not log in.');
  }
});

app.post('/addPin', verifyToken, async (req, res) => {
  //console.log(req.cookies);
  //const userEmail = req.cookies.userEmail;
  const userEmail = req.authData.email;
  console.log(userEmail)
  if(!userEmail) {
    return res.status(401).send('Not authorized');
  }
  const pinData = { ...req.body, userID: userEmail };
  await addPin(pinData);
  res.status(200).send('Pin added');
});

app.get('/loggedIn', verifyToken, (req, res) => {
  //if (req.cookies && req.cookies.userEmail) {
    res.status(200).send('Logged in');
  /*} else {
    res.status(401).send('Not logged in');
  }*/
});

app.post('/updatePin', verifyToken, async (req, res) => {
  const { pinId, newInfo } = req.body;
  
  // userId taken from the verified token
  const userIdFromToken = req.user.userId; 

  const pinRef = db.collection("Pins").doc(pinId);
  const pinDoc = await pinRef.get();

  if (!pinDoc.exists) {
    return res.status(404).send("Pin not found");
  }

  const pinData = pinDoc.data();
  
  // Make sure the user is the original user
  if (pinData.userId !== userIdFromToken) {
    return res.status(403).send("Not the original user");
  }

  await pinRef.update({
    info: newInfo  // change 'info' to whatever field you're updating
  });

  res.status(200).send("Pin updated");
});

app.get('/getPins', async (req, res) => {
  const snapshot = await db.collection('Pins').get();
  const pins = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    pins.push({ lat: data.lat, lng: data.lng, info: data.info, userID: data.userID });
  });
  res.status(200).send(pins);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
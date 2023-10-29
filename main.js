const admin = require("firebase-admin");
const cors = require('cors');
const serviceAccount = require("./titanmap-bc8cf-firebase-adminsdk-lfmn3-741d8df0f9.json");
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());

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
  await pinRef.set({
    ...pinData,
    userRef: db.collection("Users").doc(pinData.userId)  // Reference to user who submitted the pin
  });
}

// Exporting functions so they can be used in other files


async function checkLogin(email, password) {
  const snapshot = await db.collection('Users')
    .where('email', '==', email)
    .where('password', '==', password)
    .get();

  if (snapshot.empty) {
    console.log('No matching documents.');
    return false;
  }
  console.log('Found User');
  return true;
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const admin = require("firebase-admin");
const serviceAccount = require("./titanmap-bc8cf-firebase-adminsdk-lfmn3-741d8df0f9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
// Function to add a user
async function addUser(userData) {
  const userRef = db.collection("Users").doc(); // Generates a unique ID
  await userRef.set(userData);
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
module.exports = { addUser, addPin };

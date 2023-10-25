const { addUser, addPin } = require('./main');

// Test code to add a user
const testUserData = {
  email: "test@example.com",
  firstName: "Test",
  lastName: "User",
  password: "test_password",
  major: "Test Major"
};

addUser(testUserData).catch(console.error);

// Test code to add a pin
const testPinData = {
  coordinates: "123,456",
  time: "2023-10-23T18:25:43.511Z",
  name: "Test Pin",
  description: "This is a test pin",
  userId: "some-unique-id-for-user"
};

addPin(testPinData).catch(console.error);
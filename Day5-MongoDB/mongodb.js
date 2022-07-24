const mongoose = require('mongoose');


const dbURL = `mongodb+srv://rajkumar:Password_123@cluster0.zqisc.azure.mongodb.net/test`

mongoose.connect(dbURL).then(() => {
  console.log('Connected to MongoDB');


}).catch((err) => {
  console.log('Error:', err.message);
}
);

// Data Structure
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String
})

// Helper function that helps us to do CRUD
const User = mongoose.model('User', userSchema);

function addUser(name, age, address) {
  const user = new User({
    name,
    age,
    address
  });
  user.save().then(() => {
    console.log('User saved');
  }).catch((err) => {
    console.log('Error:', err.message);
  }
  );
}

// addUser('Raj', 23, "Baneshwor");

// function getUsers() {
//   User.find().then((users) => {
//     console.log(users);
//   }).catch((err) => {
//     console.log('Error:', err.message);
//   }
//   );
// }

// // getUsers();


// function updateUser(name, age) {
//   User.findOneAndUpdate({
//     name
//   }, {
//     age
//   }).then(() => {
//     console.log('User updated');
//   }).catch((err) => {
//     console.log('Error:', err.message);
//   }
//   );

// }

// updateUser('Raj', 20);

User.deleteMany({
  name: 'Raj'
}).then(() => {
  console.log('User deleted');
}
).catch((err) => {
  console.log('Error:', err.message);
}
);


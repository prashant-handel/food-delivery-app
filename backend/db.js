const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://foodeee:foodeee_password@cluster0.shmsdun.mongodb.net/foodeee?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to the database ");
    })
    .catch((err) => {
      console.error(`Error connecting to the database. n${err}`);
    });

  const fetchedData = await mongoose.connection.db.collection("food-item");
  const data = await fetchedData.find({}).toArray();
  global.foodItem = data;

  const foodCategory = await mongoose.connection.db.collection("food-category");
  const catData = await foodCategory.find({}).toArray();
  global.foodCategory = catData;
};

module.exports = connectDB;

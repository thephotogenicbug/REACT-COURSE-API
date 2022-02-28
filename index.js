const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database");
const FoodModel = require("./models/Food");
const UserFormModel = require("./models/UserForm");

app.use(express.json());
app.use(cors());

dotenv.config({ path: "config.env" });

connectDB();
// Post Food
app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;
  const food = new FoodModel({
    foodName: foodName,
    daysSinceIAte: days,
  });
  try {
    await food.save();
    res.send("Food Inserted");
  } catch (err) {
    console.log(err);
  }
});
// Get Food
app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

// Update Food
app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;

  try {
    await FoodModel.findById(id, (err, updatedFood) => {
      updatedFood.foodName = newFoodName;
      updatedFood.save();
      res.send("updated");
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete Food
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await FoodModel.findByIdAndRemove(id).exec();
  res.send("Deleted");
});
// Post UserForm
app.post("/v1/newuser", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  const userform = new UserFormModel({
    name: name,
    email: email,
    message: message,
  });
  try {
    await userform.save();

    res.status(201).json({
      success: true,
      userform,
      message: "User Saved Successfully..!",
    });
  } catch (err) {
    console.log(err);
  }
});

// Get UserForm
app.get("/v1/readuser", (req, res) => {
  UserFormModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

// Delete UserForm
// app.delete("/v1/deleteuser/:id", async (req, res) => {
//   const id = req.params.id;
//   await UserFormModel.findByIdAndRemove(id).exec();
//   res.status(200).json({
//     success: true,
//     message: "User Deleted Successfully...!",
//   });
// });

// Delete UserForm
app.delete("/v1/deleteuser/:id", async (req, res) => {
  const id = req.params.id;
  const user = await UserFormModel.findByIdAndRemove(id).exec();

  res.status(200).json({
    user,
    success: true,
    message: "User Deleted Successfully...!",
  });
});

// app.delete("/v1/deleteuser/:id", async (req, res) => {
//   const id = req.params.id;

//   await UserFormModel.findByIdAndRemove(id).exec();
//   res.send("Deleted");
// });

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

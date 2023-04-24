const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const router = express.Router();

// Define car schema
const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  maker: { type: String, required: true },
  description: { type: String}
}, { timestamps: true });

// Create car model
const Car = mongoose.model('car', carSchema);

// Define controller methods
async function getcars(req, res) {
  try {
    const cars = await Car.find({}).sort({createdAt: -1}); // Sorting in descending order based on creation date
    res.status(200).json(cars);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
}

// Define routes
router.get('/', getcars);

// Add middlewares
app.use(express.json()); // Middleware to parse incoming requests with JSON payloads
app.use(cors()); // Middleware to enable cross-origin resource sharing
app.use((req, res, next) => {
  console.log(req.path, req.method); // Log incoming requests to console
  next();
});

// Use router
app.use('/api/cars', router);

// Connect to database
mongoose.connect("mongodb+srv://dbUserDeep:Bakingit7*@cluster0.gzzew.gcp.mongodb.net/test")
  .then(() => {
    app.listen(5000, () => {
      console.log("Connected to DB Listening on port", process.env.PORT); // Log successful connection to console
    });
  })
  .catch((error) => {
    console.log(error);
  });

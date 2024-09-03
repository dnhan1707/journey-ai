import express from 'express';
import dotenv from 'dotenv';
import placeRoutes from './routes/googleApiService.js';
import mapRoutes from './routes/mapBoxApiService.js';
import geminiRoutes from './routes/geminiApiService.js';
import cors from 'cors';
import Stripe from 'stripe';
import createStripeRoutes from './routes/stripe.js';

dotenv.config();
const allowOrigin = ["https://journey-ai-rs19.vercel.app", "https://www.journey-ai.dev"]
const app = express();
// Enable CORS for all origins
app.use(cors(
  {
    origin: allowOrigin,
    methods: ["POST", "GET"],
    credentials: true
  }
));

// app.use(cors())
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const stripeRotues = createStripeRoutes(stripe);

app.use('/api/place', placeRoutes);
app.use('/api/mapbox', mapRoutes);
app.use('/api/gemini', geminiRoutes);
app.use(stripeRotues);

const PORT = process.env.PORT || 3001;

app.get('/api/saved_plan/:userId', async (req, res) => {
  const userId = req.params.userId;
  const userIdInt = parseInt(userId);

  if (userIdInt === data.id) {
    res.json(data);
    console.log(data);
  } else {
    console.log("Not found");
    res.status(404).send('User Not Found'); // Adjusted to 404
  }
});

app.post('/api/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log("LOGIN get triggered");
  if (username === 'jack' && password === "jack"){
    res.json(data);
  } else {
    console.log("wrong pass or username");
  }
});


app.get('/api/saved_plan/:userId/:planId', async (req, res) => {
  const userId = req.params.userId;
  const planId = req.params.planId;

  // Assuming data.saved_plan contains your saved plans
  const saved_plans = data.saved_plan;

  // Convert userId and planId to integers if they are stored as integers
  const userIdInt = parseInt(userId);
  const planIdInt = parseInt(planId);

  // Replace this check with actual logic to validate userId and planId
  if(userIdInt === 1) { // Example check, replace with actual validation
    const plan = saved_plans.find(p => p.plan_id === planIdInt);
    
    if (plan) {
      res.json(plan);
    } else {
      res.status(404).json({ message: 'Plan not found' });
    }
  } else {
    res.status(400).json({ message: 'Invalid userId or planId' });
  }
});

app.get("/", (req, res) => {
  res.send(`Server listening on Port: ${PORT}`);
})

app.listen(PORT, () => {
  console.log(`Server listening on Port: ${PORT}`);
});

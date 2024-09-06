import express from 'express';
import dotenv from 'dotenv';
import placeRoutes from './routes/googleApiService.js';
import mapRoutes from './routes/mapBoxApiService.js';
import geminiRoutes from './routes/geminiApiService.js';
import cors from 'cors';
import Stripe from 'stripe';
import createStripeRoutes from './routes/stripe.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
// Enable CORS for all origins
// app.use(cors({
//   origin: 'https://www.journey-ai.dev', // Allow only this origin
//   methods: ["POST", "GET"],             // Allow only these methods
//   credentials: true                     // Allow credentials
// }));

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const stripeRotues = createStripeRoutes(stripe);

app.use(cors())
app.use(express.json());

app.use('/api/place', placeRoutes);
app.use('/api/mapbox', mapRoutes);
app.use('/api/gemini', geminiRoutes);
app.use(stripeRotues);


app.get("/", (req, res) => {
  res.send(`Server listening on Port: ${PORT}`);
})

app.listen(PORT, () => {
  console.log(`Server listening on Port: ${PORT}`);
});

import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';


dotenv.config();

const router = express.Router();

const GG_PLACE_KEY = process.env.GG_PLACE_KEY;

if (!GG_PLACE_KEY){
    console.error("Google API key not defined");
}


router.post("/place_detail", async (req, res) => {
    try {
        const {place_id} = req.body;
        console.log("Place ID: ", place_id);
        const fields = ["formatted_address", "formatted_phone_number", "international_phone_number", "opening_hours", "url", "website", "rating", "reviews"];
        const fieldsParams = fields.join(",");
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?fields=${fieldsParams}&place_id=${place_id}&key=${GG_PLACE_KEY}`);
        // console.log("------------->GG PLACE Detail RESPONSE:   ", response.data);

        res.json({place_detail: response.data});
        console.log("PLACE DETAIL API got triggered");

    } catch (error) {
        console.error('Error fetching data from Google Place Detail API:', error);
        res.status(500).json({ error: 'Failed to fetch data from Google Place Detail API' });
    }
})


router.post("/photo_search", async (req, res) => {
    try {
        const { photoRef } = req.body; // Destructure the photo reference from the request body
        const max_h = 175;
        const max_w = 175;
        const key = GG_PLACE_KEY;

        const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${max_w}&maxheight=${max_h}&photo_reference=${photoRef}&key=${key}`;
        
        // No need to make an additional request with axios; simply return the URL
        res.json({ photoUrl: url });
        console.log("PHOTO SEARCH API got triggered");

    } catch (error) {
        console.error('Error fetching data from Google Photo API:', error);
        res.status(500).json({ error: 'Failed to fetch data from Google Photo API' });
    }
});



router.post("/place_search", async (req, res) => {
    try {
        const {location} = req.body;

        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${location}&key=${GG_PLACE_KEY}`)

        res.json(response.data);
        console.log("PLACE SEARCH API got triggered");

    } catch (error) {
        console.error('Error fetching data from Google Places API:', error);
        res.status(500).json({ error: 'Failed to fetch data from Google Places API' });
    }
});


export default router;

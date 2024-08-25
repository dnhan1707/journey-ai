import express from "express";
import dotenv from 'dotenv';

const router = express.Router()

dotenv.config();

const MAP_BOX_API_KEY = process.env.MAP_BOX_KEY

if(!MAP_BOX_API_KEY){
    console.log("Not found MAP_BOX_API_KEY");
}

router.post("/map", async (req, res) => {
    try {
        const { location } = req.body;
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${MAP_BOX_API_KEY}`;

        const response = await fetch(url); //get url

        if (!response.ok) {
            throw new Error('Failed to fetch coordinates');
        }

        const data = await response.json(); //parse

        if (data.features.length > 0) {
            const coordinates = data.features[0].center;
            res.json({
                center: coordinates,
                zoom: 10 // Example zoom level
            });
        } else {
            res.status(400).json({error: "No coordinates found"});
        }

        console.log("MAP BOX API got triggered");


    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
});


export default router;

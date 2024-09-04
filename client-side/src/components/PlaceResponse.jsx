async function placeDetail(placeId) {
    const fetchDetail = async () => {
        try {
            const response = await fetch("https://journey-ai-olive.vercel.app/api/place/place_detail", {
                mode: 'no-cors',
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ place_id: placeId })
            });

            const result = await response.json();
            // console.log("placeDetail get called");
            return result.place_detail.result; // Ensure it returns the 'result' key
        } catch (error) {
            console.error("Error from place detail()", error);
            throw error;
        }
    };
    return await fetchDetail();
}

async function placeSearch(location){
    const fetchPlaceDetail = async() => {
        try {
            const response = await fetch("https://journey-ai-olive.vercel.app/api/place/place_search", {
                mode: 'no-cors',
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({location: location})
            })
            // console.log("placeSearch get called");

            const result = await response.json();
            const fullData = result.results[0];
            // console.log(result)
            //Your fullData look like this
            // {
            //     business_status: 'OPERATIONAL',
            //     formatted_address: '24690 Washington Ave, Murrieta, CA 92562, United States',
            //     geometry: [Object],
            //     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
            //     icon_background_color: '#FF9E67',
            //     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
            //     name: 'The Mill Restaurant',
            //     opening_hours: [Object],
            //     photos: [Array],
            //     place_id: 'ChIJDU2qC0qC3IARAujApc97pTU',
            //     plus_code: [Object],
            //     price_level: 2,
            //     rating: 4.6,
            //     reference: 'ChIJDU2qC0qC3IARAujApc97pTU',
            //     types: [Array],
            //     user_ratings_total: 1095
            //   }

            const data = {
                place_name : fullData.name,
                place_id: fullData.place_id,
                price_level: fullData.price_level,
                rating: fullData.rating,
                photo_reference: fullData.photos[0].photo_reference,
                lat: fullData.geometry.location.lat,
                lng: fullData.geometry.location.lng
    
            }


            return data;

        } catch (error) {
            console.error("Error from placeSearch(), ", error);
        }
    }

    return await fetchPlaceDetail();
}


//This function return photo URL for <img> tag
async function placePhoto(location){
    const place_detail = await placeSearch(location);
    const photo_ref = place_detail.photo_reference;
    const fetchPhtoData = async () => {
        try {
            const response = await fetch("https://journey-ai-olive.vercel.app/api/place/photo_search", {
                mode: 'no-cors',
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({photoRef: photo_ref})
            })
            // console.log("placePhto get called");

            const result = await response.json();
            return result.photoUrl;

        } catch (error) {
            console.error("Error from placePhoto(), ", error);
        }
    };
    return fetchPhtoData();
}

//This function return photo URL for <img> tag
async function placePhotoWithRef(photo_ref){
    const fetchPhotoData = async () => {
        try {
            const response = await fetch("https://journey-ai-olive.vercel.app/api/place/photo_search", {
                mode: 'no-cors',
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({photoRef: photo_ref})
            })

            // console.log("placePhotoWithRef get called");
            const result = await response.json();
            return result.photoUrl;

        } catch (error) {
            console.error("Error from placePhoto(), ", error);
        }
    };
    return await fetchPhotoData();
}


export {placeDetail, placeSearch, placePhoto, placePhotoWithRef};
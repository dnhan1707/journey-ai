const port = 5000;

async function placeDetail(placeId) {
    const fetchDetail = async () => {
        try {
            const response = await fetch(`https://journey-ai-olive.vercel.app/api/place/place_detail`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ place_id: placeId })
            });

            const result = await response.json();
            if (!result || !result.place_detail || !result.place_detail.result) {
                throw new Error('No place details found');
            }
            return result.place_detail.result; // Ensure it returns the 'result' key
        } catch (error) {
            console.error("Error from placeDetail()", error);
            return null;
        }
    };
    return await fetchDetail();
}

async function placeSearch(location) {
    const fetchPlaceDetail = async () => {
        try {
            const response = await fetch(`https://journey-ai-olive.vercel.app/api/place/place_search`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ location: location })
            });

            const result = await response.json();
            if (!result || !result.results || result.results.length === 0) {
                throw new Error('No place found');
                return "Not Found"
            }

            const fullData = result.results[0];
            const data = {
                place_name: fullData.name,
                place_id: fullData.place_id,
                price_level: fullData.price_level,
                rating: fullData.rating,
                photo_reference: fullData.photos ? fullData.photos[0].photo_reference : null,
                lat: fullData.geometry.location.lat,
                lng: fullData.geometry.location.lng
            };

            return data;
        } catch (error) {
            console.error("Error from placeSearch()", error);
            return null;
        }
    };

    return await fetchPlaceDetail();
}

// This function returns photo URL for <img> tag
async function placePhoto(location) {
    const place_detail = await placeSearch(location);
    if (!place_detail || !place_detail.photo_reference) {
        return null;
    }
    const photo_ref = place_detail.photo_reference;
    const fetchPhotoData = async () => {
        try {
            const response = await fetch(`https://journey-ai-olive.vercel.app/api/place/photo_search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ photoRef: photo_ref })
            });

            const result = await response.json();
            return result.photoUrl;
        } catch (error) {
            console.error("Error from placePhoto()", error);
            return null;
        }
    };
    return await fetchPhotoData();
}

// This function returns photo URL for <img> tag
async function placePhotoWithRef(photo_ref) {
    if (!photo_ref) {
        return null;
    }
    const fetchPhotoData = async () => {
        try {
            const response = await fetch(`https://journey-ai-olive.vercel.app/api/place/photo_search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ photoRef: photo_ref })
            });

            const result = await response.json();
            return result.photoUrl;
        } catch (error) {
            console.error("Error from placePhotoWithRef()", error);
            return null;
        }
    };
    return await fetchPhotoData();
}

export { placeDetail, placeSearch, placePhoto, placePhotoWithRef };

export const createPaymentIntent = async (amount) => {
    const response = await fetch("https://journey-ai-product-version-server.vercel.app/api/create-payment-intent", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: amount
        })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch payment intent client secret');
      }
    const data = await response.json();
    return data.paymentIntent;
}

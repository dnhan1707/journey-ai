import { Card, Fade, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCreatePaymentIntent } from "../stripe/useCreatePaymentIntent";
import DonationInput from "./DonationInput";
import StripeForm from "./StripeForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);


export default function DonationForm() {
    const [amount, setAmount] = useState(10);
    const [paymentIntent, setPaymentIntent] = useState(null);
    const [confirmedPayment, setConfirmedPayment] = useState(null);
    const { mutate, isLoading, data, error } = useCreatePaymentIntent();

    const handleChange = (e) => {
        setAmount(e.target.value);
    }
    const handleSubmit = () => (mutate(amount));

    const handleClear = () => {
        setPaymentIntent(null);
    }
    const handleConfirmPayment = async (payment) => {
        setConfirmedPayment(payment);
        handleClear();
        await setTimeout(() => {
            setConfirmedPayment(null);
        }, 5000);
    }
    useEffect(() => {
        if(data) setPaymentIntent(data);
    }, [data]);

    return (
        <Card>
            <Fade in={!paymentIntent && !confirmedPayment} unmountOnExit>
                <Container>
                    <DonationInput
                        amount={amount}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                        data={data}
                        error={error}
                    ></DonationInput>
                </Container>
            </Fade>

            <Fade in={!!paymentIntent && !confirmedPayment} unmountOnExit>
                <Container>
                    <Elements stripe={stripePromise} options={{clientSecret:paymentIntent?.client_secret}}>
                        <StripeForm client_secret={paymentIntent?.client_secret} amount={paymentIntent?.amount} handleClear={handleClear} handleConfirmPayment={handleConfirmPayment}/>
                    </Elements>
                </Container>
            </Fade>

            <Fade in={!!confirmedPayment} unmountOnExit>
                <Typography p={4} variant="h6" textAlign={'center'}>Your generosity goes a long way!</Typography>
            </Fade>
        </Card>
    )
}
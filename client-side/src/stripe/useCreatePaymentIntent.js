import { useMutation } from "react-query";
import { createPaymentIntent } from "./createPaymentIntent";


export const useCreatePaymentIntent = () => {
    const mutation = useMutation(createPaymentIntent);
    return mutation;
}

import { useMutation } from 'react-query';
import capturePayment from './capturePayment';

export const useSubmitPayment = (elements, stripe, amount) => {
  const mutation = useMutation(() => capturePayment(elements, stripe, amount));
  return mutation;
};
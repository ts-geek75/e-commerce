export type CheckoutFormData = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export interface CheckoutFormProps {
  initialData: CheckoutFormData;
  cartItems?: any[];
}

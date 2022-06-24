import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51LBBdXEiObg0HtV465DhvQFZnoOgFC8dxwimLtV7NTwwhMqfAzWVHISLvIH520OSpL80LbQ8WYR5qTYbMqABzEW500xRlzLeix";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}

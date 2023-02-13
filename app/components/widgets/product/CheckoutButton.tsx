import { isNull } from "lodash";
import { FC } from "react";
import { loadStripe, Stripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import { suppressText } from "@/constants/*";
let stripePromise: Promise<Stripe | null> = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY ?? ``);

type Props = {
    children: string,
    className: string
}
const CheckoutButton:FC<Props> = ({children, className}) => {
    const { cart: { items } } = useAppSelector((state) => state);
    const session = useSession();
    const createCheckoutSession = async () => {
        const stripe = await stripePromise;
        const checkoutSession = await axios.post("/api/create-checkout-session", {
            items: items, email: session.data?.user?.email
        });
        console.log({checkoutSession})
        const result = await stripe?.redirectToCheckout({
            sessionId: checkoutSession.data.id
        });
        if(result?.error) {
            alert(result.error.message)
        }
    }
    return (
        <button
            disabled={isNull(session.data)}
            onClick={() => createCheckoutSession()}
            role="link"
            className={className}
            suppressHydrationWarning={suppressText}
        >
            {children}
        </button>
    )
}

export default CheckoutButton;
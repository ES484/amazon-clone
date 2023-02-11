import { map } from "lodash";

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;
  const transformedItems = map(items, (item) => ({
    quantity: item.quantity,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        description: item.description,
        images: [item.image]
      }
    }
  }));
  const session = await stripe.checkout.sessions.create({
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/order/status/success`,
    cancel_url: `${process.env.HOST}/order/status/failure`,
    metadata: {
      email,
      images: JSON.stringify(items?.map(item => item.image))
    }
  });
  res.status(200).json({ id: session.id });
};
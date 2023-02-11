import { buffer } from 'micro';
import * as admin from 'firebase-admin';

var serviceAccount = require("../../permissions.json");
const app = !admin.apps.length ?  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  }): admin.app();

// Establish connection to stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
const fullFilledOrder = async (session) => {
    return app
        .firestore()
        .collection("users")
        .doc(session.metadata.email)
        .collection("orders")
        .doc(session.id).set({
            amount: session.amount_total / 100,
            // amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log(`SUCCESS Order ${session.id} added to DB`);
        })
}
export default async (req, res) => {
    if(req.method === "POST") {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig_header = req.headers['stripe-signature'];
        let event;

        // Verify that event came from stripe
        try{
            event = stripe.webhooks.constructEvent(
                payload, sig_header, endpointSecret
            )
        }
        catch(error) {
            res.status(400).send(`Webhook error: ${error.message}`)
        }
     // Handle the checkout completed event 
     if(event.type === "checkout.session.completed") {
        const session = event.data.object;
        console.log({session})
        return fullFilledOrder(session)
            .then((res) => res.status(200))
            .catch((err) => res.status(400).send(`Webhook error ${err.message}`));
     }
    }
}
export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}
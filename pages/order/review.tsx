import MainLayout from '@/layouts/MainLayout'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { wrapper } from '@/redux/store';
import db from './../../firebase';
import { map } from 'lodash';
import moment from 'moment';
import Order from '@/components/widgets/product/Order';

const ReviewOrder: NextPage<any> = ({ orders }) => {
  const { t } = useTranslation();
  const session = useSession();
  console.log({orders, session})
  return (
    <MainLayout>
      <div className="bg-white p-10">
        <h2 className="border-b-2 border-amazon_blue-light pb-3 capitalize text-xl font-semibold">{t('your_orders')}</h2>
        {session.data ? (
          <div>
            <h2>{orders.length} {t('orders')}</h2>
            {map(orders, (order) => <Order key={order.id} order={order} />)}
          </div>
        ): (
          <h2>{t('please_sign_in_to_check_your_orders')}</h2>
        )}
      </div>
    </MainLayout>
  )
}

export default ReviewOrder;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context):Promise<any> => {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const session = await getSession(context);
    if(!session) {
      return {
        props: {
          notFound: true,
        }
      }
    }
    const stripeOrders = await db.collection("users")
    .doc(session?.user?.email ?? ``)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();
    const orders = await Promise.all(
      map(stripeOrders.docs, async (order) => ({
        id: order.id,
        images: order.data().images,
        amount: order?.data()?.amount ?? 0,
        // name: order.data().name,
        timestamp: moment(order.data().timestamp.toDate()).unix(),
        items: (
          await stripe.checkout.sessions.listLineItems(order.id, {
            limit: 100
          })
        ).data
      }))
    );
    return {
      props: {
        orders
      }
    }
  }
  
);
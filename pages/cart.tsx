import LoadingSpinner from "@/components/LoadingSpinner";
import { baseImgUrl } from "@/constants/*";
import MainLayout from "@/layouts/MainLayout";
import { useAppSelector } from "@/redux/hooks";
import { Product } from "@/types/index";
import { isNull, map } from "lodash";
import { NextPage } from "next";
import Image from "next/image";
import { Suspense, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import CartITem from "@/components/CartItem";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Currency from 'react-currency-formatter';

const Cart: NextPage = (): JSX.Element => {
    const { t } = useTranslation();
    const { cart: { items } } = useAppSelector((state) => state);
    const { cart } = useAppSelector((state) => state);
    const router = useRouter();
    const session = useSession();
    
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <MainLayout>
                <div className="flex">
                    {/* left */}
                    <div className="w-[90%] ps-5">
                        <Image
                            src={`${baseImgUrl}ikj`}
                            alt='cart banner image'
                            width={100}
                            height={100}
                            className="w-full h-40"
                            unoptimized={true} 
                         />
                        <div className="py-5">
                            <div>
                                <h2 className="text-2xl font-semibold">
                                    {items.length === 0 ? t('your_amazon_cart_is_empty') : t('shopping_cart')}
                                </h2>
                                <div className="text-lg">
                                    <span className="text-end block w-full">{t('price')}</span>
                                    {items && map(items, (item: Product) => (
                                        <CartITem key={item.id} item={item} />
                                    )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* right */}
                    <div className="flex flex-col p-5">
                        <div className="text-lg">
                            <h3 className="font-semibold text-xl pe-1">
                                {t('subTotal')} ({items.length} {t('items')})
                            </h3>
                            <Currency
                                quantity= {cart.totalPrice}
                                currency="USD"
                            />
                        </div>
                    <button
                            disabled={isNull(session.data)}
                            className={`${isNull(session.data) && 'bg-slate-400 hover:bg-slate-400 cursor-not-allowed'} submitBtn relative w-auto px-5 mt-5 rounded-md`}>
                                {isNull(session.data) ? t('sign_in_to_checkout') : `${t('proceed_to_checkout')}`}
                        </button>
                    </div>
                </div>
            </MainLayout>
        </Suspense>
    )
}

export default Cart;
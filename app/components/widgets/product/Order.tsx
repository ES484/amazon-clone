import LoadingSpinner from '@/components/LoadingSpinner';
import moment from 'moment';
import { FC, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Currency from 'react-currency-formatter';
import { map } from 'lodash';
import Image from 'next/image';
import { suppressText } from '@/constants/*';

type Props = {
    order: {
        id: string,
        images: [],
        amount: number,
        timestamp: number,
        items: []
    }
}
const Order: FC<Props> = ({ order }) => {
    const { t } = useTranslation();
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <div className="my-5">
                <div className="flex justify-between bg-gray-100 text-gray-500 space-x-5 p-5 rounded-md">
                    <div>
                        <p className="font-bold text-xs" suppressHydrationWarning={suppressText}>
                            {t('order_placed')}
                        </p>
                        <p>{moment.unix(order.timestamp).format("DD MM YYYY")}</p>
                    </div>
                    <div>
                        <p className="font-bold text-xs" suppressHydrationWarning={suppressText}>
                            {t('total')}
                        </p>
                        <Currency
                            quantity={order.amount}
                            currency="USD"
                        />
                    </div>
                    <div>
                        <div>
                            <p className="truncate w-72">{t('order_#')} {order.id}</p>
                        </div>
                        <div 
                            className="text-blue-500 text-end whitespace-nowrap flex-1 text-sm" 
                            suppressHydrationWarning={suppressText}
                        >
                            <p suppressHydrationWarning={suppressText}>
                                {order.items.length} {t('items')}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-10">
                    {map(order.images, (image) => (
                        <Image 
                            key={image} 
                            src={image} 
                            alt={'product_image'} 
                            width={80} 
                            height={30} 
                        />
                    ))}
                </div>
            </div>
        </Suspense>
    )
}

export default Order;
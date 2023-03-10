import { Product } from '@/types/index';
import Image from 'next/image';
import { FC, useId } from 'react';
import { Star } from '@mui/icons-material';
import { ceil, map } from 'lodash';
import Currency from 'react-currency-formatter';
import { useTranslation } from 'react-i18next';
import { suppressText } from '@/constants/*';
import { useAppDispatch } from '@/redux/hooks';
import { addToCart } from '@/redux/slices/cartSlice';
import { motion } from 'framer-motion';

type Props = {
    product: Product
}

const ProductWidget: FC<Props> = ({ product }): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product));
    }
    return (
        <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
        >
            <div className="flex flex-col relative p-8 z-30 bg-white shadow-sm shadow-amazon_blue-light rounded-md mx-5 my-5 space-y-2 cursor-pointer">
                <h2 className="text-end text-gray-500">{product.category}</h2>
                <Image 
                    src={product.image} 
                    width={100} 
                    height={100} 
                    alt='image' 
                    className="w-24 h-16" 
                />
                <h2 className="text-base font-semibold line-clamp-1">{product.title}</h2>
                <div className="flex">
                    {map((Array(ceil(product.rating.rate))), s => <Star key={useId()} className='text-amber-500' />)}
                </div>
                <p className="text-sm line-clamp-3">{product.description}</p>
                <Currency
                    quantity={product.price}
                    currency="USD"
                />
                <div className="flex justify-center py-5">
                    <button className='submitBtn'
                        suppressHydrationWarning={suppressText}  
                        onClick={() => {handleAddToCart(product)}}      
                    >
                        {t('add_to_cart')}
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductWidget;
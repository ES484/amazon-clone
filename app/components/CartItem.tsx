import Image from 'next/image'
import React, { FC, useId } from 'react'
import { Product } from '../types'
import Currency from 'react-currency-formatter';
import { useAppDispatch } from '@/redux/hooks';
import { decrementQuantity, incrementQuantity, removeFromCart } from '@/redux/slices/cartSlice';
import { Star, DeleteRounded } from '@mui/icons-material';
import { ceil, map } from 'lodash';
type Props = {
    item: Product
}
const CheckoutProduct: FC<Props> = ({ item }): JSX.Element => {
    const dispatch = useAppDispatch();
    const handleRemoveFromCart = (id: number) => {
        dispatch(removeFromCart(id))
    }
    const handleCartIncrement = (id: number) => {
        dispatch(incrementQuantity(id))
    }
    const handleCartDecrement = (id: number) => {
        dispatch(decrementQuantity(id))
    }
  return (
    <div key={item.id} className="flex justify-between items-center space-y-12">
        <Image
            src={item.image}
            alt={item.title}
            width={100}
            height={100} 
            className="w-32 h-28"
        />
        <div className="flex items-start w-[75%]">
            <div>
            <div className="w-[80%]">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="line-clamp-3">{item.description}</p>
                <div className="flex">
                    {map((Array(ceil(item.rating.rate))), s => <Star key={useId()} className='text-amber-500' />)}
                </div>
                <div className="flex justify-between items-center py-5">
                <div className="flex space-x-4">
                    <button 
                        className="bg-amazon_blue-light text-white w-12 h-10 rounded-md"
                        onClick={() => handleCartDecrement(item.id)}
                    >
                        -
                    </button>
                    <div 
                        className="bg-amazon_blue-light text-white w-12 h-10 rounded-md flex justify-center items-center">
                        <h4>{item.quantity}</h4>
                    </div>
                    <button  
                        className="bg-amazon_blue-light text-white w-12 h-10 rounded-md"
                        onClick={() => handleCartIncrement(item.id)}
                    >
                        +
                    </button>
                </div>
                <button onClick={() => handleRemoveFromCart(item.id)}>
                    <DeleteRounded className="text-red-700 text-5xl" />
                </button>
            </div>
            </div>
            </div>
            <div className="font-semibold">
                <Currency
                    quantity={item.subTotal ?? 0}
                    currency="USD"
                />
            </div>
        </div>
    </div>
  )
}

export default CheckoutProduct

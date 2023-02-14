import { useAppSelector } from '@/redux/hooks';
import { Product } from '@/types/index';
import { isNull, isUndefined, map, slice } from 'lodash';
import Image from 'next/image';
import { FC } from 'react';
import { baseImgUrl } from '@/constants/*';
import ProductWidget from '@/components/widgets/product/ProductWidget';
import { wrapper } from '@/redux/store';
type Props = {
    productsInfo: Product[]
}
const AllProducts:FC<Props> = ({ productsInfo }) => {
    const { locale: { dir } } = useAppSelector((state) => state);
    return (
        <>
        {!isNull(productsInfo) && !isUndefined(productsInfo) && productsInfo.length !== 0 &&
            <div className="grid grid-flow-row-dense lg:grid-cols-4 z-30 relative -mt-16 sm:grid-cols-2 md:grid-cols-3 grid-cols-1" dir={dir}>
            <>
            {map(slice(productsInfo, 0, 4), (product: Product) => 
            <ProductWidget 
                product={product} 
                key={product.id} 
            />
            )}
            <Image 
                src={`${baseImgUrl}/dyz`} 
                alt={'single banner'} 
                className="md:col-span-full w-[100%] h-[100%]" 
                width={500} 
                height={500} 
                quality={100}
                priority 
                unoptimized={true} 
            />
            <div className="md:col-span-2">
                {map(slice(productsInfo, 4, 5), (product: Product) => 
                <ProductWidget 
                    product={product} 
                    key={product.id} 
                />
                )}
            </div>
            {map(slice(productsInfo, 5, productsInfo.length), (product: Product) => 
            <ProductWidget 
                product={product} 
                key={product.id} 
            />
            )}
        </>
        </div>}
        </>
    )
}


export default AllProducts;
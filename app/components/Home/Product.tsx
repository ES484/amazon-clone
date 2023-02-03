import { Product } from "@/types/index";
import { FC, useState } from "react";
import { isEmpty, map, slice } from 'lodash';
import ProductWidget from "@/widgets/product/ProductWidget";
import { useAppSelector } from "@/redux/hooks";
import { baseImgUrl } from '@/constants/*';
import Image from "next/image";
type Props = {
    products: Product[]
}

const Products: FC<Props> = ({ products }): JSX.Element => {
    const { locale: { dir } } = useAppSelector((state) => state);

    return (
        <div className="grid grid-flow-row-dense lg:grid-cols-4 z-30 relative -mt-16 sm:grid-cols-2 md:grid-cols-3 grid-cols-1" dir={dir}>
            {!isEmpty(products) &&
            <>
                {map(slice(products, 0, 4), (product: Product) => 
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
                    {map(slice(products, 4, 5), (product: Product) => 
                    <ProductWidget 
                        product={product} 
                        key={product.id} 
                    />
                    )}
                </div>
                {map(slice(products, 5, products.length), (product: Product) => 
                <ProductWidget 
                    product={product} 
                    key={product.id} 
                />
                )}
            </>
            }
            
        </div>
    )
}

export default Products;

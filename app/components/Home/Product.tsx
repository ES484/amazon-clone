import { Product, Products } from "@/types/index";
import { FC, Suspense } from "react";
import { isEmpty, isNull, isUndefined, map, slice } from 'lodash';
import ProductWidget from "@/widgets/product/ProductWidget";
import { useAppSelector } from "@/redux/hooks";
import { baseImgUrl } from '@/constants/*';
import Image from "next/image";
import { useGetProductsQuery } from "@/redux/api/productApi";
import LoadingSpinner from "../LoadingSpinner";
type Props = {
    products: Product[]
}

const Products: FC = (): JSX.Element => {
    const { locale: { dir } } = useAppSelector((state) => state);
    const { data: products } = useGetProductsQuery<Products>(null);
    console.log('get products', products)

    return (
        <Suspense fallback={<LoadingSpinner />}>
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
                {(!isNull(products) && 
                !isUndefined(products)) && 
                map(slice(products, 5, products.length), (product: Product) => 
                <ProductWidget 
                    product={product} 
                    key={product.id} 
                />
                )}
            </>
            }
            
        </div>
        </Suspense>
    )
}

export default Products;

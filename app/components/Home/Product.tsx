import { Product, Products } from "@/types/index";
import { FC, Suspense, useEffect, useState } from "react";
import { isEmpty, isNull, isUndefined, map, slice } from 'lodash';
import ProductWidget from "@/widgets/product/ProductWidget";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { baseImgUrl } from '@/constants/*';
import Image from "next/image";
import { useGetProductsQuery } from "@/redux/api/productApi";
import LoadingSpinner from "../LoadingSpinner";
import { setProducts } from "@/redux/slices/productsSlice";
type Props = {
    products?: Product[]
}

const Products: FC = (): JSX.Element => {
    const { locale: { dir }, products: { filteredProducts } } = useAppSelector((state) => state);
    const { data: productsData } = useGetProductsQuery<Products>(null);
    const [productsInfo, setProductsInfo] = useState<Product[]>([]);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(productsData) {
            dispatch(setProducts(productsData));
            setProductsInfo(productsData);
        }
    }, [productsData]);
    useEffect(() => {
        if(filteredProducts !== undefined) {
            setProductsInfo(filteredProducts);
        }
    }, [filteredProducts]);
    console.log({filteredProducts})
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <div className="grid grid-flow-row-dense lg:grid-cols-4 z-30 relative -mt-16 sm:grid-cols-2 md:grid-cols-3 grid-cols-1" dir={dir}>
            {!isEmpty(productsInfo) &&
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
                {(!isNull(productsInfo) && 
                !isUndefined(productsInfo)) && 
                map(slice(productsInfo, 5, productsInfo.length), (product: Product) => 
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

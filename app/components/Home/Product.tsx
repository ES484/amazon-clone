import { Product, Products } from "@/types/index";
import { FC, Suspense, useEffect, useState } from "react";
import React from 'react';
import { isEmpty, isNull, isUndefined, map, size, slice } from 'lodash';
import ProductWidget from "@/widgets/product/ProductWidget";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { baseImgUrl } from '@/constants/*';
import Image from "next/image";
import { useGetProductsQuery } from "@/redux/api/productApi";
import LoadingSpinner from "../LoadingSpinner";
import { setProducts } from "@/redux/slices/productsSlice";
const AllProducts = React.lazy(() => import('./AllProducts'));
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
    }, [productsData?.length]);
    useEffect(() => {
        if(filteredProducts !== undefined) {
            setProductsInfo(filteredProducts);
        }
    }, [filteredProducts]);
    console.log({filteredProducts, productsData})
    return (
        <Suspense fallback={<LoadingSpinner />}>
           <AllProducts productsInfo={productsInfo} />
        </Suspense>
    )
}

export default Products;

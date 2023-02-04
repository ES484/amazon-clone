import Header from '@/components/Home/Header';
import Banner from '@/components/Home/Banner';
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router';
import Products from '@/components/Home/Product';
import { Product } from '@/types/index';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Suspense } from 'react';
import { wrapper } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks';
import { productsApi } from '@/redux/api/productApi';

type Props = {
 products: Product[]
}
const Home: NextPage<Props> = (): JSX.Element => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
    <Header/>
    <Banner />
    <Products />
    </Suspense>
  )
}

export default Home;


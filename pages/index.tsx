import Header from '@/components/Home/Header';
import Banner from '@/components/Home/Banner';
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router';
import Products from '@/components/Home/Product';
import { Product } from '@/types/index';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Suspense, useEffect, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import OffLineWidget from '@/components/widgets/OfflineWidget';
import OfflineImg from '@/appImages/offline.jpg';

type Props = {
 products: Product[]
}
const Home: NextPage<Props> = (): JSX.Element => {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [isOnline]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {isOnline ? (
      <MainLayout>
        <Banner />
        <Products />
      </MainLayout>)
      : (
        <OffLineWidget
        message={`network_is_not_available_please_check_your_internet`}
        img={`${OfflineImg.src}`}
      />
      )
      }
    </Suspense>
  )
}

export default Home;


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
import { useTranslation } from 'react-i18next';
import { wrapper } from '@/redux/store';

type Props = {
 products: Product[],
 url: string
}
const Home: NextPage<Props> = ({ url }): JSX.Element => {
  const [isOnline, setIsOnline] = useState(true);
  const { t } = useTranslation();
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
console.log('HostUrl', url)
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {isOnline ? (
      <MainLayout>
        <Banner />
        <Products />
      </MainLayout>)
      : (
        <OffLineWidget
        message={t('network_is_not_available_please_check_your_internet')}
        img={`${OfflineImg.src}`}
      />
      )
      }
    </Suspense>
  )
}

export default Home;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      if (!req.headers.host) {
        return {
          notFound: true,
        };
      }
      return {
        props: {
          url: req.headers.host,
        },
      };
    }
);


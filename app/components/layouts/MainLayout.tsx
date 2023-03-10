import { FC, ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import i18n from '../../i18n/config';
import moment from 'moment';
import { useRouter } from 'next/router';
import { setLocale } from '@/redux/slices/localeSlice';
import ToastAppContainer from '../ToastAppContainer';
import Header from '@/components/Home/Header';
import { getTotal } from '@/redux/slices/cartSlice';

type Props = {
  children: ReactNode | undefined;
};

const MainLayout: FC<Props> = ({ children }): JSX.Element => {
  const {
    locale,
    cart: { items }
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.locale !== locale.lang) {
      dispatch(setLocale(router.locale));
    }
    if (router.locale !== i18n.language) {
      i18n.changeLanguage(router.locale);
    }
    moment.locale(router.locale);
  }, [router.locale]);

  useEffect(() => {
    dispatch(getTotal());
  }, [items])

  return (
    <div
      dir={router.locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <Header />
      {children}
      <ToastAppContainer />
    </div>
  );
};

export default MainLayout;

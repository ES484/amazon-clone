import MainLayout from '@/layouts/MainLayout'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { NextPage } from 'next';
import CheckoutButton from '@/components/widgets/product/CheckoutButton';
import { suppressText } from '@/constants/*';
import ErrorIcon from '@mui/icons-material/Error';

const Failure: NextPage = () => {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <div className="flex flex-col flex-1 flex-grow h-[80vh] justify-center items-center text-center text-gray-600 text-2xl">
        <div className="space-y-5">
          <ErrorIcon className="text-red-500 text-9xl" />
          <h3 suppressHydrationWarning={suppressText}>
            {t('your_payment_has_been_failed')}
          </h3>
          <p suppressHydrationWarning={suppressText}>
            {t('you_can_retry_the_payment_below_to_continue')}
          </p>
          <CheckoutButton className="border-2 bg-red-500 text-white rounded-full px-10 p-2">
            {t('try_again')}</CheckoutButton>
        </div>
      </div>
    </MainLayout>
  )
}

export default Failure;

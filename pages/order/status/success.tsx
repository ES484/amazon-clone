import MainLayout from '@/layouts/MainLayout'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTranslation } from 'react-i18next';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { appLinks } from '@/constants/*';

const Success: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <MainLayout>
      <div className="bg-white shadow-lg max-w-screen-lg m-auto px-5 py-8 border-2 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center">
            <CheckCircleIcon className="text-green-500" />
            <h2 className="ps-4 font-semibold text-2xl">{t('thank_you_your_order_has_been_confirmed!')}</h2>
          </div>
          <p>{t('thank_you_for_shopping_with_us_we_ll_send_a_confirmation_once_your_order_has_shipped_if_you_would_like_to_check_the_status_of_your_orders_please_press_the_link_below.')}</p>
        </div>
        <button 
          className="bg-amazon_blue text-white rounded-md px-10 py-2 w-full"
          onClick={() => router.push(`${appLinks.review.path}`)}>
          {t('check_your_order')}
        </button>
      </div>
    </MainLayout>
  )
}

export default Success;

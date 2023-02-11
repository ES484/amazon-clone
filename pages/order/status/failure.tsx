import MainLayout from '@/layouts/MainLayout'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { NextPage } from 'next';

const Failure: NextPage = () => {
  const { t } = useTranslation();
  return (
    <MainLayout>
      Failure
    </MainLayout>
  )
}

export default Failure;

import React, { FC, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { isNull } from 'lodash';
import { useAppSelector } from '@/redux/hooks';
import { suppressText } from '@/constants/*';
import OfflineImg from '@/appImages/offline.jpg';
type Props = {
  message: string;
  img?: string;
};
const OffLineWidget: FC<Props> = ({ message, img = null }): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Suspense>
      <div
        className={`flex w-full flex-col justify-center items-center space-y-10 mt-10 px-4`}
      >
        {!isNull(img) ? (
          <Image
            className="rounded-lg shadow-lg"
            alt="offline"
            fill={false}
            width={300}
            height={200}
            src={img}
          />
        ) : (
          <Image
            className="h-90 w-90"
            alt="offline"
            fill={false}
            width={300}
            height={200}
            src={OfflineImg}
          />
        )}
        <p
          className={`text-lg text-center`}
          suppressHydrationWarning={suppressText}
        >
          {message}
        </p>
        <Link
          scroll={true}
          href={'/'}
          className={`text-center text-md capitalize`}
          suppressHydrationWarning={suppressText}
        >
          {t('back_to_home')}
        </Link>
      </div>
    </Suspense>
  );
};

export default OffLineWidget;

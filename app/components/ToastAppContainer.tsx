import React, { Suspense } from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import { useAppSelector } from '@/redux/hooks';
import CloseIcon from '@mui/icons-material/Close';
import LoadingSpinner from './LoadingSpinner';

const ToastAppContainer = () => {
  const {
    locale: { isRTL },
    appSetting: {
      toastMessage: { type },
    },
  } = useAppSelector((state) => state);
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ToastContainer
        position={isRTL ? `top-center` : 'top-center'}
        className={`opacity-90 shadow-lg text-center w-max h-fit`}
        autoClose={1000}
        hideProgressBar={false}
        // newestOnTop={true}
        transition={Flip}
        closeOnClick
        rtl={isRTL}
        pauseOnFocusLoss
        pauseOnHover
        bodyStyle={{ height: 'auto' }}
        toastStyle={{
          backgroundColor: type === `error` ? `red` : `#232F3E`,
          color: `white`,
        }}
        closeButton={
          <div>
            <CloseIcon style={{ color: `white` }} />
          </div>
        }
      />
    </Suspense>
  );
};

export default ToastAppContainer;

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '@/redux/store';
import { FC, Suspense } from 'react';
import { SessionProvider } from 'next-auth/react';

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
      <Suspense>
        <SessionProvider session={pageProps.session}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </SessionProvider>
      </Suspense>
  )
}

export default App;

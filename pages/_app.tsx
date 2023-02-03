import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '@/redux/store';
import { FC, Suspense } from 'react';
import { resolve } from 'node:path/win32';
const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Suspense>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Suspense>
  )
}

export default App;

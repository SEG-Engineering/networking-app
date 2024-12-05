import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: { Component: React.FC; pageProps: any }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;

import { getHomeLayout } from '@/layout/HomeLayout';
import NextHead from 'next/head';
import '@/styles/globals.css';


function Head() {
  return (
    <NextHead>
      <title key="title">Youbike</title>
    </NextHead>
  );
}

export function Youbike({ Component, pageProps }) {
  return (
    <>
      <Head />
      {Component.getLayout ? (
        Component.getLayout(<Component {...pageProps} />)
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

Youbike.getLayout = getHomeLayout;
export default Youbike;

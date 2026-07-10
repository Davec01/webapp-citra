import '../styles/globals.css';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      <Component {...pageProps} />
    </>
  );
}

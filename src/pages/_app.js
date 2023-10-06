import { UserProvider } from '@/context/user-context';
import '@/styles/globals.css';
import Head from '@/components/shared/head';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { WindowSizeProvider } from '@/context/window-size-context';
import { useGoogleAnalytics } from '@/hooks/google-analytics-lib';
import Script from 'next/script';
import { ConfigProvider } from '@/context/config-context';
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  useGoogleAnalytics();
  return (
    <WindowSizeProvider>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){
              if(${process.env.NODE_ENV !== 'production'}) {
                return;
              }
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', '${
              process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID
            }', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <ConfigProvider>
        <UserProvider>
          <Head />
          <Component {...pageProps} />
        </UserProvider>
      </ConfigProvider>
    </WindowSizeProvider>
  );
}

import React from 'react';
import sanity, {SanityContext} from './sanity';

const SanityProvider = SanityContext.Provider;

export default function withSanity(PageComponent) {
  const WithSanity = ({...pageProps}) => {
    return (
      <SanityProvider value={sanity}>
        <PageComponent {...pageProps} />
      </SanityProvider>
    );
  };

  if (PageComponent.getInitialProps) {
    WithSanity.getInitialProps = async context => {
      const pageProps = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(context)
        : {};
      return pageProps;
    };
  }

  return WithSanity;
}

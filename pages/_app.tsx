import React from 'react';

import {AppProps} from 'next/app';

import './app.css';
import './list.css';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return <Component {...pageProps} />
}

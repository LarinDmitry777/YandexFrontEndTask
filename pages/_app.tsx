import React from 'react';

import {AppProps} from 'next/app';

import './app.css';
import './list.css';
import './scene.css';
import './../components/adventureComponent.css';
import './../components/headerComponent.css';
import './../components/loadingAnimation.css';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return <Component {...pageProps} />
}

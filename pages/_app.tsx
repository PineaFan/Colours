import { AppProps } from 'next/app'
import '../styles/globals.css';
import Head from 'next/head';
import { Helmet } from 'react-helmet';


export default function App({ Component, pageProps }: AppProps) {
    return <div className='main'>
        <Helmet htmlAttributes={{ lang: "en" }} />
        <Head>
            <title>Pinea Colours</title>
            <meta name="description" content="Shows a preview of a hex colour, and converts it" />
            <meta httpEquiv="Content-Language" content="en" />
        </Head>
        <Component {...pageProps} />
    </div>
}

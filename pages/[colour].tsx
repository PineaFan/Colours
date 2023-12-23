import { useRouter } from 'next/router';
import Colour from "../components/colour";
import { useEffect } from 'react';

export default function Page({ colour }: { colour: string }) {
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady || colour === undefined) return;
    }, [router.isReady, colour]);

    return <Colour currentColour={colour} />
}

export async function getServerSideProps(context: { query: { colour?: string, color?: string } }) {
    return {
        props: {
            colour: context.query.colour ?? context.query.color ?? "F27878"
        }
    }
}

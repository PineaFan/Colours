import { useRouter } from 'next/router';
import Colour, { validFormats } from "../components/colour";
import rgbDictionary from '../components/rgb.txt';
import { useEffect } from 'react';


export default function Page({ colour }: { colour: string }) {
    const router = useRouter()
    useEffect(() => {
        if (!router.isReady || colour === undefined) return;
    }, [router.isReady, colour]);
    // Check if the colour is in validFormats
    if ((validFormats as string[]).includes(colour)) {
        return <Colour currentColour={"F27878"} primaryFormat={colour as typeof validFormats[0]} />
    }
    return <Colour currentColour={colour} />
}

export async function getServerSideProps(context: { query: { colour?: string, color?: string } }) {
    const colour = context.query.colour ?? context.query.color ?? "F27878";
    if (rgbDictionary[colour.toLowerCase()]) return {
        props: {
            colour: rgbDictionary[colour.toLowerCase()].hex
        }
    }
    return {
        props: {
            colour: colour
        }
    }
}

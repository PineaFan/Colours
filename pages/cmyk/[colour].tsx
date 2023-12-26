import { useRouter } from 'next/router';
import Colour from "../../components/colour";
import { useEffect } from 'react';

export default function Page({ colour }: { colour: string }) {
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady || colour === undefined) return;
    }, [router.isReady, colour]);

    return <Colour currentColour={colour} primaryFormat="cmyk" />
}

const cmykToHex = (cmyk: number[]) => {
    // List of 4 numbers from 0 to 100
    const [c, m, y, k] = cmyk
    const r = Math.round(255 * (1 - c / 100) * (1 - k / 100))
    const g = Math.round(255 * (1 - m / 100) * (1 - k / 100))
    const b = Math.round(255 * (1 - y / 100) * (1 - k / 100))
    return r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0")
}

export async function getServerSideProps(context: { query: { colour?: string, color?: string } }) {
    const colour = context.query.colour ?? context.query.color ?? "0,50.4,50.4,5";
    // Always return a hex colour
    const commaList = colour.split(",")
    if (commaList.length === 4) {
        // It's a CMYK tuple
        const cmyk = commaList.map((value) => Math.min(Math.max(parseFloat(value), 0), 100))
        return {
            props: {
                colour: cmykToHex(cmyk)
            }
        }
    }
    // It's invalid, return a default colour
    return {
        props: {
            colour: "F27878"
        }
    }
}

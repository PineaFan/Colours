import { useRouter } from 'next/router';
import Colour from "../../components/colour";
import { useEffect } from 'react';

export default function Page({ colour }: { colour: string }) {
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady || colour === undefined) return;
    }, [router.isReady, colour]);

    return <Colour currentColour={colour} primaryFormat="rgb" />
}

const rgbToHex = (rgb: number[]) => {
    const r = Math.round(rgb[0])
    const g = Math.round(rgb[1])
    const b = Math.round(rgb[2])
    return r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0")
}

export async function getServerSideProps(context: { query: { colour?: string, color?: string } }) {
    let colour = context.query.colour ?? context.query.color ?? "15890552";
    colour = decodeURIComponent(colour)
    // Colour could be in the format of an RGB int, a rgb tuple "255,255,255", or could be invalid entirely
    // First, check if there are any commas
    const commaList = colour.split(",")
    if (commaList.length === 3) {
        // It's a rgb tuple
        const rgb = commaList.map((value) => Math.min(Math.max(parseInt(value), 0), 255))
        return {
            props: {
                colour: rgbToHex(rgb)
            }
        }
    }
    // It's an RGB int
    // First check it's actually a number
    const rgbInt = parseInt(colour)
    if (isNaN(rgbInt)) {
        // It's not a number, return a default colour
        return { props: { colour: "F27878" } }
    }
    // It is a number, convert it to a hex colour
    const r = (rgbInt >> 16) & 255
    const g = (rgbInt >> 8) & 255
    const b = rgbInt & 255
    return {
        props: {
            colour: rgbToHex([r, g, b])
        }
    }
}

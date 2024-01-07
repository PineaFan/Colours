import { useRouter } from 'next/router';
import Colour from "../../components/colour";
import { useEffect } from 'react';

export default function Page({ colour }: { colour: string }) {
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady || colour === undefined) return;
    }, [router.isReady, colour]);

    return <Colour currentColour={colour} primaryFormat="hsv" />
}

const hsvToHex = (hsv: number[]) => {
    const h = hsv[0] / 60
    const s = hsv[1] / 100
    const v = hsv[2] / 100
    const c = v * s
    const x = c * (1 - Math.abs(h % 2 - 1))
    const m = v - c
    const rgb = h < 1 ? [c, x, 0] : h < 2 ? [x, c, 0] : h < 3 ? [0, c, x] : h < 4 ? [0, x, c] : h < 5 ? [x, 0, c] : [c, 0, x]
    const r = Math.round(255 * (rgb[0] + m))
    const g = Math.round(255 * (rgb[1] + m))
    const b = Math.round(255 * (rgb[2] + m))
    return r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0")

}

export async function getServerSideProps(context: { query: { colour?: string, color?: string } }) {
    let colour = context.query.colour ?? context.query.color ?? "0,50.4,94.9";
    // Undo url encoding on value
    colour = decodeURIComponent(colour)
    // Always return a hex colour
    const commaList = colour.split(",")
    if (commaList.length === 3) {
        // It's a HSV tuple
        const hsv = commaList.map((value) => Math.min(Math.max(parseFloat(value), 0), 100) || 0)
        return {
            props: {
                colour: hsvToHex(hsv)
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

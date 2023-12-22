import { useRouter } from 'next/router';
import Colour from "../components/colour"

export default function Page() {
    let colour = "000000";
    const router = useRouter()
    // Check if the router has loaded or if the user just didn't select a pattern
    if (router.isReady) colour = (router.query.colour ? router.query.colour : "") as string
    return <Colour currentColour={colour} />
}

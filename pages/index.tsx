import Styles from '../styles/about.module.css';
import React from 'react';

// With children
function TypedText({ children, ...props }: { children: string, typeSpeed?: number, delay?: number, showCursor?: boolean, className?: string }) {
    const [text, setText] = React.useState("⠀")
    React.useEffect(() => {
        let timeout: NodeJS.Timeout | null = null
        let i = 0
        const type = () => {
            if (i < children.length) {
                setText(children.substring(0, i + 1))
                i++
                const offset = Math.random() * 20
                timeout = setTimeout(type, (props.typeSpeed || 40) + offset)
            }
        }
        timeout = setTimeout(type, props.delay || 0)
        return () => {
            if (timeout !== null) clearTimeout(timeout)
        }
    }, [])
    return <p className={props.className}>{text}{props.showCursor ? <span className={Styles.blink}>|</span> : null}</p>
}

function Colour({ children, ...props }: { children: string, hex: string }) {
    return <a href={`/${props.hex}`} style={{color: `#${props.hex}`, textShadow: `0px 0px 20px #${props.hex}`}}>[{children} #{props.hex}]</a>
}


export default function Page() {
    return <div className={Styles.container}>
        <TypedText delay={0} className={Styles.white} showCursor={true}>Pinea Colours</TypedText>
        <TypedText delay={500}>A site for viewing and converting colours</TypedText>
        <TypedText delay={1000}>(By a British person, but "color" still works)</TypedText>

        <br />

        <p className={Styles.white}>Usage</p>
        <p><a href="/">/</a> Shows this page</p>
        <p><a href="/72AEF5">/72AEF5</a> Shows a preview of a hex code (if valid). Discord will (and other services may) show a preview in an embed when linked</p>
        <p><a href="/72AEF5-F27878">/72AEF5-F27878</a> Compares 2 hex codes against each other. Embeds will be based on first colour</p>
        <p><a href="/rgb/15890552">/rgb/15890552</a> Opens the colour viewer with a RGB integer</p>
        <p><a href="/rgb/242,120,120">/rgb/242,120,120</a> The same thing, but for comma separated R G and B values</p>
        <p><a href="/hsv/0,50.4,94.9">/hsv/0,50,95</a> Opens the colour viewer with a HSV value</p>
        <p><a href="/cmyk/0,50.4,50.4,5">/cmyk/0,50,50,5</a> Opens the colour viewer with a CMYK value</p>
        <p>On all colour pages, you can click a converted value to copy it to your clipboard</p>

        <br />

        <p className={Styles.white}>About</p>
        <p>This site was made by <a href="https://github.com/PineaFan">PineaFan</a>. Optionally, you can <a className={Styles.optionalLink} href="https://www.buymeacoffee.com/PineaFan">buy me a coffee</a></p>
        <p>The whole site is <a href="https://github.com/PineaFan/colours">open source</a> and made using <a href="https://nextjs.org/">Next.js</a></p>
        <p>It's hosted on <a href="https://vercel.com/">Vercel</a></p>

        <br />

        <p className={Styles.white}>Colour Definitions</p>
        <p>Hex codes</p>
        <p> - 1 Character <i>(#A)</i>: Repeat 6 times <i>(#AAAAA)</i></p>
        <p> - 2 Characters <i>(#AB)</i>: Use for R, G and B <i>(#ABABAB)</i></p>
        <p> - 3 Characters <i>(#ABC)</i>: Use for Repeat each character twice <i>(#AABBCC)</i></p>
        <p> - 4 Characters <i>(#ABCD)</i>: Pad with 0s <i>(#ABCD00)</i></p>
        <p> - 5 Characters <i>(#ABCDE)</i>: Pad with 0s <i>(#ABCDE0)</i></p>
        <p> - 6 Characters <i>(#ABCDEF)</i>: Use as is <i>(#ABCDEF)</i></p>
        <br />
        <p>RGB</p>
        <p> - Integer: A single, non-padded number from 0 to 16777215 <i>(0xFFFFFF)</i></p>
        <p> - Comma separated: 3 comma separated numbers from 0 to 255 <i>(0,255,255)</i></p>
        <br />
        <p>HSV</p>
        <p> - Comma separated: 3 comma separated numbers from 0 to 100 <i>(0,100,100)</i></p>
        <br />
        <p>CMYK</p>
        <p> - Comma separated: 4 comma separated numbers from 0 to 100 <i>(0,100,100,100)</i></p>

        <br />

        <p className={Styles.white}>Packages</p>
        <p><a href="https://www.npmjs.com/package/react-rewards">react-rewards</a> - Confetti effects on copy</p>
        <p><a href="https://www.npmjs.com/package/react-helmet">react-helmet</a> - HTML head management</p>
        <p><a href="https://www.npmjs.com/package/sharp">sharp</a> - Image processing</p>
        <p><a href="https://www.npmjs.com/package/typescript">typescript</a> - TypeScript</p>

        <br />

        <p className={Styles.white}>Colours</p>
        <p>Here's some of the standard colours I (and <a href="https://clicks.codes">Clicks</a>) use:</p>
        <Colour hex="F27878">Red</Colour>
        <Colour hex="E5AB71">Orange</Colour>
        <Colour hex="F2D478">Yellow</Colour>
        <Colour hex="65CC76">Green</Colour>
        <Colour hex="72AFE5">Cyan</Colour>
        <Colour hex="6576CC">Blue</Colour>
        <Colour hex="8D58B2">Purple</Colour>

        <br /><br />

        <p className={Styles.white}>Contact</p>
        <p><a href="https://twitter.com/PineaFan">Twitter</a> @PineaFan</p>
        <p><a href="https://discord.gg/bPaNnxe">Discord</a> @PineaFan</p>
        <p><a href="mailto:support@pinea.dev">Email</a> support@pinea.dev</p>
    </div>
}

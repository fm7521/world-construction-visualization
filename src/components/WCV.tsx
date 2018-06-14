/**
 * The main component to render the world construction visualization (WCV)
 */

import ChatDisplay from "./ChatDisplay";
import WCVStore from "../WCVStore";


export default function WCV({ data }) {
    return (
        <WCVStore data={data}>
            <ChatDisplay />
        </WCVStore>
    )
}

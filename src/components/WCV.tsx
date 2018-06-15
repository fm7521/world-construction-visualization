/**
 * The main component to render the world construction visualization (WCV)
 */

import ChatDisplay from "./ChatDisplay";
import WCVStore from "../WCVStore";

import "./WCV.scss";

export default function WCV({ data }) {
    return (
        <div className="WCV">
            <WCVStore data={data}>
                <div className="left">
                    <ChatDisplay />
                </div>
                <div className="right">
                    <div className="upper">
                    </div>
                    <div className="lower">

                    </div>
                </div>
            </WCVStore>
        </div>
    )
}

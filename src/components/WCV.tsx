/**
 * The main component to render the world construction visualization (WCV)
 */

import ChatDisplay from "./ChatDisplay";
import WCVStore from "../WCVStore";
import DeltaFacts from "./DeltaFacts";
import ErrorGuard from "./ErrorGuard";

import "./WCV.scss";

export default function WCV({ data }) {
    return (
        <div className="WCV">
            <WCVStore data={data}>
                <ErrorGuard>
                    <div className="left">
                        <ChatDisplay />
                    </div>
                    <div className="right">
                        <div className="upper">
                            <DeltaFacts />
                        </div>
                    </div>
                </ErrorGuard>
            </WCVStore>
        </div>
    )
}

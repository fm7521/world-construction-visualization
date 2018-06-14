import { WCVContextConsumer } from "../WCVStore";
import { AssetContextConsumer } from "../Assets";

import "./Utterance.scss";

/**
 * Display information about a single utterance and allow a user to hover over it or open it to display more information
 */

export default function Utterance({ index }: { index: number }) {
    return (
        <AssetContextConsumer>
            {({ getPlayerAvatar }) => (
                <WCVContextConsumer>
                    {
                        ({
                            selectUtteranceRange,
                            setHoverUtterance,
                            unsetHoverUtterance,
                            setOpenUtterance,
                            openUtterance,
                            utteranceIsSelected,
                            selectFact,
                            unselectFact,
                            proofSelected,
                            factIsSelected,
                            data: {
                                [index]: {
                                    player,
                                    utterance,
                                    facts,
                                }
                            }
                        }) => (
                                <div className={`Utterance ${utteranceIsSelected(index) ? "selected" : ""}`}
                                    onClick={() => setOpenUtterance(index)}
                                    onMouseDown={() => selectUtteranceRange(index)}
                                    onMouseEnter={() => setHoverUtterance(index)}
                                    onMouseLeave={() => unsetHoverUtterance()}>
                                    <span className="avatar">
                                        <img src={getPlayerAvatar(player)} />
                                    </span>
                                    <span className="content">
                                        <span className="name">
                                            {player}
                                        </span>
                                        <span className="text">
                                            {utterance.map((part, partIndex) => (
                                                <span key={partIndex} className={`part ${proofSelected(index, partIndex) ? "selected" : ""}`}>
                                                    {part}&nbsp;
                                                </span>
                                            ))}
                                        </span>
                                        {
                                            index === openUtterance &&
                                            (<div className="opened">
                                                <ul>
                                                    {facts.map(({ claim }, factIndex) => (
                                                        <li key={factIndex} className={`fact ${factIsSelected(index, factIndex) ? "selected" : ""}`}
                                                            onMouseEnter={() => selectFact(index, factIndex)}
                                                            onMouseLeave={() => unselectFact()}>
                                                            {claim}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>)
                                        }
                                    </span>
                                </div>
                            )
                    }
                </WCVContextConsumer>
            )}
        </AssetContextConsumer>
    );
}

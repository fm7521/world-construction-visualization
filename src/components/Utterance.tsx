import FactsDisplay from "./FactsDisplay";
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
                            startUtteranceRange,
                            selectUtteranceRange,
                            setHoverUtterance,
                            unsetHoverUtterance,
                            setOpenUtterance,
                            openUtterance,
                            utteranceIsSelected,
                            hoverUtterance,
                            proofSelected,
                            data: {
                                [index]: {
                                    player,
                                    utterance,
                                    facts,
                                }
                            }
                        }) => {
                            const selected = utteranceIsSelected(index);
                            function mouseMove({ buttons }: React.MouseEvent) {
                                const leftButton = Boolean(buttons & 1);
                                if (leftButton && !selected) {
                                    selectUtteranceRange(index);
                                }
                            }
                            function mouseDown({ buttons }: React.MouseEvent) {
                                const leftButton = Boolean(buttons & 1);
                                if (leftButton) {
                                    startUtteranceRange(index);
                                }
                            }
                            return (
                                <div className={`Utterance ${selected ? "selected" : ""} ${hoverUtterance === index ? "hovered" : ""}`}
                                    onClick={() => setOpenUtterance(index)}
                                    onMouseDown={mouseDown}
                                    onMouseEnter={e => { setHoverUtterance(index); mouseMove(e) }}
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
                                                <FactsDisplay facts={facts} utterance={index} />
                                            </div>)
                                        }
                                    </span>
                                </div>
                            )
                        }}
                </WCVContextConsumer>
            )}
        </AssetContextConsumer>
    );
}

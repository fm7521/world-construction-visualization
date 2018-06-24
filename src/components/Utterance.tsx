import FactsDisplay from "./FactsDisplay";
import { WCVContextConsumer } from "../WCVStore";
import Avatar from "./Avatar";
import { tupleEq } from "../util";

import "./Utterance.scss";

/**
 * Display information about a single utterance and allow a user to hover over it or open it to display more information
 */

export default function Utterance({ index }: { index: number }) {
    return (
        <WCVContextConsumer>
            {
                ({
                    startUtteranceRange,
                    selectUtteranceRange,
                    setHoverUtterance,
                    unsetHoverUtterance,
                    setOpenUtterance,
                    unsetOpenUtterance,
                    openUtterance,
                    utteranceIsSelected,
                    hoverUtterance,
                    proofSelected,
                    selectPart,
                    unselectPart,
                    selectedPart,
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
                    function partSelected(index, partIndex) {
                        if (proofSelected(index, partIndex) || tupleEq(selectedPart, [index, partIndex])) {
                            return "selected";
                        }
                        return "";
                    }
                    return (
                        <div className={`Utterance ${selected ? "selected" : ""} ${hoverUtterance === index ? "hovered" : ""}`}
                            onClick={() => (index !== openUtterance) ? setOpenUtterance(index) : unsetOpenUtterance()}
                            onMouseDown={mouseDown}
                            onMouseEnter={e => { setHoverUtterance(index); mouseMove(e) }}
                            onMouseLeave={() => unsetHoverUtterance()}>
                            <span className="content">
                                <Avatar player={player} />
                                <span className="name">
                                    {player}
                                </span>
                                <span className="text">
                                    {utterance.map((part, partIndex) => (
                                        <span key={partIndex}
                                            className={`part ${partSelected(index, partIndex)}`}
                                            onMouseEnter={() => selectPart(index, partIndex)}
                                            onMouseLeave={() => unselectPart()}>
                                            {part}&nbsp;
                                                </span>
                                    ))}
                                </span>
                            </span>
                            {
                                index === openUtterance &&
                                (<div className="opened">
                                    <hr />
                                    <h3>Facts</h3>
                                    <FactsDisplay displayFacts={facts} utterance={index} />
                                </div>)
                            }
                        </div>
                    )
                }}
        </WCVContextConsumer>
    );
}

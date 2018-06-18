/**
 * Given a list of facts display them as redacted or asserted
 */

import { Fragment } from "react";

import Avatar from "./Avatar";
import { WCVContextConsumer, Utterance } from "../WCVStore";

import "./FactsDisplay.scss";

export default function FactsDisplay({ displayFacts, utterance, summaryOnly = false }: { displayFacts: Utterance["facts"], utterance: number, summaryOnly?: boolean }) {
    return (
        <div className="FactsDisplay">
            <WCVContextConsumer>
                {(
                    {
                        factIsSelected,
                        selectFact,
                        unselectFact,
                        selectedPart,
                        data,
                    }) => {
                    const {
                        [utterance]: {
                            player,
                            facts,
                        }
                    } = data;
                    function factSelected(factIndex: number): "selected" | "" {
                        if (factIsSelected(utterance, factIndex)) return "selected";
                        if (utterance !== selectedPart[0]) return "";
                        const fact = facts[factIndex];
                        if (fact.proof.length === 1 && fact.proof[0] === selectedPart[1]) return "selected";
                        return "";
                    }
                    return (
                        <Fragment>
                            {summaryOnly && (
                                <Avatar player={player} />
                            )}
                            {displayFacts.map(({ claim, summary, redacts }, factIndex) => (
                                <Fragment key={factIndex}>
                                    <div className={`fact ${factSelected(factIndex)} ${summaryOnly ? "summary" : ""}`}
                                        onMouseEnter={() => selectFact(utterance, factIndex)}
                                        onMouseLeave={() => unselectFact()}>
                                        {summaryOnly ? summary : claim}
                                    </div>
                                    {redacts && (
                                        redacts.map(({ utterance: redactUtterance, fact: redactFact }) => (
                                            <div key={factIndex}
                                                className={`fact redaction ${factSelected(factIndex)} ${summaryOnly ? "summary" : ""}`}
                                                onMouseEnter={() => selectFact(utterance, factIndex)}
                                                onMouseLeave={() => unselectFact()}>
                                                {(data[redactUtterance].facts[redactFact])[(summaryOnly ? "summary" : "claim")]}
                                            </div>
                                        ))
                                    )}
                                </Fragment>
                            ))}
                        </Fragment>
                    );
                }}
            </WCVContextConsumer>
        </div>
    );
}

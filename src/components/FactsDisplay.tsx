/**
 * Given a list of facts display them as redacted or asserted
 */

import { WCVContextConsumer, Utterance } from "../WCVStore";

export default function FactsDisplay({ facts, utterance }: {facts: Utterance["facts"], utterance: number}) {
    return (
        <ul className="FactsDisplay">
            <WCVContextConsumer>
                {({ factIsSelected, selectFact, unselectFact }) => (
                    facts.map(({ claim }, factIndex) => (
                        <li key={factIndex} className={`fact ${factIsSelected(utterance, factIndex) ? "selected" : ""}`}
                            onMouseEnter={() => selectFact(utterance, factIndex)}
                            onMouseLeave={() => unselectFact()}>
                            {claim}
                        </li>
                    ))
                )}
            </WCVContextConsumer>
        </ul>
    );
}

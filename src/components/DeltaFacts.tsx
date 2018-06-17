/**
 * Display the facts that were created or changed in the selected range of utterances
 */

import FactsDisplay from "./FactsDisplay";
import { WCVContextConsumer } from "../WCVStore";

export default function DeltaFacts({ }) {
    return (
        <WCVContextConsumer>
            {({ selectedUtteranceRange, data }) => {
                let facts;
                if (selectedUtteranceRange[0] !== -1) {
                    facts = (
                        data.slice(selectedUtteranceRange[0], selectedUtteranceRange[1] + 1)
                            .map(({ facts }, utterance) => (
                                <FactsDisplay key={utterance} facts={facts} utterance={utterance + selectedUtteranceRange[0]} />
                            ))
                    );
                } else {
                    facts = (
                        <h3>Select Utterances on the left to display changes</h3>
                    );
                }
                return (
                    <div className="DeltaFacts">
                        <h1>Delta World</h1>
                        <div className="fact-box">
                            {facts}
                        </div>
                    </div>
                );
            }}
        </WCVContextConsumer>
    );
}

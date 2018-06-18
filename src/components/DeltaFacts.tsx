/**
 * Display the facts that were created or changed in the selected range of utterances
 */

import FactsDisplay from "./FactsDisplay";
import { WCVContextConsumer, Utterance } from "../WCVStore";
import Avatar from "./Avatar";

import "./DeltaFacts.scss";

export default function DeltaFacts({ }) {
    return (
        <WCVContextConsumer>
            {({ selectedUtteranceRange, data }) => {
                let facts;
                if (selectedUtteranceRange[0] !== -1) {
                    facts = (
                        data.slice(selectedUtteranceRange[0], selectedUtteranceRange[1] + 1)
                            .map(({ facts }, utterance) => (
                                <FactsDisplay key={utterance}
                                    displayFacts={facts}
                                    summaryOnly
                                    utterance={utterance + selectedUtteranceRange[0]} />
                            ))
                    );
                } else {
                    facts = (
                        <h3>Select Utterances on the left to display changes</h3>
                    );
                }
                const {
                    [selectedUtteranceRange[0]]: start,
                    [selectedUtteranceRange[1]]: end,
                } = data;
                return (
                    <div className="DeltaFacts">
                        <h1>Delta World</h1>
                        {start && <TimeFrameSummary start={start} end={end} />}
                        <div className="fact-box">
                            {facts}
                        </div>
                    </div>
                );
            }}
        </WCVContextConsumer>
    );
}

function TimeFrameSummary({ start, end }: { start: Utterance, end: Utterance }) {
    return (
        <div className="TimeFrameSummary">
            <div className="description">Showing all facts that were added and removed between these two utterances</div>
            <div className="start">
                <Avatar player={start.player} />
                <span className="utterance">{start.utterance.join(" ")}</span>
            </div>
            ...
            <div className="end">
                <Avatar player={end.player} />
                <span className="utterance">{end.utterance.join(" ")}</span>
            </div>
        </div>
    );
}

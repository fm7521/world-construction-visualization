/**
 * Display a list of utterances in a chat-like window
 */

import { WCVContextConsumer } from "../WCVStore";
import Utterance from "./Utterance";

export default function ChatDisplay({ }) {
    return (
        <WCVContextConsumer>
            {({
                data,
            }) => (
                    <div className="ChatDisplay">
                        <div className="chats">
                            {data.map(({ }, i) => (
                                <Utterance key={i} index={i} />
                            ))}
                        </div>
                    </div>
                )
            }
        </WCVContextConsumer>
    );
}
import { createContext, Component } from "react";

/**
 * Contains the entire state of a single WCV
 */

/**
 * A statement or reply made by a player
 */
export interface Utterance {
    // Human readable identifier for the player who made the utterance
    readonly player: string;
    // Contains the utterance string broken up into parts that individually prove some fact
    readonly utterance: string[];
    // Facts that can be derived from the utterance
    readonly facts: {
        // Human readable description of the fact
        claim: string;
        // The indices in utterance array that are used to derive this fact
        proof: number[];
    }[];
}

class WCVState {
    // Roleplay data that is visualized
    public data: Utterance[];
    // A lower and upper index range to select from data
    public selectedUtteranceRange: [number, number] = [-1, -1];
    // The index of the highest utterance that has been revealed by the user
    public utteranceProgress: number = -1;
    // The utterance that the user has hovered over
    public hoverUtterance: number = -1;
    // The utterance that the user has opened
    public openUtterance: number = -1;
    // The utterance fact that is selected by the user, contains utterance index and then fact index
    public selectedFact: [number, number] = [-1, -1];

    constructor(data: Utterance[]) {
        this.data = data;
    }
    loadData = (data: Utterance[]) => {
        this.data = data;
    }
    utteranceIsSelected(index: number) {
        return Boolean(index >= this.selectedUtteranceRange[0] && index <= this.selectedUtteranceRange[1]);
    }
    factIsSelected(utterance: number, fact: number) {
        return Boolean(this.selectedFact[0] === utterance && this.selectedFact[1] === fact);
    }
    proofSelected(utterance: number, part: number) {
        if (utterance != this.selectedFact[0] || this.selectedFact[1] === -1) return false;
        const fact = this.data[utterance].facts[this.selectedFact[1]];
        return fact.proof.includes(part);
    }
    startUtteranceRange = (index: number) => {
        this.selectedUtteranceRange = [index, index];
    }
    selectUtteranceRange = (index: number) => {
        if (this.selectedUtteranceRange[0] === -1) {
            this.startUtteranceRange(index);
        } else if (this.selectedUtteranceRange[0] <= index) {
            this.selectedUtteranceRange = [this.selectedUtteranceRange[0], index];
        } else {
            this.selectedUtteranceRange = [index, this.selectedUtteranceRange[1]];
        }
    }
    changeProgress = (delta: number) => {
        this.utteranceProgress += delta;
    }
    setHoverUtterance = (index: number) => {
        this.hoverUtterance = index;
    }
    unsetHoverUtterance = () => {
        this.hoverUtterance = -1;
    }
    setOpenUtterance = (index: number) => {
        this.openUtterance = index;
    }
    unsetOpenUtterance = () => {
        this.openUtterance = -1;
    }
    selectFact = (utterance: number, fact: number) => {
        this.selectedFact = [utterance, fact];
    }
    unselectFact = () => {
        this.selectedFact = [-1, -1];
    }
}

const WCVContext: React.Context<WCVState> = createContext(null as any);
export const WCVContextConsumer = WCVContext.Consumer;

export default class WCVStore extends Component<{ data: Utterance[] }, {}> {
    private wcvstate: WCVState;
    constructor(props) {
        super(props);
        this.state = {};
        const state = new WCVState(props.data);;
        this.wcvstate = Object.assign(state, this.augmentedPrototype(state), {
            utteranceIsSelected: WCVState.prototype.utteranceIsSelected.bind(state),
            factIsSelected: WCVState.prototype.factIsSelected.bind(state),
            proofSelected: WCVState.prototype.proofSelected.bind(state),
        });
    }
    augmentedPrototype(prototype) {
        const newPrototype = {};
        Object.getOwnPropertyNames(prototype).forEach(methodName => {
            if (typeof prototype[methodName] !== "function") return;
            newPrototype[methodName] = this.augmentStateMethod(prototype[methodName]);
        });
        return newPrototype;
    }
    augmentStateMethod(method) {
        const store = this;
        return function (this: WCVState, ...args) {
            const methodResult = method.apply(this, args);
            store.setState({});
            return methodResult;
        };
    }
    render() {
        const { children } = this.props;
        return (
            <WCVContext.Provider value={{ ...this.wcvstate } as WCVState}>
                {children}
            </WCVContext.Provider>
        )
    }
}

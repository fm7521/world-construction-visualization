/**
 * Provides mechanisms to retrieve assets
 */

import { createContext, Component } from "react";

export interface AssetDatabase {
    players: {
        [index: string]: string;
    };
}

class AssetStore {
    private data: AssetDatabase

    constructor(data: AssetDatabase) {
        this.data = data;
    }
    getPlayerAvatar = (playerName: string) => {
        return this.data.players[playerName];
    }
}

const AssetContext: React.Context<AssetStore> = createContext(null as any);
export const AssetContextConsumer = AssetContext.Consumer;

export default class Assets extends Component<{ data: AssetDatabase }, {}> {
    private data: AssetStore;
    constructor(props) {
        super(props);
        this.data = new AssetStore(props.data);
    }
    render() {
        return (
            <AssetContext.Provider value={this.data}>
                {this.props.children}
            </AssetContext.Provider>
        );
    }
}

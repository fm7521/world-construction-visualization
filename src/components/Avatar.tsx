/**
 * Display a player's avatar
 */

import { AssetContextConsumer } from "../Assets";

export default function Avatar({ player }) {
    return (
        <AssetContextConsumer>
            {({ getPlayerAvatar }) => (
                <span className="Avatar">
                    <img src={getPlayerAvatar(player)} />
                </span>
            )}
        </AssetContextConsumer>
    );
}

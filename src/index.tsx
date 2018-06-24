/**
 * Mount react component to DOM
 */

import { render } from "react-dom";
import WCV from "./components/WCV";
import { Utterance } from "./WCVStore";
import Assets, { AssetDatabase } from "./Assets";

import "./components/shared.scss";

export function create(id: string, data: Utterance[], assets: AssetDatabase) {
    const container = document.getElementById(id);
    if (container === null) throw new Error(`The id "${id}" is not valid`);
    render(
        (<Assets data={assets}>
            <WCV data={data} />
        </Assets>),
        container);
}

const resourceLoader = require.context("./data", true, /\.json$/);
export const resources = {};
resourceLoader.keys().forEach(resourcePath => {
    const resource = resourceLoader(resourcePath);
    resources[(resourcePath.match(/\/(.*)\./) as RegExpMatchArray)[1]] = resource;
});

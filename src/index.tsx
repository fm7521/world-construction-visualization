/**
 * Mount react component to DOM
 */

import { render } from "react-dom";
import WCV from "./components/WCV";
import { Utterance } from "./WCVStore";
import Assets, { AssetDatabase } from "./Assets";

import "./components/shared.scss";

const data: Utterance[] = require("./data/sample_rp_1.json");
const assets: AssetDatabase = require("./data/assets.json");

render(
    (<Assets data={assets}>
        <WCV data={data} />
    </Assets>),
    document.getElementById("app"));

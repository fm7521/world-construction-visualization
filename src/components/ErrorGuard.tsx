/**
 * Error handler that allows the user to restart application
 */

import { Component } from "react";

import "./ErrorGuard.scss";
import { WCVContextConsumer } from "../WCVStore";

export default class ErrorGuard extends Component<{}, { hasCrashed: boolean }> {
    constructor(props) {
        super(props);
        this.state = {
            hasCrashed: false,
        };
    }
    componentDidCatch() {
        this.setState({
            hasCrashed: true,
        });
    }
    restore(restart: () => void) {
        restart();
        this.setState({
            hasCrashed: false,
        });
    }
    render() {
        const { children } = this.props;
        const { hasCrashed } = this.state;
        if (!hasCrashed) {
            return children;
        } else {
            return (
                <WCVContextConsumer>
                    {({ restart }) => (
                        <div className="ErrorGuard">
                            <div className="apology">Sorry! The application has crashed :(</div>
                            <button onClick={() => this.restore(restart)}>Restart</button>
                        </div>
                    )}
                </WCVContextConsumer>
            );
        }
    }
}

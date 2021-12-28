import React, { Component } from "react";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {

        return (
            <div>
                <h1>Hello, World!</h1>
                <a href="/logout">ログアウト</a>
            </div>

        );
    }
}

export default Main;

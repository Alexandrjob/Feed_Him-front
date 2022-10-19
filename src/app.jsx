﻿import React from "react";
import Lobby from "./components/lobby";
import Main from "./components/main";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

class App extends React.Component {
    render() {
        return (
                <Lobby/>
                //<Main/>
        );
    }
}

export default App;

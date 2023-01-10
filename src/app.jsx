import React from "react";
import Main from "./pages/main";
import Panel from "./pages/Panel/Panel"
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from 'react-router-dom';

const names = ["Саша", "Катя", "Наташа", "Лариса"];

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

//Копипаст, быстрое решение.https://russianblogs.com/article/2360155478/
function getWight() {
    const MOBILE_SIZE = '100%';
    const DESKTOP_SIZE = '50%';

    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var isPC = true;

    for (var i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) > 0) {
            isPC = false;
            break;
        }
    }

    if (isPC) {
        return DESKTOP_SIZE;
    }
    return MOBILE_SIZE;
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            url: "http://localhost:5000/api",
            width: getWight(),
        };

        let token = window.localStorage.getItem('token');
        let name = window.localStorage.getItem('name');

        if (token != null && name != null) {
            this.state.auth = true;
        }

        this.changeAuth = this.changeAuth.bind(this);
    }

    changeAuth(newAuth) {
        this.setState({ auth: newAuth });
    }

    render() {
        return (
            <Routes>
                <Route path="/" element={<Main width={this.state.width} auth={this.state.auth} url={this.state.url} waiterName={this.state.waiterName} />} />
                <Route path="/panel" element={<Panel focusTab={0} auth={this.state.auth} url={this.state.url} />}/>
                <Route path="/panel/group/invitation/:nameGroup/:invitation" element={<Panel focusTab={3} auth={this.state.auth} url={this.state.url} />}/>
                <Route path="/singin" element={<Login auth={this.state.auth} changeNameHandle={this.changeName} changeAuthHandle={this.changeAuth} url={this.state.url} />} />
                <Route path="/singup" element={<Registration auth={this.state.auth} url={this.state.url} />} />
            </Routes>
        );
    }
}

export default App;

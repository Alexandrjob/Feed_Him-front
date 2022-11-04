import React from "react";
import Lobby from "./pages/lobby";
import Main from "./pages/main";

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
            waiterName: null,
            width: getWight(),
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        let name = getCookie("waiterName");

        if (!!!name) {
            this.setState({ waiterName: null });
            return;
        }

        this.setState({ waiterName: name });
    }

    onChange(id) {
        let name = names[id];
        document.cookie = "waiterName=" + name;

        this.setState({ waiterName: name });
    }

    render() {
        return (
            this.state.waiterName == null
                ? <Lobby width={this.state.width} handleChange={this.onChange} />
                : <Main width={this.state.width} waiterName={this.state.waiterName} />
        );
    }
}

export default App;

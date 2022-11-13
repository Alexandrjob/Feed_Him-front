import React, { useEffect, useState } from "react";
import Lobby from "./pages/lobby";
import Main from "./pages/main";

export default function App() {
    const names = ["Саша", "Катя", "Наташа", "Лариса"];
    
    // возвращает куки с указанным name,
    // или undefined, если ничего не найдено
    const getCookie = (name) => {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    const name = getCookie("waiterName");
    const [waiterName, setWaiterName] = useState(name);
    
    //Копипаст, быстрое решение.https://russianblogs.com/article/2360155478/
    const getWight = () => {
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
          //  setWidth(DESKTOP_SIZE);
            return DESKTOP_SIZE;
        }
        //setWidth(MOBILE_SIZE);
        return MOBILE_SIZE;
    }
    
    useEffect(() => {
        let name = getCookie("waiterName");

        if (!!!name) {
            setWaiterName(null);
            return;
        }

        setWaiterName(name);
    }, [waiterName]);

    const onChange = (id) => {
        let name = names[id];
        document.cookie = "waiterName=" + name;

        setWaiterName(name);
    }
    
    return (
        waiterName == null
            ? <Lobby width={getWight()} handleChange={onChange} />
            : <Main width={getWight()} waiterName={waiterName} />
    );
}

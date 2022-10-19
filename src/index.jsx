import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';



const container = document.getElementById('content');
const root = ReactDOM.createRoot(container);

root.render(<App />);

if (module.hot) {
    module.hot.accept("./app", () => {
        const UpdatedApp = require("./app").default;
        root.render(<UpdatedApp />);
    });
}
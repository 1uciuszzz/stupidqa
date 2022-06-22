import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import store from "./store/index.js";
import { Provider } from "react-redux";

const root = createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

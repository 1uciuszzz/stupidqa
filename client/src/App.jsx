import React from "react";
import routes from "./router";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <Router>
            <Routes>
                {routes.map(item => {
                    console.log(item);
                    return (
                        <Route
                            path={item.path}
                            element={item.element}
                            key={item.path}
                        ></Route>
                    );
                })}
            </Routes>
        </Router>
    );
}

import React from "react";
import { Router } from "@reach/router";
import Home from "./components/Home";

const PublicRoutes = () => (
    <Router>
        <Home path="/" />
    </Router>
);

export default PublicRoutes;

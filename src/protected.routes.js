import React from "react";
import { Router } from "@reach/router";
import Loadable from "react-loadable";
import Loading from "./components/Loading";
import DashboardViewer from "./components/dashboard/DashboardViewer";
import ReportViewer from "./components/report/ReportViewer";
import DashboardDesigner from "./components/DashboardDesigner";
import ReportDesigner from "./components/ReportDesigner";
import ResourceCenter from "./components/ResourceCenter";
import Scheduler from "./components/Scheduler";

const AsyncDashboards = Loadable({
    loader: () => import("./components/Dashboards"),
    loading: Loading
});

const AsyncReports = Loadable({
    loader: () => import("./components/Reports"),
    loading: Loading
});

const AsyncSettings = Loadable({
    loader: () => import("./components/Settings"),
    loading: Loading
});

const ProtectedRoutes = () => (
    <Router>
        <AsyncDashboards path="/dashboards" />
        <AsyncReports path="/reports" />
        <AsyncSettings path="/settings" />
        <DashboardViewer path="/dashboards/dashboard/:id" />
        <ReportViewer path="/reports/report/:id" />
        <DashboardDesigner path="/dashboardDesigner" />
        <ReportDesigner path="/reportDesigner" />
        <ResourceCenter path="/resourceCenter" />
        <Scheduler path="/scheduler" />
    </Router>
);

export default ProtectedRoutes;

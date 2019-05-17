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
import DeleteReport from "./components/report/DeleteReport";
import DeleteDashboard from "./components/dashboard/DeleteDashboard";

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
        <DashboardViewer path="/dashboards/dashboard/edit/:id" />
        <ReportViewer path="/reports/report/edit/:id" />
        <DeleteReport path="/reports/report/delete/:id" />
        <DeleteDashboard path="/dashboards/dashboard/delete/:id" />
        <DashboardDesigner path="/dashboardDesigner" />
        <ReportDesigner path="/reportDesigner" />
        <ResourceCenter path="/resourceCenter" />
        <Scheduler path="/scheduler" />
    </Router>
);

export default ProtectedRoutes;

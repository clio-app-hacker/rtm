import React from "react";
import { AuthProvider } from "./helpers/AuthContext";
import PublicRoutes from "./public.routes";
import ProtectedRoutes from "./protected.routes";

const Routes = () => (
    <div>
        <AuthProvider>
            <PublicRoutes />
            <ProtectedRoutes />
        </AuthProvider>
    </div>
);

export default Routes;

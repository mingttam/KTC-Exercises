import React from "react";
import { Navigate } from "react-router-dom";
import { hasAnyRoles, isAllowAccessForRoles } from "../auth.util";
import { useAuthStore } from "../auth.store";

const withRoles = (requiredRoles: string[]) => {
  return function <P extends object>(Component: React.ComponentType<P>) {
    return function WithRoleComponent(props: P) {
      const { user } = useAuthStore();

      if (!user) return <Navigate to="/login" replace />;

      const userRoles = user.roles;
      if (isAllowAccessForRoles(userRoles, ["root", "admin"])) {
        return <Component {...props} />;
      }

      if (!hasAnyRoles(userRoles, requiredRoles)) {
        return <Navigate to="/unauthorized" replace />;
      }

      return <Component {...props} />;
    };
  };
};

export default withRoles;

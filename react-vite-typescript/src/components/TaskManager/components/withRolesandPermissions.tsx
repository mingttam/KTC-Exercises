import React from "react";
import { Navigate } from "react-router";
import { hasPermissions, hasAnyRoles, isAllowAccessForRoles } from "../auth.util";
import { useAuthStore } from "../auth.store";
import type { PermissionCheckMode } from "../auth.type";

const withRolesAndPermissions = (
  roles: string[],
  permissions: string[],
  permissionMode: PermissionCheckMode = "ANY"
) => {
  return function <P extends object>(Component: React.ComponentType<P>) {
    return function WithRoleAndPermissionsComponent(props: P) {
      const { user } = useAuthStore();

      if (!user) return <Navigate to="/login" replace />;

      const userRoles = user.roles;

      if (isAllowAccessForRoles(userRoles, ["root", "admin"])) {
        return <Component {...props} />;
      }

      const hasRole = hasAnyRoles(userRoles, roles);
      const hasPerm = hasPermissions(user.permissions, permissions, permissionMode);

      if (!(hasRole && hasPerm)) return <Navigate to="/unauthorized" replace />;

      return <Component {...props} />;
    };
  };
};

export default withRolesAndPermissions;

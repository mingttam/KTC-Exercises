import type { PermissionCheckMode } from "./auth.type";

export function hasPermissions(
  userPerms: string[],
  requiredPerms: string[],
  mode: PermissionCheckMode
): boolean {
  return mode.toLocaleUpperCase() === "ALL"
    ? requiredPerms.every(p => userPerms.includes(p))
    : requiredPerms.some(p => userPerms.includes(p));
}

export function isAllowAccessForRoles(
  userRoles: string[],
  allowedRoles: string[]
): boolean {
  return userRoles.some(role => allowedRoles.includes(role));
}
export function hasAnyRoles(userRoles: string[], requiredRoles: string[]): boolean {
  return userRoles.some(role => requiredRoles.includes(role));
}
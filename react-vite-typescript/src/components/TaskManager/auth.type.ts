export type PermissionCheckMode = "ALL" | "ANY";
export type Role = string;
export type Permission = string;

export type UserType = {
  roles: Role[];
  permissions: Permission[];
  
};

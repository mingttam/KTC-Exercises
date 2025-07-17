import { create } from "zustand";
import type { Permission, Role } from "./auth.type";

type User = {
  roles: Role[];
  permissions: Permission[];
};

type AuthState = {
  user: User | null;
};

export const useAuthStore = create<AuthState>(() => ({
  user: null,
}));

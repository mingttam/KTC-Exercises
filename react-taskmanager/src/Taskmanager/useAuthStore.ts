/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import  apiClient  from './libraries/api-client';

export interface LoggedInUser {
  id: string | number;
  username: string;
  isActive: boolean;
  roles: [
    {
      code: any;
      id: string | number;
      name: string;
    }
  ];
}

export interface AuthState {
  access_token?: string;
  refresh_token?: string;
  loggedInUser?: LoggedInUser;
  loading: boolean;
  error: any;
  login: ({ username, password }: { username: string; password: string }) => Promise<void>;
  logOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => {
        return {
          access_token: undefined,
          refresh_token: undefined,
          loggedInUser: undefined,
          loading: false,
          error: null,
          login: async ({ username, password }) => {
            try {
              set(
                {
                  loggedInUser: undefined,
                  access_token: undefined,
                  refresh_token: undefined,
                  error: null,
                  loading: true,
                },
                false,
                { type: '@AUTH/LOGIN/LOADING' }
              );

              const response: any = (await apiClient.post('/auth/login', { username, password })) as any;

              set(
                {
                  access_token: response.access_token,
                  refresh_token: response.refresh_token,
                  loggedInUser: response.loggedInUser,
                  loading: false,
                  error: null,
                },
                false,
                { type: '@AUTH/LOGIN/SUCCESS' }
              );
            } catch (error) {
              set({ error, access_token: undefined, refresh_token: undefined, loggedInUser: undefined }, false, {
                type: '@AUTH/LOGIN/ERROR',
              });
            }
          },

          logOut: async () => {
            set({ access_token: undefined, refresh_token: undefined, loggedInUser: undefined });
          },
          

        };
      },
      {
        name: 'auth-storage',
      }
    )
  )
);
import { api } from "@/services/apiClient";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signin: (credentials) => Promise<void>;
  signUp: (credentials) => Promise<void>;
  logoutUser: () => Promise<void>;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  endereco: string | null;
  subscriptons?: SubscriptionProps | null;
}

interface SubscriptionProps {
  id: string;
  status: string;
}

type AuthProviderProps = {
  children: ReactNode
}

interface SigninProps {
  email: string;
  password: string;
}

interface SiginUpProps {
  name: string;
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  console.log("ERROR LOGOUT");
  try {
    destroyCookie(null, '@barber.token', { path: '/' })
    Router.push('/login');

  } catch (err) {
    console.log("Error ao sair", err);
  }

}


export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@barber.token': token } = parseCookies();

    if (token) {
      api.get('/me').then(response => {
        const { id, name, endereco, email, subscriptons } = response.data;
        setUser({
          id,
          name,
          email,
          endereco,
          subscriptons,
        })
      })
        .catch(() => {
          signOut();
        })
    }

  }, [])

  async function signin({ email, password }: SigninProps) {
    try {
      const response = await api.post('/session', {
        email,
        password
      })

      const { id, name, token, subscriptons, endereco } = response.data;

      setCookie(undefined, '@barber.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });

      setUser({
        id,
        name,
        email,
        endereco,
        subscriptons
      });

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboard');

    } catch (error) {
      console.log("Error ao entrar", error);
    }

  }

  async function signUp({ name, email, password }: SiginUpProps) {
    try {
      // const response = 
      await api.post('/users', {
        name,
        email,
        password
      })

      Router.push('/login');

    } catch (error) {
      console.log(error);

    }
  }

  async function logoutUser() {
    try {
      destroyCookie(null, '@barber.token', { path: '/' });
      Router.push('/login');
      setUser(null);
    } catch (error) {
      console.log("Erro ao sair", error);
    }
  }


  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      signin,
      signUp,
      logoutUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}
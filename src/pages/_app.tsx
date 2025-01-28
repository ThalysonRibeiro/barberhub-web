import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";


const colors = {
  barberHub: {
    900: "#09090b",
    400: '#18181b',
    300: '#27272a',
    100: '#c6c6c6',
  },
  button: {
    cta: '#0466c8',
    default: '#FFF',
    gray: '#DFDFDF',
    danger: '#FF4040',
  },
  blue: {
    900: '#0353a4'
  },
}

const theme = extendTheme({ colors })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>

  )
}
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";


const colors = {
  barberHub: {
    900: "#18181b",
    400: '#1A1A1A',
    300: '#27272a',
    200: '#2D2D2D',
    100: '#c6c6c6',
  },
  button: {
    cta: '#C6A05B',
    hover: '#754D24',
    default: '#FFF',
    gray: '#DFDFDF',
  },
  danger: {
    900: '#8B0000',
    800: '#FF4040',
  },
  dourado: {
    900: '#C6A05B',
    800: '#68441F'
  },
  blue: {
    900: '#0353a4',
    800: '#023E7B',
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
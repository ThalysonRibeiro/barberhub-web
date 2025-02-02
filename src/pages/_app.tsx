import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";


const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'white',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
      },
      variants: {
        solid: {
          bg: 'blue.600',
          color: 'white',
          _hover: {
            bg: 'blue.700',
          },
        },
        outline: {
          color: 'white',
          borderColor: 'whiteAlpha.400',
          _hover: {
            bg: 'whiteAlpha.200',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        color: 'white',
      },
    },
  },
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>

  )
}
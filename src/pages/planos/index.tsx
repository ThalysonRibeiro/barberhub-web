import { SideBar } from "@/components/SideBar";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Button, Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import Head from "next/head";

interface PlanosProps {
  premium: boolean;
}

export default function Planos({ premium }: PlanosProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Head>
        <title>Modelos de corte</title>
      </Head>
      <SideBar>
        <Flex direction="column" alignItems="center" justifyContent="flex-start">

          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="center"
          >
            <Heading fontSize={isMobile ? "28px" : "3xl"} mt={4} mb={4} mr={4}>Planos</Heading>
          </Flex>

          <Flex
            p={8}
            maxW="780px"
            w="100%"
            direction="column"
            align="center"
            justify="center"
          >
            <Flex w="100%" gap={4} direction={isMobile ? "column" : "row"}>
              <Flex rounded={4} p={2} flex={1} bg="barberHub.300" direction="column">
                <Heading textAlign="center" fontSize="2xl" mt={2} mb={2}>Planop grátis</Heading>
                <Text ml={4} mb={2}>Registrar conrte</Text>
                <Text ml={4} mb={2}>Criar apenas 3 modelos de corte</Text>
                <Text ml={4} mb={2}>Editar dados do perfil</Text>
                <Text ml={4} mb={2}>Receba todas as atualizações</Text>
              </Flex>
              <Flex rounded={4} p={2} flex={1} bg="barberHub.300" direction="column" borderWidth={1} borderColor="dourado.900">
                <Heading textAlign="center" fontSize="2xl" mt={2} mb={2} color="#31fb6a">Premium</Heading>
                <Text ml={4} mb={2}>Registrar conrte ilimitados</Text>
                <Text ml={4} mb={2}>Criar modelos de corte ilimitados</Text>
                <Text ml={4} mb={2}>Editar dados do perfil</Text>
                <Text ml={4} mb={2}>Editar modelos de corte</Text>
                <Text ml={4} mb={2}>Pagina de fila de espera</Text>
                <Text ml={4} mb={2}>Receba todas as atualizações</Text>
                <Text ml={4} mb={2} color="#31fb6a" fontSize="3xl" fontWeight="bold">R$ 9.99</Text>
                <Button
                  mb={2}
                  disabled={premium}
                  onClick={() => { }}
                >
                  {premium ? (
                    "VOCÊ JÁ É PREMIUM"
                  ) : (
                    "SEJA PREMIUM"
                  )}
                </Button>

                {premium && (
                  <Button bg="black" color="white" _hover={{ bg: "button.hover" }} onClick={() => { }}>
                    ALTERAR ASSINATURA
                  </Button>
                )}
              </Flex>
            </Flex>
          </Flex>

        </Flex>
      </SideBar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  try {
    const apiCLient = setupAPIClient(ctx);
    const response = await apiCLient.get('/me');

    return {
      props: {
        premium: response.data?.subscriptions?.status === 'active' ? true : false
      }
    }
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      }
    }
  }

})
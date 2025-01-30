import { SideBar } from "@/components/SideBar";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Button, Flex, Heading, Input, Text, useMediaQuery } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

interface NewHaircutProps {
  subscription: boolean;
  count: number;
}

export default function New({ subscription, count }: NewHaircutProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  async function handleRegister() {
    if (name === "" || price === "") {
      return;
    }
    const apiClient = setupAPIClient();
    await apiClient.post('/haircut', {
      name: name,
      price: Number(price),
    })
    Router.push('/haircurts');
    try {

    } catch (error) {
      alert("Error ao cadastrar esse modelo");
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Novo modelos de corte</title>
      </Head>
      <SideBar>
        <Flex direction="column" alignItems="center" justifyContent="flex-start">
          <Flex
            direction={isMobile ? "column" : "row"}
            align={isMobile ? "flex-start" : "center"}
            w="100%"
            mb={isMobile ? 4 : 0}
          >
            <Link href="/haircurts">
              <Button
                background="button.cta"
                color="gray.700"
                size="sm"
                mr={4}
                _hover={{ bg: "button.hover" }}
              >
                <FiChevronLeft size={20} color="#374151" />  Voltar
              </Button>
            </Link>
            <Heading fontSize={isMobile ? "28px" : "3xl"} mt={4} mb={4} mr={4}>Cadastrar novo modelos de corte</Heading>
          </Flex>

          <Flex
            maxW="700px"
            bg="barberHub.300"
            w="100%"
            align="center"
            justify="center"
            pt={8}
            pb={8}
            direction="column"
          >
            <Input
              w="85%"
              background="barberHub.400"
              size="lg"
              placeholder="Nome do corte"
              type="text"
              mb={6}
              p={1}
              borderColor="#68441F"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              w="85%"
              background="barberHub.400"
              size="lg"
              placeholder="Valor do corte"
              type="number"
              mb={6}
              p={1}
              borderColor="#68441F"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Button
              w="85%"
              background="button.cta"
              color="gray.700"
              size="md"
              mb={4}
              _hover={{ bg: "button.hover" }}
              disabled={!subscription && count >= 3}
              onClick={handleRegister}
            >
              Cadastrar
            </Button>

            {!subscription && count >= 3 && (
              <Flex>
                <Text>Você antingiu seu limiete de corte</Text>
                <Link href="/planos">
                  <Text fontWeight="bold" color="#31fb6a" cursor="pointer" ml={1}>Seja premium</Text>
                </Link>
              </Flex>
            )}

          </Flex>

        </Flex>
      </SideBar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/haircut/check');
    const count = await apiClient.get('/haircut/count');

    return {
      props: {
        subscription: response.data?.subscriptions?.status === 'active' ? true : false,
        count: count.data,
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
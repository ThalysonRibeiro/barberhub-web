import { SideBar } from "@/components/SideBar";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Button, Flex, Heading, Input, Stack, Switch, Text, useMediaQuery } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { ChangeEvent, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

interface HaircurtProps {
  id: string;
  name: string;
  price: string | number;
  status: boolean;
  user_id: string;
}

interface SubscriptionProps {
  id: string;
  status: string;
}

interface EditeHaircutProps {
  haircut: HaircurtProps;
  subscription: SubscriptionProps | null;
}

export default function EditHaircuts({ haircut, subscription }: EditeHaircutProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [name, setName] = useState(haircut?.name);
  const [price, setPrice] = useState(haircut?.price);
  const [status, setStatus] = useState(haircut?.status);

  const [disableHaircut, setDisableHaircut] = useState(haircut?.status ? "disabled" : "enabled");


  function handleChangeStatus(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "disabled") {
      setDisableHaircut("enabled");
      setStatus(false);
    } else {
      setDisableHaircut("disabled");
      setStatus(true);
    }
  }

  async function handleUpdate() {
    if (name === "" || price === "") return;

    try {
      const apliClient = setupAPIClient();
      await apliClient.put('/haircut', {
        name: name,
        price: Number(price),
        status: status,
        haircut_id: haircut?.id
      });

      alert("Corte atualizado com sucesso");

      Router.push('/haircurts');

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <Head>
        <title>Editar modelo de corte</title>
      </Head>
      <SideBar>

        <Flex direction="column" alignItems="center" justifyContent="flex-start">
          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="flex-start"
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

            <Heading fontSize={isMobile ? "28px" : "3xl"} mt={4} mb={4} mr={4}>Editar modelo corte</Heading>
          </Flex>

          <Flex maxW="700px" mt={4} pt={8} pb={8} w="100%" bg="barberHub.300" direction="column" align="center" justify="center">
            <Flex w="85%" direction="column">
              <Input
                w="100%"
                background="barberHub.400"
                size="lg"
                placeholder="Nome do corte"
                type="text"
                mb={6}
                p={1}
                borderColor="#68441F"
                disabled={subscription?.status !== "active"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                w="100%"
                background="barberHub.400"
                size="lg"
                placeholder="Valor do corte"
                type="number"
                mb={6}
                p={1}
                borderColor="#68441F"
                disabled={subscription?.status !== "active"}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Stack mb={2} align="center" direction="row">
                <Text>ATIVOS</Text>
                <Switch
                  colorScheme="red"
                  size="lg"
                  value={disableHaircut}
                  isChecked={disableHaircut === "disabled" ? false : true}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeStatus(e)}
                />
              </Stack>
              <Button
                background="button.cta"
                color="gray.700"
                size="md"
                w="100%"
                mt={4}
                mb={4}
                _hover={{ bg: "button.hover" }}
                disabled={subscription?.status !== "active"}
                onClick={handleUpdate}
              >
                Salvar
              </Button>
              {subscription?.status !== "active" && (
                <Flex direction="row" align="center" justify="center">
                  <Link href="/planos">
                    <Text cursor="pointer" fontWeight="bold" mr={1} color="#31fb6a">Seja premium</Text>
                  </Link>
                  <Text>e tenha todos os acessos liberados.</Text>
                </Flex>
              )

              }
            </Flex>
          </Flex>

        </Flex>
      </SideBar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { id } = ctx.params;
  try {
    const apiClient = setupAPIClient(ctx);
    const check = await apiClient.get('/haircut/check');
    const response = await apiClient.get('/haircut/detail', {
      params: {
        haircut_id: id,
      }
    })
    return {
      props: {
        haircut: response.data,
        subscription: check.data?.subscriptions
      }
    }


  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: '/haircurts',
        permanent: false,
      }
    }
  }
})
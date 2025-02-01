import { SideBar } from "@/components/SideBar";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Button, Flex, Heading, Stack, Switch, Text, useMediaQuery } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { IoMdPricetag } from "react-icons/io";

interface HaircurtsItems {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}

interface HaircutsProps {
  haircuts: HaircurtsItems[];
}


export default function Haircurts({ haircuts }: HaircutsProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [haircutList, setHaircutList] = useState<HaircurtsItems[]>(haircuts || []);
  const [disableHaircut, setDisableHaircut] = useState("enabled");

  async function handleDisabled(e: ChangeEvent<HTMLInputElement>) {
    const apiClient = setupAPIClient();

    if (e.target.value === "disabled") {
      setDisableHaircut("enabled");
      const response = await apiClient.get('/haircuts', {
        params: {
          status: true,
        }
      });
      setHaircutList(response.data);
    } else {
      setDisableHaircut("disabled");
      const response = await apiClient.get('/haircuts', {
        params: {
          status: false,
        }
      });
      setHaircutList(response.data);
    }
  }

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
            justifyContent="flex-start"
          >
            <Heading fontSize={isMobile ? "28px" : "3xl"} mt={4} mb={4} mr={4}>Modelos de corte</Heading>

            <Link href="/haircurts/new">
              <Button
                color="gray.700"
                size="sm"
                _hover={{ bg: "button.hover" }}
              >
                Cadastrar novo
              </Button>
            </Link>

            <Stack ml="auto" mb={2} align="center" direction="row">
              <Text>ATIVOS</Text>
              <Switch
                colorScheme="green"
                size="lg"
                value={disableHaircut}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleDisabled(e)}
                isChecked={disableHaircut === "disabled" ? false : true}
              />
            </Stack>

          </Flex>

          {haircutList.map(haircut => (
            <Link key={haircut.id} href={`/haircurts/${haircut.id}`} style={{ width: "100%" }}>
              <Flex
                cursor="pointer"
                w="100%"
                p={4}
                bg={disableHaircut === "enabled" ? "barberHub.300" : "transparent"}
                border={disableHaircut === "enabled" ? "none" : "1px dashed #754D24"}
                direction={isMobile ? "column" : "row"}
                align={isMobile ? "flex-start" : "center"}
                rounded="4"
                mb={2}
                justifyContent="space-between"
              >
                <Flex mb={isMobile ? 2 : 0} direction="row" alignItems="center" justifyContent="center">
                  <IoMdPricetag size={28} color="#C6A05B" />
                  <Text ml={4} noOfLines={1}>
                    {haircut.name}
                  </Text>
                </Flex>

                <Text color="#C6A05B" fontWeight="bold">R$ {haircut.price}</Text>
              </Flex>

            </Link>
          ))}

        </Flex>


      </SideBar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/haircuts', {
      params: {
        status: true,
      }
    });

    if (response.data === null) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        }
      }
    }

    return {
      props: {
        haircuts: response.data,
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
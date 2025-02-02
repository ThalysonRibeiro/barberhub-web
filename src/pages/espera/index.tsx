import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Button, Flex, Heading, Text, useMediaQuery, Link as ChakraLink, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoMdPerson } from "react-icons/io";
import { ScheduleItem } from "../dashboard";

interface DashboardProps {
  schedule: ScheduleItem[];
}

export default function Espera({ schedule: initialSchedule, }: DashboardProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [list, setList] = useState(initialSchedule);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSchedule = async () => {
    try {
      setIsLoading(true);
      const apiClient = setupAPIClient();
      const response = await apiClient.get('/schedule');
      setList(response.data);
    } catch (error) {
      console.error('Erro ao atualizar a lista:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Criar o intervalo para atualizar a cada 30 segundos
    const interval = setInterval(() => {
      fetchSchedule();
    }, 30000); // 30000 milliseconds = 30 segundos

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []); // Array vazio significa que o efeito só roda uma vez ao montar o componente

  return (
    <>
      <Head>
        <title>BarberHub - Dashboard</title>
      </Head>
      <Flex h="6vh" alignItems="center">
        <Link href="/dashboard">
          <Button
            color="white"
            size="sm"
            ml={4}
          >
            Dashboard
          </Button>
        </Link>
        {isLoading && <Spinner color='#4299e1' ml={4} />}
      </Flex>
      <Flex direction="column" alignItems="center" justifyContent="flex-start" h="94vh" p={4}>
        <Flex
          direction={isMobile ? "column" : "row"}
          w="100%"
          alignItems={isMobile ? "flex-start" : "center"}
          justifyContent="center"
        >
          <Heading fontSize={isMobile ? "28px" : "5xl"} mb={4} ml={4}>Fila de espera</Heading>
        </Flex>

        <Flex overflowY="hidden" direction="column" w="100%" align="center" h="70vh">
          {list?.map(item => (
            <ChakraLink
              key={item.id}
              w="100%"
              m={0}
              p={0}
              mt={1}
              bg="transparent"
              style={{ textDecoration: "none" }}
              maxW="900px"
            >
              <Flex
                w="100%"
                direction={isMobile ? "column" : "row"}
                p={4}
                rounded={4}
                mb={4}
                bg="gray.700"
                justify="space-between"
                align={isMobile ? "flex-start" : "center"}
              >
                <Flex direction="row" mb={isMobile ? 2 : 0} align="center" justify="center">
                  <IoMdPerson size={28} color="#4299e1" />
                  <Text fontWeight="bold" textTransform="capitalize" ml={4} noOfLines={1}>{item?.customer}</Text>
                </Flex>
                <Text fontWeight="bold" textTransform="capitalize">{item?.haircut?.name}</Text>
                <Text fontWeight="bold" color="#46ef75">R$ {item?.haircut.price}</Text>
              </Flex>
            </ChakraLink>
          ))}
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiCLient = setupAPIClient(ctx);
    const response = await apiCLient.get('/schedule');
    const subscription = await apiCLient.get('/me');

    if (subscription.data?.subscriptions?.status !== 'active') {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        }
      }
    }

    return {
      props: {
        schedule: response.data,
      }
    }
  } catch (error) {
    console.log(error);
    return {
      props: {
        schedule: []
      }
    }
  }
})
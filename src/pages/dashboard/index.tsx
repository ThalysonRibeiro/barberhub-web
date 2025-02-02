import { ModalInfo } from "@/components/Modal";
import { SideBar } from "@/components/SideBar";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Button, Flex, Heading, Text, useMediaQuery, Link as ChakraLink, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { IoMdPerson } from "react-icons/io";

export interface ScheduleItem {
  id: string;
  customer: string;
  haircut: {
    id: string;
    name: string;
    price: string | number;
    user_id: string;
  }
}

interface DashboardProps {
  schedule: ScheduleItem[];
}

export default function Dashboard({ schedule }: DashboardProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [list, setList] = useState(schedule);
  const [service, setService] = useState<ScheduleItem>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleOpenModal(item: ScheduleItem) {
    setService(item);
    onOpen();
  }

  async function handleFinish(id: string) {

    try {

      const apiCLient = setupAPIClient();
      await apiCLient.delete('/schedule', {
        params: {
          schedule_id: id,
        }
      })
      const filterItem = list.filter(item => {
        return (item?.id !== id);
      });

      setList(filterItem);
      onClose();

    } catch (error) {
      console.log(error);
      onClose();
      alert("Erro ao finalizar esse serviso!")
    }
  }

  return (
    <>
      <Head>
        <title>BarberHub - Dashboard</title>
      </Head>
      <SideBar>
        <Flex direction="column" alignItems="center" justifyContent="flex-start">
          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="flex-start"
          >
            <Heading fontSize={isMobile ? "28px" : "3xl"} mt={4} mb={4} mr={4}>Agenda de clientes</Heading>
            <Link href="/new">
              <Button
                color="white"
                size="sm"
              >
                Registrar
              </Button>
            </Link>
          </Flex>

          {list?.map(item => (
            <ChakraLink
              key={item.id}
              w="100%"
              m={0}
              p={0}
              mt={1}
              bg="transparent"
              style={{ textDecoration: "none" }}
              onClick={() => handleOpenModal(item)}
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
      </SideBar>
      <ModalInfo
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        data={service}
        finishService={() => handleFinish(service?.id)}
      />
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  try {
    const apiCLient = setupAPIClient(ctx);
    const response = await apiCLient.get('/schedule');

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
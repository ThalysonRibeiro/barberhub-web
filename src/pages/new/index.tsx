import { SideBar } from "@/components/SideBar";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Button, Flex, Heading, Input, Select, useMediaQuery } from "@chakra-ui/react";
import Head from "next/head";
import Router from "next/router";
import { ChangeEvent, useState } from "react";

interface HaircutProps {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}

interface NewProps {
  haircuts: HaircutProps[];
}

export default function New({ haircuts }: NewProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [customer, setCustomer] = useState("");
  const [haircutSelected, setHaircutSelected] = useState(haircuts[0]);

  function handleChangeSelect(id: string) {
    const haircutItem = haircuts.find(item => item.id === id);

    setHaircutSelected(haircutItem);
  }

  async function handleRegister() {

    if (customer === "") {
      alert("Preencha o nome do cliente!");
      return;
    }
    try {
      const apiCLient = setupAPIClient();
      await apiCLient.post('/schedule', {
        customer: customer,
        haircut_id: haircutSelected?.id,
      })

      Router.push('/dashboard');
    } catch (error) {
      console.log(error);
      alert("Error ao resgitrar")
    }
  }



  return (
    <>
      <Head>
        <title>BarberHub - Novo agendamento</title>
      </Head>
      <SideBar>
        <Flex direction="column" alignItems="center" justifyContent="flex-start">
          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="flex-start"
          >
            <Heading fontSize={isMobile ? "28px" : "3xl"} mt={4} mb={4} mr={4}>Agendar cliente</Heading>
          </Flex>

          <Flex
            maxW="700px"
            pt={8}
            pb={8}
            w="100%"
            direction="column"
            align="center"
            justify="center"
            bg="gray.900"
            rounded={8}
          >
            <Input
              w="85%"
              placeholder="Nome do cliente"
              type="text"
              mb={6}
              p={1}
              bg="gray.700"
              border={0}
              _focus={{
                bg: 'gray.600',
                borderColor: 'blue.300',
              }}
              value={customer}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomer(e.target.value)}
            />

            <Select mb={3} size="md" w="85%"
              bg="gray.700"
              border={0}
              _focus={{
                bg: 'gray.600',
                borderColor: 'blue.300',
              }}
              onChange={(e) => handleChangeSelect(e.target.value)}>
              {haircuts?.map(item => (
                <option style={{ background: "#4A5568" }} key={item?.id} value={item?.id}>{item?.name}</option>
              ))}
            </Select>

            <Button
              color="white"
              w="85%"
              mt={4}
              mb={4}
              onClick={handleRegister}
            >
              Salvar
            </Button>
          </Flex>
        </Flex>
      </SideBar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  try {
    const apiCLient = setupAPIClient(ctx);
    const response = await apiCLient.get('/haircuts', {
      params: {
        status: true,
      }
    })
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
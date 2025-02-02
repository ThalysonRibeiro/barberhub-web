import { SideBar } from "@/components/SideBar";
import { AuthContext } from "@/context/AuthContext";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";

interface UserProps {
  id: string;
  name: string;
  email: string;
  endereco: string | null;
}
interface ProfileProps {
  user: UserProps;
  premium: boolean;
}

export default function Profile({ user, premium }: ProfileProps) {
  const { logoutUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [endereco, setEndereco] = useState(user?.endereco || '');

  async function handleLogout() {
    logoutUser();
  }

  async function handleUpdateUser() {
    if (name === "") return;

    try {
      const apiClient = setupAPIClient();
      await apiClient.put('/users', {
        name: name,
        endereco: endereco,
      });
      alert("Dados alterados com sucesso");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Minha conta</title>
      </Head>
      <SideBar>
        <Flex direction="column" alignItems="center" justifyContent="flex-start">

          <Flex w="100%" direction="column" alignContent="center" justifyContent="flex-start">
            <Heading fontSize="3xl" mt={1} mb={4} mr={4}>Minha conta</Heading>
          </Flex>

          <Flex pt={8} background="gray.900" rounded={8} maxW="700px" w="100%" direction="column" alignItems="center" justifyContent="center">
            <Flex direction="column" w="85%">
              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">Nome da Barbearia:</Text>
              <Input
                w="100%"
                placeholder="Senha"
                type="text"
                mb={6}
                p={1}
                bg="gray.700"
                border={0}
                _focus={{
                  bg: 'gray.600',
                  borderColor: 'blue.300',
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">Endereço da Barbearia:</Text>
              <Input
                w="100%"
                placeholder="Endereço"
                type="text"
                mb={6}
                p={1}
                bg="gray.700"
                border={0}
                _focus={{
                  bg: 'gray.600',
                  borderColor: 'blue.300',
                }}
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
              <Flex
                direction="row"
                w="100&"
                mb={6}
                p={1}
                borderWidth={1}
                borderColor="#4299E1"
                rounded={6}
                alignItems="center"
                justifyContent="space-between"
              >
                <Text p={2} fontSize="lg" color={premium ? "#fff" : "#4dffb4"}>
                  {premium ? "Plano Premium" : "Plano grátis"}
                </Text>
                <Link href="/planos">
                  <Box
                    cursor="pointer"
                    p={1} pl={2} pr={2}
                    background="#00cd52"
                    rounded={4}
                    color="white"
                  >
                    Mudar plano
                  </Box>
                </Link>

              </Flex>
              <Button
                mb={6}
                color="white"
                onClick={handleUpdateUser}
              >
                Salvar
              </Button>
              <Button
                background="transparent"
                borderWidth={1}
                borderColor="red.600"
                mb={6}
                color="red.600"
                _hover={{ bg: "transparent" }}
                onClick={handleLogout}
              >
                Sair da conta
              </Button>
            </Flex>
          </Flex>

        </Flex>
      </SideBar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/me');

    const user = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      endereco: response.data?.endereco,
    }
    return {
      props: {
        user: user,
        premium: response.data?.subscriptions?.status === 'active' ? true : false,
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
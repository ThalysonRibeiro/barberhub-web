import {
  Button,
  Center,
  Flex,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { canSSRGuest } from "@/utils/canSSRGuest";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const { signin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLoguin() {

    if (email === "" || password === "") {
      return;
    }
    setIsLoading(true);

    await signin({
      email,
      password
    });
    setIsLoading(false);
  }

  return (
    <>
      <Head>
        <title>BarberHub - Faça login.</title>
      </Head>
      <Flex background="barberHub.900" height="100vh" alignItems="center" justifyContent="center">
        <Flex width={540} direction="column" p={14} rounded={8} bg="gray.800" boxShadow="lg">

          <Center p={4} mb={4} flexDirection="column">
            <Flex mb={4}>
              <Heading size="2xl">Barber</Heading>
              <Heading size="2xl" color="blue.400">PRO</Heading>
            </Flex>

            <Heading size="lg">Bem-vindo de volta</Heading>
            <Text color="whiteAlpha.800">
              Entre na sua conta para gerenciar sua barbearia
            </Text>
          </Center>

          <FormControl isRequired mb={4}>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="gray.700"
              border={0}
              _focus={{
                bg: 'gray.600',
                borderColor: 'blue.300',
              }}
            />
          </FormControl>
          <FormControl isRequired mb={4}>
            <InputGroup>
              <Input
                placeholder="Senha"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="gray.700"
                border={0}
                _focus={{
                  bg: 'gray.600',
                  borderColor: 'blue.300',
                }}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  onClick={() => setShowPassword(!showPassword)}
                  variant="ghost"
                  _hover={{ bg: 'transparent' }}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={6} mb={4}>
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              fontSize="md"
              isLoading={isLoading}
              onClick={handleLoguin}
            >
              Acessar
            </Button>
          </Stack>

          <Center>
            <Text mr={1}>Ainda não possue uma conta?</Text>
            <Link href="/register">
              <Text color="blue.400">Cadastre-se</Text>
            </Link>
          </Center>

        </Flex>


      </Flex >

    </>
  );
}


// export const getServerSideProps = canSSRGuest(async (ctx) => {
export const getServerSideProps = canSSRGuest(async () => {
  return {
    props: {}
  }
})
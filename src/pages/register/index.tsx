import {
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Link as ChakraLink,
  useToast,
  Heading,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { canSSRGuest } from "@/utils/canSSRGuest";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const { signUp } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  async function handleRegister() {
    console.log(showConfirmPassword);

    if (name === "" && email === "" && password === "" && confirmPassword === "") {
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Erro na validação',
        description: 'As senhas não coincidem',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!acceptedTerms) {
      toast({
        title: 'Erro na validação',
        description: 'Você precisa aceitar os termos de uso',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    await signUp({
      name,
      email,
      password,
    });
    setIsLoading(false);
  }
  return (
    <>
      <Head>
        <title>Crie sua conta no BarberHub</title>
      </Head>
      <Flex w="100%" height="100vh" alignItems="center" justifyContent="center">
        <Flex width={540} height={640} direction="column" p={14} rounded={8} bg="gray.800" boxShadow="lg" justifyContent="center">

          <Center p={4} flexDirection="column">
            <Flex mb={3}>
              <Heading size="2xl">Barber</Heading>
              <Heading size="2xl" color="blue.400">PRO</Heading>
            </Flex>

            <Stack spacing={2} textAlign="center">
              <Heading size="lg">Crie sua conta</Heading>
              <Text color="whiteAlpha.800">
                Comece a gerenciar sua barbearia hoje mesmo
              </Text>
            </Stack>
          </Center>

          <FormControl isRequired mb={4}>
            <Input
              placeholder="Nome completo"
              name="name"
              bg="gray.700"
              border={0}
              _focus={{
                bg: 'gray.600',
                borderColor: 'blue.300',
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              bg="gray.700"
              border={0}
              _focus={{
                bg: 'gray.600',
                borderColor: 'blue.300',
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <InputGroup>
              <Input
                placeholder="Senha"
                type={showPassword ? 'text' : 'password'}
                name="password"
                bg="gray.700"
                border={0}
                _focus={{
                  bg: 'gray.600',
                  borderColor: 'blue.300',
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <FormControl isRequired mb={4}>
            <InputGroup>
              <Input
                placeholder="Confirmar senha"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                bg="gray.700"
                border={0}
                _focus={{
                  bg: 'gray.600',
                  borderColor: 'blue.300',
                }}
              />
              <InputRightElement>
                <IconButton
                  aria-label={
                    showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'
                  }
                  icon={
                    showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />
                  }
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  variant="ghost"
                  _hover={{ bg: 'transparent' }}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Stack spacing={6} mb={4}>
            <Checkbox
              isChecked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              colorScheme="blue"
            >
              Li e aceito os{' '}
              <ChakraLink color="blue.400" href="/termos" target='_blank'>
                termos de uso
              </ChakraLink>{' '}
              e{' '}
              <ChakraLink color="blue.400" href="/privacidade" target='_blank'>
                política de privacidade
              </ChakraLink>
            </Checkbox>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              fontSize="md"
              isLoading={isLoading}
              onClick={handleRegister}
            >
              Criar conta
            </Button>
          </Stack>

          <Center pt={2}>
            <Text align="center" mr={1}>
              Já tem uma conta?{' '}
            </Text>
            <Link href="/login" passHref>
              <Text color="blue.400">Faça login</Text>
            </Link>
          </Center>

        </Flex>
      </Flex>

    </>
  );
}
// export const getServerSideProps = canSSRGuest(async (ctx) => {
export const getServerSideProps = canSSRGuest(async () => {
  return {
    props: {}
  }
})
import { Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import Head from "next/head";
import logoImg from "../../../public/barberhub.png"
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { canSSRGuest } from "@/utils/canSSRGuest";

export default function Register() {
  const { signUp } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    if (name === "" && email === "" && password === "") {
      return;
    }

    await signUp({
      name,
      email,
      password,
    })
  }
  return (
    <>
      <Head>
        <title>Crie sua conta no BarberHub</title>
      </Head>
      <Flex background="barberHub.900" height="100vh" alignItems="center" justifyContent="center">
        <Flex width={540} direction="column" p={14} rounded={8}>

          <Center p={4}>
            <Image
              src={logoImg}
              alt="logo do site"
              quality={100}
              objectFit="fill"
              width={400}
            />
          </Center>

          <Input
            background="barberHub.400"
            size="lg"
            placeholder="Nome"
            type="text"
            mb={3}
            p={1}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            background="barberHub.400"
            size="lg"
            placeholder="Email"
            type="email"
            mb={3}
            p={1}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            background="barberHub.400"
            size="lg"
            placeholder="Senha"
            type="password"
            mb={6}
            p={1}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            mb={6}
            color="gray.700"
            size="lg"
            _hover={{ bg: "button.hover" }}
            onClick={handleRegister}
          >
            Acessar
          </Button>

          <Center mt={2}>
            <Link href="/login">
              <Text>Já possue uma conta? <strong style={{ color: "#C6A05B" }}>Faça login</strong></Text>
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
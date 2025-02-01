import { Button, Center, Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import logoImg from "../../public/barberhub.png"
import Head from "next/head";
import Image from "next/image";
import { Header } from "@/components/Header";
import Link from "next/link";
import { BsCalendar2Date } from "react-icons/bs";
import { PiScissorsLight } from "react-icons/pi";
import { LiaUsersCogSolid } from "react-icons/lia";
import TestimonialsCarousel from "@/components/Carousel";

export default function Home() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Head>
        <title>BarberHub - seu sistema completo.</title>
      </Head>
      <Header />
      <Flex
        background="barberHub.900"
        w="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Flex
          maxW="1280px" w="100%"
          h="700px"
          background="barberHub.900"
          color="button.default"
          direction="column"
          alignItems="center"
        >
          <Center p={4}>
            <Image
              src={logoImg}
              alt="logo do site"
              quality={100}
              objectFit="fill"
              width={500}
            />
          </Center>
          <Flex direction="column" gap={3} maxW="900px" w="100%">
            <Heading color="dourado.900" fontSize="5xl">
              Gerencie Seus Clientes com Facilidade
            </Heading>
            <Text mb={6}>A solução ideal para barbearias que desejam otimizar seus serviços.</Text>
            <Link href="/">
              <Button
                w="200px"
                bg="button.cta"
                _hover={{ bg: "button.hover", }}
              >
                Experimente Grátis
              </Button>
            </Link>
          </Flex>
        </Flex>

        <Flex gap={6} mb={4} h="300px">
          <Flex alignItems="center" justifyContent="center" direction="column" w="250px" h="250px" bg="barberHub.300" rounded="md"
            borderWidth={1}
            borderColor="dourado.900">
            <Center bg="button.hover" w="100px" h="100px" rounded="full" mb={3}>
              <BsCalendar2Date size={48} color="#2D2D2D" />
            </Center>
            <Text>Agendamentos</Text>
            <Text>Marque horários facilmente</Text>
          </Flex>

          <Flex alignItems="center" justifyContent="center" direction="column" w="250px" h="250px" bg="barberHub.300" rounded="md"
            borderWidth={1}
            borderColor="dourado.900">
            <Center bg="button.hover" w="100px" h="100px" rounded="full" mb={3}>
              <PiScissorsLight size={48} color="#2D2D2D" />
            </Center>
            <Text>Modelos de corte</Text>
            <Text>Adicione, Gerencie</Text>
          </Flex>

          <Flex alignItems="center" justifyContent="center" direction="column" w="250px" h="250px" bg="barberHub.300" rounded="md"
            borderWidth={1}
            borderColor="dourado.900">
            <Center bg="button.hover" w="100px" h="100px" rounded="full" mb={3}>
              <LiaUsersCogSolid size={48} color="#2D2D2D" />
            </Center>
            <Text>Gestão de clientes</Text>
            <Text>Agende, Gerencie</Text>
          </Flex>

        </Flex>

        <TestimonialsCarousel />

        <Flex direction="column" align="center">
          <Heading color="dourado.900" fontSize="3xl" mb={4}>
            Planos de Preços
          </Heading>

          <Flex maxW="700px" w="100%" gap={4} direction={isMobile ? "column" : "row"}>
            <Flex rounded={4} p={2} flex={1} bg="barberHub.300" direction="column">
              <Heading textAlign="center" fontSize="2xl" mt={2} mb={2}>Planop grátis</Heading>
              <Text ml={4} mb={2}>Registrar conrte</Text>
              <Text ml={4} mb={2}>Criar apenas 3 modelos de corte</Text>
              <Text ml={4} mb={2}>Editar dados do perfil</Text>
              <Text ml={4} mb={2}>Receba todas as atualizações</Text>
            </Flex>
            <Flex rounded={4} p={2} flex={1} bg="barberHub.300" direction="column" borderWidth={1} borderColor="dourado.900">
              <Heading textAlign="center" fontSize="2xl" mt={2} mb={2} color="#31fb6a">Premium</Heading>
              <Text ml={4} mb={2}>Registrar conrte ilimitados</Text>
              <Text ml={4} mb={2}>Criar modelos de corte ilimitados</Text>
              <Text ml={4} mb={2}>Editar dados do perfil</Text>
              <Text ml={4} mb={2}>Editar modelos de corte</Text>
              <Text ml={4} mb={2}>Pagina de fila de espera</Text>
              <Text ml={4} mb={2}>Receba todas as atualizações</Text>
              <Text ml={4} mb={2} color="#31fb6a" fontSize="3xl" fontWeight="bold">R$ 9.90</Text>
              <Button
                mb={2}
              >
                SEJA PREMIUM
              </Button>

            </Flex>
          </Flex>

          <Flex direction="column" w="900px" h="300px" alignItems="center" justifyContent="center" mt={4}>
            <Heading fontSize="3xl" mb={4}>
              Pronto para Transformar Sua Barbearia?
            </Heading>
            <Button>
              Comece Agora
            </Button>
          </Flex>
        </Flex >

        <Center w="100%" h="1px" bg="barberHub.100" mt={4}></Center>
        <Flex w="100%" h="50px" bg="barberHub.00" justifyContent="space-evenly" alignItems="center" mt={4} p={4}>
          <Text>Política de Privacidade | Termos de Serviço</Text>
          <Text>Rafinha.head@gmail.com</Text>
        </Flex>

      </Flex >

    </>
  );
}

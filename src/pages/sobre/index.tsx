import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
  Icon,
  Image,
  useColorModeValue,
  Stack,
  Circle,
  HStack,
  Flex,
  Link
} from '@chakra-ui/react';
import { FaStar, FaUsers, FaHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Scissors } from 'lucide-react';


const About = () => {

  const values = [
    {
      icon: FaUsers,
      title: "Compromisso com o Cliente",
      description: "Nossa prioridade é a satisfação total dos barbeiros e seus clientes."
    },
    {
      icon: FaStar,
      title: "Excelência",
      description: "Buscamos constantemente aprimorar nossos serviços e tecnologias."
    },
    {
      icon: FaHeart,
      title: "Paixão pelo Ofício",
      description: "Entendemos e compartilhamos a paixão dos profissionais pela barbearia."
    }
  ];

  return (
    <>
      <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            {/* Hero Section remains the same */}

            {/* Quem Somos Section */}
            <Box w="full">
              <Heading
                textAlign="center"
                mb={12}
                size="xl"
                bgGradient="linear(to-r, blue.400, blue.600)"
                bgClip="text"
              >
                Quem Somos
              </Heading>
              <Stack
                direction={{ base: 'column', lg: 'row' }}
                spacing={12}
                align="center"
              >
                <Box flex={1}>
                  <Text fontSize="lg" mb={6} color="gray.600" lineHeight="tall">
                    Fundada em 2025, a BarberPro nasceu da necessidade de modernizar e simplificar
                    a gestão de barbearias. Nosso sistema foi desenvolvido em estreita colaboração
                    com profissionais do ramo, garantindo que cada funcionalidade atenda às
                    necessidades reais do dia a dia.
                  </Text>
                  <Text fontSize="lg" mb={6} color="gray.600" lineHeight="tall">
                    Com uma equipe apaixonada por tecnologia e pelo universo da barbearia,
                    trabalhamos incansavelmente para oferecer as melhores soluções do mercado,
                    permitindo que nossos clientes foquem no que realmente importa: criar
                    experiências excepcionais para seus clientes.
                  </Text>
                </Box>

                <Box flex={1}>
                  <Carousel />
                </Box>

              </Stack>

              <Grid
                templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
                gap={8}
                mt={16}
              >
                {values.map((value, index) => (
                  <GridItem key={index}>
                    <VStack
                      bg='gray.200'
                      p={6}
                      borderRadius="lg"
                      shadow="md"
                      spacing={4}
                      height="full"
                    >
                      <Icon as={value.icon} w={8} h={8} color="blue.500" />
                      <Text fontWeight="bold" fontSize="xl" color="blue.500">
                        {value.title}
                      </Text>
                      <Text color="gray.600" textAlign="center">
                        {value.description}
                      </Text>
                    </VStack>
                  </GridItem>
                ))}
              </Grid>
            </Box>

          </VStack>
        </Container>
      </Box>
      <Box bg="gray.900" color="white" py={12}>
        <Container maxW="container.xl" px={6}>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="center"
            spacing={{ base: 4, md: 0 }}
          >
            <HStack spacing={2}>
              <Icon as={Scissors} boxSize={6} />
              <Text fontSize="xl" fontWeight="bold">
                BarberPro
              </Text>
            </HStack>
            <HStack spacing={6}>
              <Link href="/" _hover={{ color: 'blue.300' }}>
                Inicio
              </Link>
              <Link href="https://wa.me/65981278291?text=Oi! Deixe sua mensagem que respondo assim que pude" target='_blank' _hover={{ color: 'blue.300' }}>
                Contato
              </Link>
              <Link href="/termos" target='_blank' _hover={{ color: 'blue.300' }}>
                Termos
              </Link>
              <Link href="/privacidade" target='_blank' _hover={{ color: 'blue.300' }}>
                Privacidade
              </Link>
            </HStack>
          </Stack>
          <Text color="whiteAlpha.800" textAlign="center" mt={8}>
            © 2024 BarberPro. Todos os direitos reservados.
          </Text>
        </Container>
      </Box>
    </>
  );
};

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://res.cloudinary.com/duxqtpghn/image/upload/v1738510759/espera_dskesw.webp",
      title: "Fila de espera"
    },
    {
      image: "https://res.cloudinary.com/duxqtpghn/image/upload/v1738510759/agendar_edo42g.webp",
      title: "Agendamento de clientes"
    },
    {
      image: "https://res.cloudinary.com/duxqtpghn/image/upload/v1738510759/conta_t0wvk6.webp",
      title: "Editar informações da conta"
    },
    {
      image: "https://res.cloudinary.com/duxqtpghn/image/upload/v1738510759/corte-ativado_mml7wk.webp",
      title: "Ativar, desativar, Cadastrat"
    },
    {
      image: "https://res.cloudinary.com/duxqtpghn/image/upload/v1738510759/finalizar_xfvxvm.webp",
      title: "Finalizar atendimendo"
    }
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <Box position="relative" borderRadius="2xl" overflow="hidden" shadow="2xl">
      <Image
        src={slides[currentSlide].image}
        alt={slides[currentSlide].title}
        objectFit="cover"
        w="full"
        h="400px"
        transition="all 0.5s ease-in-out"
      />

      {/* Navigation Arrows */}
      <Flex
        position="absolute"
        top="50%"
        transform="translateY(-50%)"
        w="full"
        justify="space-between"
        px={4}
      >
        <Circle
          as="button"
          size="40px"
          bg="whiteAlpha.800"
          onClick={prevSlide}
          _hover={{ bg: 'white' }}
        >
          <Icon as={FaChevronLeft} w={5} h={5} color="gray.800" />
        </Circle>
        <Circle
          as="button"
          size="40px"
          bg="whiteAlpha.800"
          onClick={nextSlide}
          _hover={{ bg: 'white' }}
        >
          <Icon as={FaChevronRight} w={5} h={5} color="gray.800" />
        </Circle>
      </Flex>

      {/* Caption */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        bg="blackAlpha.600"
        p={4}
      >
        <Text color="white" fontWeight="bold" textAlign="center">
          {slides[currentSlide].title}
        </Text>
      </Box>

      {/* Dots */}
      <HStack
        position="absolute"
        bottom={16}
        w="full"
        justify="center"
        spacing={2}
      >
        {slides.map((_, index) => (
          <Circle
            key={index}
            size="8px"
            bg={currentSlide === index ? "white" : "whiteAlpha.600"}
            cursor="pointer"
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </HStack>
    </Box>
  );
};

export default About;
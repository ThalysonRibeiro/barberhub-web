import { AuthContext } from '@/context/AuthContext';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  Scissors,
  Calendar,
  Users,
  BarChart,
  MessageSquare,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { NextPage } from 'next';
import { useContext } from 'react';
import { IconType } from 'react-icons/lib';
import { FiLogOut, FiUser } from "react-icons/fi";
import { PiScissorsLight } from "react-icons/pi";
import TestimonialsCarousel from '@/components/Carousel';


const Home: NextPage = () => {
  const { logoutUser, user } = useContext(AuthContext);



  return (
    <Box minH="100vh" bg="gray.900">
      {/* Hero Section */}
      <Box bgGradient="linear(to-r, gray.900, blue.900)" color="white">
        <Container maxW="container.xl" px={6}>
          <Flex py={4} justify="space-between" align="center">
            <HStack spacing={2}>
              <Icon as={Scissors} boxSize={8} />
              <Text fontSize="2xl" fontWeight="bold">
                BarberPro
              </Text>
            </HStack>
            <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
              <Link href="#features" _hover={{ color: 'blue.300' }}>
                Recursos
              </Link>
              <Link href="#benefits" _hover={{ color: 'blue.300' }}>
                Benefícios
              </Link>
              <Link href="#pricing" _hover={{ color: 'blue.300' }}>
                Preços
              </Link>
            </HStack>


            {!user ? (
              <>
                <Link href="/register">
                  <Button variant="outline">Começar Agora</Button>
                </Link>
              </>
            ) : (
              <Flex gap={6} >
                <Text>{user?.name}</Text>
                <Link href="/dashboard">
                  <FiUser size={28} color="white" />
                </Link>
                <Flex onClick={logoutUser} cursor="pointer">
                  <FiLogOut size={28} color="#FF4040" />
                </Flex>
              </Flex>
            )}
          </Flex>

          <VStack py={24} spacing={6} textAlign="center">
            <Heading as="h1" size="2xl" maxW="3xl">
              Gerencie sua barbearia com excelência
            </Heading>
            <Text fontSize="xl" color="whiteAlpha.800" maxW="2xl">
              Sistema completo de gestão para barbearias modernas.
              Simplifique seu trabalho e ofereça uma experiência única aos seus clientes.
            </Text>
            <Button size="lg" colorScheme="blue">
              Experimente Grátis
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20} bg="gray.800" id="features">
        <Container maxW="container.xl" px={6}>
          <VStack spacing={16}>
            <Heading textAlign="center">Recursos Principais</Heading>
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
              gap={12}
            >
              <FeatureCard
                icon={Calendar}
                title="Agendamento Online"
                description="Sistema intuitivo para agendar seus clientes"
              />
              <FeatureCard
                icon={Users}
                title="Gestão de Clientes"
                description="Gestão de clientes, Agende, Gerencie"
              />
              <FeatureCard
                icon={PiScissorsLight}
                title="Cadastro de Dodelos"
                description="Modelos de corte, Adicione, Gerencie"
              />
            </Grid>
          </VStack>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box py={20} bg="gray.900" id="benefits">
        <Container maxW="container.xl" px={6}>
          <VStack spacing={16}>
            <Heading textAlign="center">Por que escolher o BarberPro?</Heading>
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
              gap={12}
            >
              <BenefitItem
                icon={Clock}
                title="Economia de Tempo"
                description="Agilize os processos e foque no que realmente importa"
              />
              <BenefitItem
                icon={MessageSquare}
                title="Comunicação Eficiente"
                description="Lembretes automáticos e comunicação direta com clientes"
              />
              <BenefitItem
                icon={CheckCircle}
                title="Satisfação Garantida"
                description="98% dos nossos clientes recomendam o BarberPro"
              />
              <BenefitItem
                icon={BarChart}
                title="Crescimento do Negócio"
                description="Aumento médio de 40% no faturamento dos nossos clientes"
              />
            </Grid>
          </VStack>
        </Container>
        <TestimonialsCarousel />
      </Box>

      {/* Pricing Section */}
      <Box py={20} bg="gray.800" id="pricing">
        <Container maxW="container.xl" px={6}>
          <VStack spacing={16}>
            <Heading textAlign="center">Planos e Preços</Heading>
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
              gap={8}
              maxW="4xl"
              w="full"
            >
              <PriceCard
                title="Básico"
                price="R$ 00"
                features={[
                  'Agendamento de clientes',
                  'Criar apenas 3 modelos de corte',
                  'Editar dados do perfil',
                ]}
              />
              <PriceCard
                featured={true}
                title="Premium"
                price="R$ 9,90"
                features={[
                  'Registrar conrte ilimitados',
                  'Criar modelos de corte ilimitados<',
                  'Editar dados do perfil',
                  'Editar modelos de corte',
                  'Pagina de fila de espera',
                  'Receba todas as atualizações',
                ]}
              />
            </Grid>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
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
              <Link href="/sobre" target='_blank' _hover={{ color: 'blue.300' }}>
                Sobre
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
    </Box>
  );
};

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <VStack
      bg="gray.700"
      p={8}
      rounded="xl"
      shadow="lg"
      _hover={{ shadow: 'xl', transform: 'translateY(-2px)' }}
      transition="all 0.2s"
      spacing={4}
    >
      <Icon as={icon} boxSize={8} color="blue.400" />
      <Heading size="md">{title}</Heading>
      <Text color="whiteAlpha.800" textAlign="center">
        {description}
      </Text>
    </VStack>
  );
};

interface BenefitItemProps {
  icon: IconType;
  title: string;
  description: string;
}

const BenefitItem = ({ icon, title, description }: BenefitItemProps) => {
  return (
    <HStack align="start" spacing={4}>
      <Icon as={icon} boxSize={6} color="blue.400" flexShrink={0} />
      <Box>
        <Heading size="md" mb={2}>
          {title}
        </Heading>
        <Text color="whiteAlpha.800">{description}</Text>
      </Box>
    </HStack>
  );
};

interface PriceCardProps {
  title: string;
  price: string;
  features: string[];
  featured?: boolean;
}

const PriceCard = ({
  title,
  price,
  features,
  featured = false,
}: PriceCardProps) => {
  return (
    <Box
      bg="gray.700"
      rounded="xl"
      shadow="lg"
      p={8}
      transform={featured ? 'scale(1.05)' : undefined}
      border={featured ? '2px' : undefined}
      borderColor={featured ? 'blue.400' : undefined}
      _hover={{ transform: featured ? 'scale(1.07)' : 'scale(1.02)' }}
      transition="transform 0.2s"
    >
      <VStack spacing={6}>
        <Heading size="md">{title}</Heading>
        <HStack spacing={1}>
          <Text fontSize="3xl" fontWeight="bold">
            {price}
          </Text>
          <Text color="whiteAlpha.800">/mês</Text>
        </HStack>
        <VStack spacing={3} align="stretch" w="full">
          {features.map((feature, index) => (
            <HStack key={index} spacing={2}>
              <Icon as={CheckCircle} boxSize={5} color="blue.400" />
              <Text color="whiteAlpha.900">{feature}</Text>
            </HStack>
          ))}
        </VStack>
        <Link href="/register" w="full">
          <Button
            w="full"
            variant={featured ? 'solid' : 'outline'}
            colorScheme={featured ? 'blue' : 'gray'}
          >
            Começar Agora
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default Home;
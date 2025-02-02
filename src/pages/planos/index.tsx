import { SideBar } from "@/components/SideBar";
import { setupAPIClient } from "@/services/api";
import { getStripeJs } from "@/services/stripe-js";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Box, Button, Flex, Heading, HStack, Icon, Text, useMediaQuery, VStack } from "@chakra-ui/react";
import { CheckCircle } from "lucide-react";
import Head from "next/head";

interface PlanosProps {
  premium: boolean;
}

export default function Planos({ premium }: PlanosProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const handleSubscribe = async () => {
    if (premium) {
      return;
    }

    try {
      const apiCLient = setupAPIClient();
      const response = await apiCLient.post('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId: sessionId });

    } catch (error) {
      console.log(error);
    }
  }

  async function handleCreatePortal() {
    try {
      if (!premium) {
        return;
      }

      const apiClient = setupAPIClient();
      const response = await apiClient.post('/create-portal');

      const { sessionId } = response.data;

      window.location.href = sessionId;

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Modelos de corte</title>
      </Head>
      <SideBar>
        <Flex direction="column" alignItems="center" justifyContent="flex-start">

          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="center"
          >
            <Heading fontSize={isMobile ? "28px" : "3xl"} mt={4} mb={4} mr={4}>Planos</Heading>
          </Flex>

          <Flex
            p={8}
            maxW="780px"
            w="100%"
            direction="column"
            align="center"
            justify="center"
          >
            <Flex w="100%" gap={4} direction={isMobile ? "column" : "row"}>

              <PriceCard
                title="Básico"
                price="R$ 00"
                features={[
                  'Agendamento de clientes',
                  'Criar apenas 3 modelos de corte',
                  'Editar dados do perfil',
                ]}
                premium={premium}
                isFirstCard={false}
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
                premium={premium}
                handleSubscribe={handleSubscribe}
                handleCreatePortal={handleCreatePortal}
                isFirstCard={true}
              />

            </Flex>
          </Flex>

        </Flex>
      </SideBar>
    </>
  )
}

interface PriceCardProps {
  title: string;
  price: string;
  features: string[];
  featured?: boolean;
  premium: boolean;
  handleSubscribe?: () => void;
  handleCreatePortal?: () => void;
  isFirstCard?: boolean;
}

const PriceCard = ({
  title,
  price,
  features,
  featured = false,
  premium,
  handleSubscribe,
  handleCreatePortal,
  isFirstCard = false
}: PriceCardProps) => {
  return (
    <Box
      bg="gray.700"
      rounded="xl"
      shadow="lg"
      p={8}
      m={1}
      transform={featured ? 'scale(1.05)' : undefined}
      border={featured ? '2px' : undefined}
      borderColor={featured ? 'blue.400' : undefined}
      _hover={{ transform: featured ? 'scale(1.07)' : 'scale(1.02)' }}
      transition="transform 0.2s"
    >
      <VStack spacing={3}>
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

        {isFirstCard && (
          <>
            <Button
              w="full"
              mb={2}
              variant={featured ? 'solid' : 'outline'}
              colorScheme={featured ? 'blue' : 'gray'}
              disabled={premium}
              onClick={handleSubscribe}
            >
              {premium ? "VOCÊ JÁ É PREMIUM" : "SEJA PREMIUM"}
            </Button>

            {premium && (
              <Button
                w="full"
                bg="black"
                color="white"
                _hover={{ bg: "button.hover" }}
                onClick={handleCreatePortal}
              >
                ALTERAR ASSINATURA
              </Button>
            )}
          </>
        )}
      </VStack>
    </Box>
  );
};

export const getServerSideProps = canSSRAuth(async (ctx) => {

  try {
    const apiCLient = setupAPIClient(ctx);
    const response = await apiCLient.get('/me');

    return {
      props: {
        premium: response.data?.subscriptions?.status === 'active' ? true : false
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

});
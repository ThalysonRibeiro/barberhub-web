import { SideBar } from "@/components/SideBar";
import { Button, Flex, Heading, Stack, Switch, Text, useMediaQuery } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { IoMdPricetag } from "react-icons/io";



export default function Haircurts() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

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
            justifyContent="flex-start"
          >
            <Heading fontSize={isMobile ? "28px" : "3xl"} mt={4} mb={4} mr={4}>Modelos de corte</Heading>

            <Link href="/haircurts/new">
              <Button
                background="button.cta"
                color="gray.700"
                size="sm"
                _hover={{ bg: "button.hover" }}
              >
                Cadastrar novo
              </Button>
            </Link>

            <Stack ml="auto" mb={2} align="center" direction="row">
              <Text>ATIVOS</Text>
              <Switch colorScheme="green" size="lg" />
            </Stack>

          </Flex>

          <Link href="/haircurts/123" style={{ width: "100%" }}>
            <Flex
              cursor="pointer"
              w="100%"
              p={4}
              bg="barberHub.300"
              direction={isMobile ? "column" : "row"}
              align={isMobile ? "flex-start" : "center"}
              rounded="4"
              mb={2}
              justifyContent="space-between"
            >
              <Flex mb={isMobile ? 2 : 0} direction="row" alignItems="center" justifyContent="center">
                <IoMdPricetag size={28} color="#C6A05B" />
                <Text ml={4} noOfLines={1}>
                  Corte completo
                </Text>
              </Flex>

              <Text color="#C6A05B" fontWeight="bold">R$ 59.99</Text>
            </Flex>

          </Link>

        </Flex>


      </SideBar>
    </>
  )
}


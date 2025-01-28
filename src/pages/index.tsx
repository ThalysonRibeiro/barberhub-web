import { Flex, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>BarberHub - seu sistema completo.</title>
      </Head>
      <Flex background="barberHub.900" color="button.default">
        <Text>Project</Text>

      </Flex>

    </>
  );
}

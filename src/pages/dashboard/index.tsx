import { SideBar } from "@/components/SideBar";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Flex, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>BarberHub - Dashboard</title>
      </Head>
      <SideBar>
        <Flex>
          <Text>Bem vindo a Dashboard</Text>
        </Flex>
      </SideBar>
    </>
  )
}

// export const getServerSideProps = canSSRAuth(async (ctx) => {
export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {

    }
  }
})
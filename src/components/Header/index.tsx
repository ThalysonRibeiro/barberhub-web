import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";

export function Header() {
  return (
    <>
      <Flex background="barberHub.900" w="100%" h={20} alignItems="center" justifyContent="center">
        <Flex maxW="1280px" w="100%" alignItems="center" justifyContent="flex-end" gap={4} p={1}>
          <Link href="/login">
            <Button
              bg="button.cta"
              color="barberHub.200"
              _hover={{ bg: "button.hover", color: "button.gray" }}
            >
              Entrar
            </Button>
          </Link>
          <Link href="/register">
            <Button
              bg="button.cta"
              color="barberHub.200"
              _hover={{ bg: "button.hover", color: "button.gray" }}
            >
              Registrar
            </Button>
          </Link>
        </Flex>

      </Flex>
    </>
  )
}
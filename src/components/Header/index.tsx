import { AuthContext } from "@/context/AuthContext";
import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";

export function Header() {
  const { logoutUser, user } = useContext(AuthContext);

  return (
    <Flex background="barberHub.900" w="100%" h={20} alignItems="center" justifyContent="center">
      <Flex maxW="1280px" w="100%" alignItems="center" justifyContent="flex-end" gap={4} p={1}>
        {!user ? (
          <>
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
          </>
        ) : (
          <Flex gap={6} >
            <Link href="/dashboard">
              <FiUser size={28} color="#C6A05B" />
            </Link>
            <Text>{user.name}</Text>
            <Flex onClick={logoutUser} cursor="pointer" mr={4}>
              <FiLogOut size={28} color="#8B0000" />
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

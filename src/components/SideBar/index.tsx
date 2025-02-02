import { IconType } from "react-icons/lib";
import {
  FiScissors,
  FiClipboard,
  FiSettings,
  FiMenu
} from "react-icons/fi";
import {
  Box,
  BoxProps,
  Drawer,
  Flex,
  FlexProps,
  Icon,
  Text,
  useDisclosure,
  DrawerContent,
  useColorModeValue,
  CloseButton,
  IconButton
} from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { LiaUsersSolid } from "react-icons/lia";
import { setupAPIClient } from "@/services/api";

interface LinkItemsProps {
  name: string;
  icon: IconType;
  route: string;
}

const LinkSubscription: LinkItemsProps[] = [
  { name: "Fila de espera", icon: LiaUsersSolid, route: "/espera" },
]

const LinkItems: LinkItemsProps[] = [

  { name: "Agendar", icon: FiClipboard, route: "/dashboard" },
  { name: "Cortes", icon: FiScissors, route: "/haircurts" },
  { name: "Minha Conta", icon: FiSettings, route: "/profile" },
]

export function SideBar({ children }: { children: ReactNode }) {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg="gray.800">
      <SideBarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />

      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
        onClose={onClose}
      >
        <DrawerContent>
          <SideBarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p={4}>
        {children}
      </Box>
    </Box>
  )
}

interface SideBarProps extends BoxProps {
  onClose: () => void;
}


const SideBarContent = ({ onClose, ...rest }: SideBarProps) => {
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/haircut/check');

        setHasSubscription(response.data?.subscriptions?.status === 'active');
      } catch (error) {
        console.error(error);
      }
    };
    checkSubscription();
  }, []);

  return (
    <Box
      bg="gray.900"
      borderRightWidth={1}
      borderRightColor={useColorModeValue('blue.900', 'blue.900')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" justifyContent="space-between" mx="8">
        <Link href="/dashboard">
          <Flex cursor="pointer" userSelect="none" flexDirection="row">
            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="white">Barber</Text>
            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="blue.400">PRO</Text>
          </Flex>
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>


      {hasSubscription && LinkSubscription.map(link => (
        <NavItems icon={link.icon} route={link.route} key={link.name}>
          {link.name}
        </NavItems>

      ))}

      {LinkItems.map(link => (
        <NavItems icon={link.icon} route={link.route} key={link.name}>
          {link.name}
        </NavItems>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  route: string;
}

const NavItems = ({ icon, children, route, ...rest }: NavItemProps) => {
  return (
    <Link href={route} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        color="white"
        _hover={{
          bg: 'gray.800',
          color: 'blue.300',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr={4}
            fontSize="16"
            as={icon}
            _groupHover={{
              color: 'blue.300'
            }}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

interface MobileProps {
  display?: {
    base: string;
    md: string;
  };
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('gray.800', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('blue.900', 'blue.900')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        borderColor="blue.900"
        color="blue.900"
        aria-label="open menu"
        _hover={{
          color: 'blue.300',
          borderColor: 'blue.300',
        }}
        onClick={onOpen}
        icon={<FiMenu />}
      />
      <Flex flexDirection="row">
        <Text ml={8} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Barber
        </Text>
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="blue.400">
          HUB
        </Text>
      </Flex>

    </Flex >
  )
}
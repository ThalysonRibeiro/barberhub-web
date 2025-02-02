import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import { FiUser, FiScissors } from "react-icons/fi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { ScheduleItem } from "@/pages/dashboard";

interface ModalINfoProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: ScheduleItem;
  finishService: () => Promise<void>;
}

export function ModalInfo({ isOpen, onOpen, onClose, data, finishService }: ModalINfoProps) {
  return (
    <>

      <Modal isOpen={isOpen} onClose={onClose}>
        <Button onClick={onOpen}>Open Modal</Button>
        <ModalOverlay />
        <ModalContent bg="gray.700">
          <ModalHeader>Próximo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex align="center" mb={3}>
              <FiUser size={28} color="#4299e1" />
              <Text ml={3} fontSize="2xl" fontWeight="bold" color="white">
                {data?.customer}
              </Text>
            </Flex>
            <Flex align="center" mb={3}>
              <FiScissors size={28} color="#4299e1" />
              <Text ml={3} fontSize="large" fontWeight="bold" color="white">
                {data?.haircut?.name}
              </Text>
            </Flex>
            <Flex align="center" mb={3}>
              <FaMoneyBillAlt size={28} color="#46ef75" />
              <Text ml={3} fontSize="large" fontWeight="bold" color="white">
                R$  {data?.haircut?.price}
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              color="white"
              size="md"
              onClick={() => finishService()}
            >Finalizar serviço</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
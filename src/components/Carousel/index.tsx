import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Avatar,
  Container,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const testimonials = [
  {
    name: 'João S.',
    image: '/path-to-image-1.jpg',
    text: 'Excelente ferramenta para minha barbearia!',
    role: 'Proprietário da Barbearia X',
    star: 5,
  },
  {
    name: 'Ana P.',
    image: '/path-to-image-2.jpg',
    text: 'Facilitou muito o agendamento!',
    role: 'Cliente',
    star: 5,
  },
  {
    name: 'John B.',
    image: '/path-to-image-2.jpg',
    text: 'Excelente ferramenta!',
    role: 'Proprietário da Barbearia Barber King',
    star: 5,
  },
  {
    name: 'Sara C.',
    image: '/path-to-image-2.jpg',
    text: 'Excelente ferramenta!',
    role: 'Proprietário da Barbearia Barber King',
    star: 4,
  },
];

const StarRating = ({ rating }) => (

  <Flex>
    {[...Array(5)].map((_, index) => (
      <StarIcon key={index} color={index < rating ? 'yellow.400' : 'gray.300'} />
    ))}
  </Flex>
);

const TestimonialCard = ({ testimonial }) => (


  <Box
    bg="gray.800"
    p={6}
    borderRadius="lg"
    boxShadow="xl"
    width="300px"
    mx={2}
    borderWidth="1px"
    borderColor="gray.700"
    flex="0 0 auto"
  >
    <Flex direction="column" align="center" textAlign="center">
      <Avatar size="lg" name={testimonial.name} src={testimonial.image} mb={4} />
      <Text color="white" fontSize="lg" fontWeight="bold" mb={2}>
        &quot;{testimonial.text}&quot;
      </Text>
      <Text color="gray.400" fontSize="md" mb={1}>
        - {testimonial.name}
      </Text>
      <Text color="gray.500" fontSize="sm">{testimonial.role}</Text>
      <StarRating rating={testimonial.star} />
    </Flex>
  </Box>
);

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollAmount = 304; // Largura do card + margin

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length); // Muda para o próximo ou volta ao primeiro
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000); // Mova a cada 5 segundos
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <Container maxW="container.xl" py={6}>
      <Box position="relative">
        <Flex align="center" justify="center" overflow="hidden" px={8}>
          <Flex width="100%" overflow="hidden">
            <Flex
              transition="transform 0.5s ease-in-out"
              transform={`translateX(-${currentIndex * scrollAmount}px)`} // Aplica a transformação com base no índice atual
              gap={4}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default TestimonialsCarousel;
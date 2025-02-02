import { StarIcon } from '@chakra-ui/icons';
import React from 'react';
import { Box, Flex, Text, Avatar, useMediaQuery } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'João S.',
    image: '',
    text: 'Excelente ferramenta para minha barbearia!',
    role: 'Proprietário da Barbearia Tradição & Estilo',
    star: 5,
  },
  {
    name: 'Ana P.',
    image: '',
    text: 'Facilitou muito o agendamento!',
    role: 'Cliente',
    star: 5,
  },
  {
    name: 'John B.',
    image: '',
    text: 'Excelente ferramenta!',
    role: 'Proprietário da Barbearia Cabeleira & Navalha',
    star: 5,
  },
  {
    name: 'Jhon C.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf01KkA7W5PuZxiU8_bAdM4jpq6ev6ACIvGg&s',
    text: 'Excelente ferramenta!',
    role: 'Proprietário da Barbearia O Rei da Tesoura',
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
    width={{ base: "100%", sm: "350px", md: "340px", lg: "475px" }}
    mx="auto"
    borderWidth="1px"
    borderColor="gray.700"

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
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  return (
    <Box maxW={isMobile ? "400px" : "1280px"} w="100%" mx="auto" p={4} mt={8}>
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={isMobile ? 1 : 2}
        spaceBetween={20}
        className="mySwiper"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <TestimonialCard testimonial={testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default TestimonialsCarousel;
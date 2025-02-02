import React from 'react';
import { Box, Heading, Text, VStack, Divider, Container } from '@chakra-ui/react';

export default function TemosDeUso() {
  return (
    <Container maxW="1280px" p={4} centerContent>
      <Box w="100%">
        <Heading as="h1" size="2xl" mb={4} textAlign="center">
          Termos de Uso do BarberPro
        </Heading>
        <Text mb={4} textAlign="center">Última atualização: 1 de fevereiro de 2025</Text>

        <VStack spacing={4} align="start">
          <Text>
            <strong>1. Aceitação dos Termos</strong> Ao acessar e utilizar o site BarberPro, você concorda em cumprir e estar sujeito aos seguintes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve utilizar o site.
          </Text>
          <Text>
            <strong>2. Descrição dos Serviços</strong> O BarberPro oferece uma plataforma para profissionais de barbearia agendarem clientes, adicionar modelos de corte de cabelo e barba, editar informações da conta e acessar serviços de subscrição. Ao usar nossos serviços, você declara que todas as informações fornecidas são precisas e atuais.
          </Text>
          <Text>
            <strong>3. Cadastro e Conta</strong> Para acessar certas funcionalidades do BarberPro, é necessário criar uma conta. Ao se registrar, você concorda em fornecer informações precisas e completas. Você é responsável por manter a confidencialidade das credenciais de login e por todas as atividades que ocorram sob sua conta.
          </Text>
          <Text>
            <strong>4. Subscrição</strong> O BarberPro oferece planos de subscrição que permitem acesso a funcionalidades premium. Os detalhes sobre os valores, formas de pagamento e renovação automática são disponibilizados durante o processo de adesão à subscrição. Caso decida cancelar, você pode fazê-lo a qualquer momento nas configurações da conta, sendo que o cancelamento só terá efeito ao final do ciclo de pagamento em vigor.
          </Text>
          <Text>
            <strong>5. Agendamento de Clientes</strong> O BarberPro permite que os usuários agendem clientes diretamente pela plataforma. É sua responsabilidade garantir que as informações de agendamento estejam corretas e que qualquer alteração ou cancelamento seja feita com antecedência adequada. O BarberPro não se responsabiliza por qualquer perda ou dano resultante de agendamentos incorretos ou cancelamentos não comunicados.
          </Text>
          <Text>
            <strong>6. Modelos de Corte de Cabelo e Barba</strong> Os usuários podem adicionar modelos de corte de cabelo e barba na plataforma. Ao fazer isso, você garante que tem todos os direitos legais para publicar o conteúdo. Não serão permitidos uploads de conteúdo que violem direitos de terceiros, como direitos autorais ou marcas registradas.
          </Text>
          <Text>
            <strong>7. Edição de Informações da Conta</strong> Os usuários podem editar suas informações pessoais e profissionais através das configurações da conta. É de sua responsabilidade manter suas informações atualizadas e precisas.
          </Text>
          <Text>
            <strong>8. Propriedade Intelectual</strong> Todos os direitos de propriedade intelectual relacionados ao conteúdo do BarberPro, incluindo textos, gráficos, logotipos e softwares, são de propriedade exclusiva do BarberPro ou de seus licenciadores. Você concorda em não copiar, distribuir, modificar ou criar trabalhos derivados sem nossa autorização expressa por escrito.
          </Text>
          <Text>
            <strong>9. Uso Aceitável</strong> Ao utilizar o BarberPro, você concorda em não: Utilizar o serviço de maneira que possa violar qualquer lei ou regulamento aplicável; Publicar ou transmitir qualquer conteúdo que seja difamatório, ofensivo ou prejudicial; Realizar qualquer tentativa de hackear, interferir ou comprometer a integridade da plataforma.
          </Text>
          <Text>
            <strong>10. Limitação de Responsabilidade</strong> O BarberPro não se responsabiliza por quaisquer perdas ou danos diretos ou indiretos decorrentes do uso ou da incapacidade de usar o site, incluindo, mas não limitado a, falhas de sistema, perda de dados ou interrupção de serviço.
          </Text>
          <Text>
            <strong>11. Modificações dos Termos</strong> Reservamo-nos o direito de alterar ou atualizar estes Termos de Uso a qualquer momento. Quaisquer alterações serão publicadas nesta página, e o uso contínuo do BarberPro após essas alterações constitui sua aceitação das mudanças.
          </Text>
          <Text>
            <strong>12. Cancelamento e Encerramento</strong> Você pode encerrar sua conta a qualquer momento através das configurações da conta. O BarberPro se reserva o direito de suspender ou encerrar sua conta caso haja violação destes Termos de Uso.
          </Text>
          <Text>
            <strong>13. Lei Aplicável</strong> Estes Termos de Uso serão regidos e interpretados de acordo com as leis Brasil. Qualquer litígio decorrente destes termos será resolvido nos tribunais Brasil.
          </Text>
          <Text>
            <strong>14. Contato</strong> Se você tiver qualquer dúvida sobre estes Termos de Uso, entre em contato conosco através de rafinha.head@gmail.com.
          </Text>
        </VStack>

        <Divider my={4} />
        <Text textAlign="center">© 2025 BarberPro. Todos os direitos reservados.</Text>
      </Box>
    </Container>
  );
}
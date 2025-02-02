import React from 'react';
import { Box, Container, Heading, VStack, Divider } from '@chakra-ui/react';

export default function Privacidade() {
  return (
    <Container maxW="1280px" p={4} centerContent>
      <Box w="100%">
        <Heading as="h1" size="2xl" mb={4} textAlign="center">
          Política de Privacidade do BarberPro
        </Heading>
        <Box mb={4} textAlign="center">Última atualização: 1 de fevereiro de 2025</Box>

        <VStack spacing={4} align="start">
          <Box>
            <strong>1. Introdução</strong> Esta Política de Privacidade descreve como o BarberPro coleta, usa, compartilha e protege as informações pessoais dos usuários. Ao utilizar nosso site, você concorda com a coleta e uso das informações conforme descrito nesta política.
          </Box>
          <Box>
            <strong>2. Informações que Coletamos</strong> Coletamos diferentes tipos de informações para fornecer e melhorar nossos serviços, incluindo:
            <ul>
              <li><strong>Informações Pessoais:</strong> Quando você se cadastra, solicitamos informações como nome, e-mail, número de telefone, e dados de pagamento em caso de subscrição.</li>
              <li><strong>Informações de Uso:</strong> Coletamos automaticamente informações sobre sua interação com o site, como endereço IP, tipo de navegador e páginas visitadas.</li>
              <li><strong>Informações de Agendamento:</strong> Coletamos informações relacionadas aos agendamentos feitos na plataforma, como horários e serviços solicitados.</li>
            </ul>
          </Box>
          <Box>
            <strong>3. Uso das Informações</strong> Usamos as informações que coletamos para:
            <ul>
              <li><strong>Fornecer nossos serviços:</strong> Como agendar clientes, exibir modelos de corte de cabelo e barba, e gerenciar assinaturas.</li>
              <li><strong>Comunicação:</strong> Enviar e-mails sobre atualizações, promoções e avisos importantes.</li>
              <li><strong>Melhorar o site:</strong> Analisar como os usuários utilizam a plataforma para aprimorar a experiência.</li>
            </ul>
          </Box>
          <Box>
            <strong>4. Compartilhamento de Informações</strong> Não compartilhamos suas informações pessoais com terceiros, exceto nos seguintes casos:
            <ul>
              <li><strong>Provedores de Serviço:</strong> Podemos compartilhar suas informações com empresas que nos ajudam a operar o site, como plataformas de pagamento e servidores de hospedagem.</li>
              <li><strong>Cumprimento da Lei:</strong> Podemos divulgar suas informações se exigido por lei ou para proteger nossos direitos legais.</li>
            </ul>
          </Box>
          <Box>
            <strong>5. Segurança das Informações</strong> Nós tomamos medidas para proteger suas informações pessoais contra acessos não autorizados, alteração ou destruição. No entanto, nenhum sistema de segurança é 100% eficaz, e não podemos garantir a segurança absoluta dos seus dados.
          </Box>
          <Box>
            <strong>6. Cookies</strong> Nosso site utiliza cookies para melhorar sua experiência de navegação. Cookies são pequenos arquivos de texto armazenados no seu navegador que nos ajudam a lembrar suas preferências e personalizar sua experiência.
            <ul>
              <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento do site.</li>
              <li><strong>Cookies de Desempenho:</strong> Coletam informações sobre como você usa o site, ajudando-nos a melhorar.</li>
            </ul>
            Você pode gerenciar ou desativar cookies através das configurações do seu navegador.
          </Box>
          <Box>
            <strong>7. Seus Direitos</strong> Você tem o direito de:
            <ul>
              <li><strong>Acessar e Retificar:</strong> Solicitar acesso ou correção de suas informações pessoais.</li>
              <li><strong>Excluir Conta:</strong> Solicitar a exclusão da sua conta e dados associados.</li>
              <li><strong>Revogar Consentimento:</strong> Revogar o consentimento para o uso de seus dados pessoais a qualquer momento.</li>
            </ul>
            Para exercer esses direitos, entre em contato conosco através de rafinha.head@gmail.com.
          </Box>
          <Box>
            <strong>8. Retenção de Dados</strong> Mantemos suas informações pessoais apenas pelo tempo necessário para fornecer nossos serviços ou conforme exigido por lei. Quando não precisarmos mais dessas informações, tomaremos medidas para excluí-las de forma segura.
          </Box>
          <Box>
            <strong>9. Alterações nesta Política de Privacidade</strong> Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer alterações serão publicadas nesta página, e recomendamos que você a revise regularmente. O uso contínuo do site após as alterações constitui a aceitação da nova política.
          </Box>
          <Box>
            <strong>10. Contato</strong> Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, entre em contato conosco através de rafinha.head@gmail.com.
          </Box>
        </VStack>

        <Divider my={4} />
        <Box textAlign="center">© 2023 BarberPro. Todos os direitos reservados.</Box>
      </Box>
    </Container>
  );
}

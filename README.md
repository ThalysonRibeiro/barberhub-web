# BarberPro 💈

## Descrição do Projeto

BarberHub é um sistema web completo para gerenciamento de barbearias, oferecendo funcionalidades abrangentes para administração de clientes, serviços e planos.

## 🚀 Funcionalidades Principais

- **Gestão de Clientes**
  - Cadastro e gerenciamento de clientes
  - Histórico de serviços realizados
  - Controle de fidelização

- **Tipos de Corte**
  - Adicionar novos tipos de corte
  - Editar detalhes dos serviços
  - Ativar/desativar serviços

- **Fila de Espera**
  - Sistema integrado de agendamento
  - Controle de ordem de atendimento
  - Notificações para clientes

- **Planos e Benefícios**
  - Criação de planos personalizados
  - Benefícios exclusivos para assinantes
  - Integração com sistema de pagamento

## 🛠️ Tecnologias Utilizadas

- **Frontend**
  - Next.js 15
  - React 19
  - Chakra UI
  - Framer Motion
  - TypeScript

- **Autenticação**
  - JWT (jwt-decode)
  - Nookies para gerenciamento de cookies

- **Integração e Utilitários**
  - Axios para requisições HTTP
  - Stripe.js para pagamentos
  - React Icons
  - Swiper para componentes de slider

## 📦 Instalação

### Pré-requisitos
- Node.js (versão 20+)
- npm ou yarn

### Passos para Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/barberhub.git
cd barberhub
```

2. Instale as dependências
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente
- Crie um arquivo `.env.local`
- Adicione suas variáveis de configuração

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

## 🔐 Variáveis de Ambiente

Configure as seguintes variáveis no seu `.env.local`:
- `NEXT_PUBLIC_API_URL`: URL da API backend
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Chave pública do Stripe
- Outras variáveis específicas do seu projeto

## 🚀 Deploy

O projeto está configurado para deploy fácil em plataformas como Vercel:
```bash
npm run build
npm start
```

## 🤝 Contribuições

1. Faça um fork do projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## 📞 Contato

Seu Nome - seu-email@exemplo.com

Link do Projeto: [https://github.com/seu-usuario/barberhub](https://github.com/seu-usuario/barberhub)
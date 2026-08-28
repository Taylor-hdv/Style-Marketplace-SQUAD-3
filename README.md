# Style Marketplace

Trabalho final desenvolvido pelo Squad 3 no treinamento tecnico de 2026.2 da EJCM (Empresa Junior de Consultoria em Micro Informatica) da UFRJ. O projeto consiste em um marketplace de moda com backend em Node.js/Express e frontend em React.

O projeto ainda esta em desenvolvimento.

## Tecnologias

### Backend

- Node.js com TypeScript
- Express 5
- Prisma ORM com adaptador PostgreSQL (`@prisma/adapter-pg`)
- Zod para validacao de dados
- JSON Web Token (JWT) com chaves RSA para autenticacao
- Nodemailer para envio de e-mails (via Mailtrap)
- ts-node-dev para desenvolvimento

### Frontend

- React 19 com TypeScript
- Vite 8
- Tailwind CSS 4
- React Router 8
- React Hook Form com Zod (`@hookform/resolvers`)
- Axios para requisicoes HTTP
- react-maskedinput para mascara de input de telefone

## Estrutura do Projeto

```
Style-Marketplace-SQUAD-3/
├── back/
│   ├── prisma.config.ts
│   ├── .env.example
│   └── src/
│       ├── server.ts
│       ├── config/
│       │   ├── auth.ts
│       │   ├── dotenv.ts
│       │   ├── generateKeyPairs.ts
│       │   ├── mailer.ts
│       │   ├── prisma.ts
│       │   ├── TelephoneValidator.ts
│       │   └── VariantValidator.ts
│       ├── controllers/
│       │   ├── UserController.ts
│       │   ├── productController.ts
│       │   ├── variantController.ts
│       │   ├── categoryController.ts
│       │   ├── TelephoneController.ts
│       │   ├── reviewController.ts
│       │   ├── CartController.ts
│       │   └── OrderController.ts
│       ├── middlewares/
│       │   ├── authMiddleware.ts
│       │   └── Validate.ts
│       ├── models/
│       │   ├── schema.prisma
│       │   └── migrations/
│       ├── schemas/
│       │   ├── UserSchema.ts
│       │   ├── productSchema.ts
│       │   └── reviewSchema.ts
│       ├── seeders/
│       │   └── seed.ts
│       └── routes/
│           └── routes.ts
└── front/
    ├── vite.config.ts
    ├── tailwind.config.ts
    └── src/
        ├── App.tsx
        ├── main.tsx
        ├── API.tsx
        ├── globals.css
        ├── schemas/
        │   └── schema.tsx
        ├── pages/
        │   ├── Home.tsx
        │   ├── SignIn.tsx
        │   ├── SignUp.tsx
        │   ├── Profile.tsx
        │   └── ProductInfo.tsx
        ├── components/
        │   ├── button/
        │   │   └── Button.tsx
        │   ├── cardCategory/
        │   │   └── CardCategory.tsx
        │   ├── cardProduct/
        │   │   └── CardProduct.tsx
        │   ├── header&footer/
        │   │   ├── Header.tsx
        │   │   └── Footer.tsx
        │   └── productInfo/
        │       ├── Colors.tsx
        │       ├── Sizes.tsx
        │       ├── Tags.tsx
        │       ├── Images.tsx
        │       ├── ImagesNav.tsx
        │       └── OtherProductCard.tsx
        └── assets/
            ├── logo/
            ├── header/
            ├── home/
            ├── signUp/
            ├── profile/
            ├── productInfo/
            ├── cardProduct/
            ├── cardCategory/
            └── imagesNavProduct/
```

## Modelo de Dados (Prisma)

O banco de dados PostgreSQL possui os seguintes modelos:

- **User**: id, firstName, lastName, email (unico), preferencias de notificacao (smsNotification, marketingEmails, orderUpdates, newArrivals, emailNotification, salesAlerts), gender (enum: MALE, FEMALE, OTHER), birthDate, memberSince, hash, salt. Relaciona-se com Telephone (1:1), Cart (1:1), Order (1:N) e Review (1:N).
- **Product**: id, name, description, discount, tag, specification. Relaciona-se com Variant (1:N), ProductCategory (N:N) e Review (1:N).
- **Variant**: id, color, size, quantity, price, productId. Pertence a um Product. Relaciona-se com CartVariant e OrderVariant.
- **Category**: id, name, quantity. Relaciona-se com Product atraves da tabela intermediaria ProductCategory.
- **ProductCategory**: chave composta (productId, categoryId). Tabela de relacionamento N:N entre Product e Category.
- **Cart**: id, totalPrice, shipping, totalQuantity, userId (unico). Pertence a um User. Contem itens via CartVariant.
- **CartVariant**: id, itemQuantity, cartId, variantId. Relaciona um carrinho a uma variante de produto.
- **Order**: id, totalQuantity, status (enum: PROCESSING, SHIPPED, DELIVERED), adress, totalPrice, date, shipping, paymentMethod (enum: PENDING, CREDIT_CARD, DEBIT_CARD, PIX), userId. Pertence a um User. Contem itens via OrderVariant.
- **OrderVariant**: id, itemQuantity, itemPrice, orderId, variantId. Relaciona um pedido a uma variante de produto.
- **Telephone**: id, DDD, phoneNumber, userId (unico). Pertence a um User (1:1) com exclusao em cascata.
- **Review**: id, rating, text, userId, productId. Pertence a um User e a um Product, ambos com exclusao em cascata.

## Rotas da API (Backend)

O backend roda na porta 3333.

### Usuario

| Metodo | Rota             | Descricao             | Autenticacao | Validacao         |
|--------|------------------|-----------------------|--------------|-------------------|
| POST   | `/login`         | Login do usuario      | Nao          | loginSchema       |
| POST   | `/user`          | Criar usuario         | Nao          | createUserSchema  |
| GET    | `/user/:userId`  | Buscar usuario por ID | Sim (JWT)    | Nao               |
| GET    | `/users`         | Listar todos usuarios | Nao          | Nao               |
| PUT    | `/user/:userId`  | Atualizar usuario     | Sim (JWT)    | updateUserSchema  |
| DELETE | `/user/:userId`  | Deletar usuario       | Sim (JWT)    | Nao               |

### Produto

| Metodo | Rota                   | Descricao              | Validacao           |
|--------|------------------------|------------------------|---------------------|
| POST   | `/product`             | Criar produto          | createProductSchema |
| GET    | `/product/:productId`  | Buscar produto por ID  | Nao                 |
| GET    | `/products`            | Listar todos produtos  | Nao                 |
| PUT    | `/product/:productId`  | Atualizar produto      | updateProductSchema |
| DELETE | `/product/:productId`  | Deletar produto        | Nao                 |

### Variante

| Metodo | Rota                   | Descricao               | Validacao            |
|--------|------------------------|-------------------------|----------------------|
| POST   | `/variant`             | Criar variante          | createVariantSchema  |
| GET    | `/variant/:variantId`  | Buscar variante por ID  | Nao                  |
| GET    | `/variants`            | Listar todas variantes  | Nao                  |
| PUT    | `/variant/:variantId`  | Atualizar variante      | updateVariantSchema  |
| DELETE | `/variant/:variantId`  | Deletar variante        | Nao                  |

### Categoria

| Metodo | Rota                                       | Descricao                              |
|--------|--------------------------------------------|-----------------------------------------|
| POST   | `/category`                                | Criar categoria                        |
| GET    | `/category/:categoryId`                    | Buscar categoria por ID                |
| GET    | `/categories`                              | Listar todas categorias                |
| PUT    | `/category/:categoryId`                    | Atualizar categoria                    |
| DELETE | `/category/:categoryId`                    | Deletar categoria                      |
| POST   | `/category/:categoryId/product/:productId` | Associar produto a categoria           |
| DELETE | `/category/:categoryId/product/:productId` | Remover produto de categoria           |

### Avaliacao (Review)

| Metodo | Rota                  | Descricao               | Validacao           |
|--------|-----------------------|-------------------------|---------------------|
| POST   | `/review`             | Criar avaliacao         | createReviewSchema  |
| GET    | `/review/:reviewId`   | Buscar avaliacao por ID | Nao                 |
| GET    | `/reviews`            | Listar todas avaliacoes | Nao                 |
| PUT    | `/review/:reviewId`   | Atualizar avaliacao     | updateReviewSchema  |
| DELETE | `/review/:reviewId`   | Deletar avaliacao       | Nao                 |

### Telefone

| Metodo | Rota                   | Descricao                   | Validacao       |
|--------|------------------------|-----------------------------|-----------------|
| GET    | `/telephone`           | Listar todos telefones      | Nao             |
| GET    | `/telephone/:userId`   | Buscar telefone por usuario | Nao             |
| PUT    | `/telephone/:userId`   | Atualizar/criar telefone    | telephoneSchema |
| DELETE | `/telephone/:userId`   | Deletar telefone            | Nao             |

### Carrinho

| Metodo | Rota                  | Descricao                        |
|--------|-----------------------|----------------------------------|
| POST   | `/cart`               | Criar carrinho                   |
| GET    | `/cart/:cartId`       | Buscar carrinho por ID           |
| GET    | `/carts`              | Listar todos carrinhos           |
| PUT    | `/cart/:cartId`       | Atualizar carrinho               |
| DELETE | `/cart/:cartId`       | Deletar carrinho                 |
| POST   | `/cart/:cartId/add`   | Adicionar variante ao carrinho   |

### Pedido (Order)

| Metodo | Rota                | Descricao             |
|--------|---------------------|-----------------------|
| POST   | `/order`            | Criar pedido          |
| GET    | `/order/:orderId`   | Buscar pedido por ID  |
| GET    | `/orders`           | Listar todos pedidos  |
| PUT    | `/order/:orderId`   | Atualizar pedido      |
| DELETE | `/order/:orderId`   | Deletar pedido        |

## Paginas do Frontend

O frontend roda via Vite e se comunica com o backend na porta 3333.

| Rota            | Pagina      | Descricao                                                                 |
|-----------------|-------------|---------------------------------------------------------------------------|
| `/`             | Home        | Pagina inicial com categorias, produtos em destaque e newsletter. Redireciona para `/sign-in` se o usuario nao estiver autenticado. |
| `/sign-in`      | SignIn      | Formulario de login com email e senha. Validacao via Zod. Armazena token e userId no localStorage. |
| `/sign-up`      | SignUp      | Formulario de cadastro com nome, sobrenome, email, senha e confirmacao. Validacao via Zod. |
| `/profile`      | Profile     | Exibe e permite editar informacoes do usuario (nome, email, telefone, data de nascimento, genero). Mostra contagem de pedidos, wishlist e avaliacao media. |
| `/product-info` | ProductInfo | Pagina de detalhes de um produto com selecao de cor, tamanho, quantidade, botoes de adicionar ao carrinho e comprar, alem de sugestoes de produtos. |

## Componentes do Frontend

- **Header**: barra superior fixa com logo, navegacao (New In, Woman, Men, Sale), campo de busca, icones de favoritos, perfil e carrinho com badge de notificacoes. Responsivo com menu hamburger em telas menores.
- **Footer**: secao de newsletter com campo de email e botao de inscricao.
- **Button**: componente reutilizavel que aceita props de estilo (cor de fundo, borda, tamanho, icone).
- **CardCategory**: card de categoria com imagem, titulo e quantidade de itens.
- **CardProduct**: card de produto com imagem, tag, titulo, preco, preco antigo, avaliacao e quantidade de reviews.
- **OtherProductCard**: card de sugestao de produto com imagem, titulo, preco, preco antigo e avaliacao.
- **Tags**: componente de etiqueta com texto e cor de fundo configuravel.
- **Colors**: lista de cores disponiveis para selecao em um produto.
- **Sizes**: lista de tamanhos disponiveis para selecao em um produto.
- **Images / ImagesNav**: galeria de imagens do produto com navegacao entre elas.

## Autenticacao

A autenticacao utiliza JWT com algoritmo RS256 (chaves RSA de 4096 bits). As chaves sao geradas pelo script `npm run keys`. O token e emitido no login com validade de 7 dias. As senhas sao armazenadas com hash PBKDF2 (SHA-512, 10000 iteracoes) e salt aleatorio.

O middleware `AuthMiddleware` valida o token Bearer no header `Authorization` das rotas protegidas.

## Validacao

A validacao de dados e feita com Zod em ambos os lados:

- **Backend**: middleware `validate` que aplica schemas Zod ao `req.body` antes de chegar ao controller. Schemas existentes: `createUserSchema`, `updateUserSchema`, `loginSchema`, `createProductSchema`, `updateProductSchema`, `createReviewSchema`, `updateReviewSchema`, `createVariantSchema`, `updateVariantSchema`, `telephoneSchema`.
- **Frontend**: schemas Zod integrados ao React Hook Form via `zodResolver`. Schemas existentes: `SignUpSchema`, `SignInSchema`, `profileSchema`, `productOrderSchema`.

## Envio de E-mails

O backend utiliza Nodemailer configurado com Mailtrap (sandbox SMTP) para envio de e-mails. Atualmente, um e-mail de boas-vindas e enviado ao criar um novo usuario.

## Seed

O projeto possui um script de seed que popula o banco com dados iniciais: 1 usuario de teste, 5 produtos com 1 variante cada (Basic T-Shirt, Cashmere Sweater, Slim Jeans, Running Shoes, Casual Jacket) e 1 categoria (Clothing) com os 5 produtos associados.

## Configuracao e Execucao

### Pre-requisitos

- Node.js
- PostgreSQL

### Backend

```bash
cd back
npm install
cp .env.example .env
# Editar .env com as credenciais do banco e do mailer
npm run keys
npx prisma generate
npx prisma migrate dev
npm run seed
npm run start
```

O backend inicia na porta definida em `.env` (padrao: 3333).

### Frontend

```bash
cd front
pnpm install
pnpm dev
```

O frontend inicia via Vite (padrao: porta 5173).

### Variaveis de Ambiente (Backend)

Configuradas no arquivo `.env` com base no `.env.example`:

- `DATABASE_URL`: URL de conexao com o PostgreSQL
- `MAIL_SENDER`: usuario do Mailtrap
- `PASSWORD`: senha do Mailtrap
- `TOKEN`: token do Mailtrap
- `APP_NAME`: nome da aplicacao
- `NODE_ENV`: ambiente (development)
- `PORT`: porta do servidor (3333)
- `APP_URL`: URL base da aplicacao

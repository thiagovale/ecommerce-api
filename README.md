# 🛒 E-commerce API

API RESTful completa para e-commerce desenvolvida com NestJS, incluindo autenticação JWT, gerenciamento de produtos, carrinho de compras e sistema de filas com Redis.

## 📋 Funcionalidades

### 🔐 Autenticação & Autorização

- Login/Registro com JWT
- Confirmação de conta via email (simulado)
- Controle de acesso baseado em roles (ADMIN/CLIENT)
- Middleware de autenticação para rotas protegidas

### 📦 Gestão de Produtos

- ✅ Listagem pública com paginação e filtros
- ✅ CRUD completo (apenas admins)
- ✅ Controle de estoque
- ✅ Validação de dados

### 🛒 Carrinho de Compras

- ✅ Adicionar/remover produtos
- ✅ Atualizar quantidades
- ✅ Carrinho persistido no banco
- ✅ Validação de estoque
- ✅ Acesso apenas para usuários autenticados

### 📧 Sistema de Email

- ✅ Fila de emails com Redis e Bull
- ✅ Email de confirmação no cadastro
- ✅ Processamento assíncrono

## 🚀 Tecnologias

- **Framework:** NestJS
- **Linguagem:** TypeScript
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Autenticação:** JWT
- **Cache/Fila:** Redis + Bull
- **Containerização:** Docker + Docker Compose

## 📁 Estrutura do Projeto

```
src/
├── auth/              # Autenticação e autorização
├── users/             # Gestão de usuários
├── products/          # Gestão de produtos
├── carts/             # Carrinho de compras
├── email/             # Sistema de filas de email
├── database/          # Configuração Prisma
├── redis/             # Configuração Redis
└── main.ts           # Ponto de entrada
```

## 🛠️ Instalação e Execução

### Pré-requisitos

- Docker e Docker Compose

### 🐳 Executar com Docker (Recomendado)

1. **Clone o repositório:**

```bash
git clone <url-do-repositorio>
cd ecommerce-api
```

2. **Execute com Docker:**

```bash
docker-compose up --build -d
```

3. **A aplicação estará disponível em:**

- API: http://localhost:3000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## 🔧 Variáveis de Ambiente

```env
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce_db"
JWT_SECRET="seu-jwt-secret-super-seguro"
REDIS_HOST="localhost"
REDIS_PORT="6379"
NODE_ENV="development"
```

#### Registrar usuário

```http
POST /auth/register?isAdmin=false
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "123456"
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "123456"
}

# Resposta:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 📦 Produtos

#### Listar produtos (público)

```http
GET /products?page=1&limit=10&search=iphone
```

#### Criar produto (admin apenas)

```http
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "iPhone 15",
  "description": "Último modelo do iPhone",
  "price": 999.99,
  "stock": 50
}
```

#### Atualizar produto (admin apenas)

```http
PUT /products/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "iPhone 15 Pro",
  "price": 1099.99,
  "stock": 25
}
```

#### Deletar produto (admin apenas)

```http
DELETE /products/1
Authorization: Bearer <token>
```

### 🛒 Carrinho

#### Ver carrinho

```http
GET /carts
Authorization: Bearer <token>
```

#### Adicionar item ao carrinho

```http
POST /carts/items
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": 1,
  "quantity": 2
}
```

#### Atualizar quantidade

```http
PUT /carts/items/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 5
}
```

#### Remover item

```http
DELETE /carts/items/1
Authorization: Bearer <token>
```

#### Limpar carrinho

```http
DELETE /carts
Authorization: Bearer <token>
```

### 👥 Usuários (admin apenas)

#### Listar usuários

```http
GET /users/list
Authorization: Bearer <token>
```

## 🗃️ Banco de Dados

O projeto utiliza Prisma como ORM com PostgreSQL. As principais entidades são:

- **User**: Usuários do sistema
- **Product**: Produtos do e-commerce
- **Cart**: Carrinho de compras
- **CartItem**: Itens do carrinho

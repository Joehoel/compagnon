# Compagnon

Discord bot built with Discord.js, Typescript, Node.js, TypeORM and MongoDB. Mainly used in a private server with friends

## Requiremnts

- [node.js](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/installation)
- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Getting started

Clone the repository

```bash
git clone https://github.com/Joehoel/compagnon.git

cd compagnon
```

Add environment variables

```bash
cp .env.example .env
```

Generate the prisma client

```bash
pnpm dlx prisma generate
```

Install dependencies

```bash
pnpm install
```

Start the development server

```bash
pnpm dev
```

---

Made with <3 by Joël Kuijper

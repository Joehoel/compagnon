<h1 style="align-items: center"><img style="border-radius: 100%" src="https://cdn.discordapp.com/avatars/568087167637651458/6fa2c24fd871f2c2b18b8794fa9a646f.webp" height="100px"/>Compagnon</h1>

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

Fill in the variables

```env
<!-- Required! -->
TOKEN=
CLIENT_ID=
DATABASE_URL=

<!-- Not required -->
GUILD_ID=
GIPHY_API_KEY=
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

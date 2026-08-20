# DevWeekends - Node.js

My personal learning repo for the DevWeekends Node.js course. It's a mix of course notes, small exercises, and mini projects built while learning Node.js, Express, MongoDB, GraphQL, and related tools.

## Folders

| Folder | What it is |
| --- | --- |
| `rough-learning/` | Rough notes and small practice scripts (HTTP, middleware, auth, MongoDB, REST API, etc.) plus a couple of practice projects (`project-01`, `short-url`) |
| `deliverable-week1/` | Week 1 deliverable — a basic HTTP server using Node's `fs` module |
| `deliverable-week2/` | Week 2 deliverable — a blog app (Express, EJS, MongoDB, auth, file uploads) |
| `discord-bot/` | A simple Discord bot built with `discord.js` |
| `graphql-tut/` | GraphQL practice using Apollo Server + Express |
| `threadapp-backend/` | A backend project using TypeScript, Prisma, and GraphQL |

## Running a project

Each folder is its own standalone project with its own `package.json`. To run one:

```bash
cd <folder-name>
npm install
npm start
```

Some projects (like `discord-bot` and `threadapp-backend`) need environment variables — check for a `.env.example` file in that folder and copy it to `.env` with your own values.

## Note

This is a learning repo, so code quality and structure vary from folder to folder as I learned new things along the way.

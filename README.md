# Open source API for latin_webstie

Built on Express + TypeScript + Prisma + PlanetScale.

## API Routes

-   /api/v1/auth
    -   [POST] /login
    -   [POST] /register
    -   [POST] /logout
    -   [GET] /users
    -   [DELETE] /users/:id
    -   [PATCH] /users/:id
    -   [GET] /refresh_token
-   /api/v1/
    -   [POST] /books
    -   [GET] /books
    -   [POST] /books/:id/chapters
    -   [GET] /books/chapters/
-   /api/v1/
    -   [POST] /nouns

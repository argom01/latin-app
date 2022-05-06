# Open source API for latin_webstie

Built on Express + TypeScript + Prisma + PlanetScale.

## API Routes

-   /api/v1/auth
    -   [POST] /login
    -   [POST] /register
    -   [POST] /logout
    -   [GET] /confirmation
    -   [GET] /confirmation/:token
    -   [POST] /recover_account
    -   [POST] /recover_account/:token
    -   [GET] /refresh_token
-   /api/v1/
    -   [GET] /users/:id
    -   [GET] /users/me
    -   [POST] /users/search
    -   [DELETE] /users/:id
    -   [PATCH] /users/:id/roles
-   /api/v1/
    -   [GET] /books
    -   [POST] /books
    -   [DELETE] /books/:id
    -   [POST] /books/:id/chapters
    -   [GET] /books/chapters/:id
    -   [DELETE] /books/chapters/:id
-   /api/v1/
    -   [POST] /nouns

![alt_text](https://www.wykop.pl/cdn/c3201142/comment_1615839749rg57FUv9adkBCDs740QMe5,w400.jpg)

# Welcome to Bookstars API

## How to use the Bookstars API

- Clone the project by using `git clone`
- Run `yarn install` to install dependencies
- Run `yarn compile` script to compile the Ts files
- Run `yarn start` script to start the server
- Optionally, run `ts-node './db/import.ts` with flag `--import` to seed database
- Visit `http://localhost:2022/ping` to test api

## Bookstars API Endpoints

> base_url `http://localhost:2022/api`

### Location resource

- GET - `/locations`
- POST - `/locations`
  > name: `string`, coordinates: `number[latitude, longitude]`
- GET - `/locations/:location`
  > :location: ObjectId (location id)
- PATCH - `/locations/:location`
  > :location: ObjectId (location id)
- DELETE - `/locations/:location`
  > :location: ObjectId (location id)

### Character resource

- GET - `/characters`
- POST - `/characters`
  > firstname: `string`, lastname: `string`, gender: `enum{'MALE', 'FEMALE'}`, location: `location id`, stateOfOrigin: `string`
- GET - `/characters/:character`
  > :character: ObjectId (character id)
- GET - `/characters/:character/episodes`
  > :character: ObjectId (character id)
- PATCH - `/characters/:character`
  > :character: ObjectId (character id)
- DELETE - `/characters/:character`
  > :character: ObjectId (character id)

### Episode resource

- GET - `/episodes`
- POST - `/episodes`
  > name: `string`, characters: string[character ids]
- GET - `/episodes/:episode`
  > :episode: ObjectId (episode id)
- PATCH - `/episodes/:episode`
  > :episode: ObjectId (episode id)
- DELETE - `/episodes/:episode`
  > :episode: ObjectId (episode id)

### Comment resource

- GET - `/comments`
- POST - `/comments`
  > comment: `string`, episode: `episode id`
- GET - `/comments/:comment`
  > :comment: ObjectId (comment id)
- PATCH - `/comments/:comment`
  > :comment: ObjectId (comment id)
- DELETE - `/comments/:comment`
  > :comment: ObjectId (comment id)

### Notes

- You can use any API manager, eg `postman` to test api endpoints or create a frontend using any library of your choice
- Frontend part was left out. Time factor

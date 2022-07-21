# express-typeORM-example

## Additional Libraries
- typeDI for injection
- typeorm-typedi-extensions for injection
- axios for third party API

## How to run a server
- run `docker-compose up`
- run `yarn dev`

## Project Structure
```
src
├── api
│   ├── controllers
│   │   ├── car
│   │   │   ├── car.controller.ts
│   │   │   └── handlers
│   │   │       ├── create-car.handler.ts
│   │   │       ├── delete-car.handler.ts
│   │   │       ├── get-car.handler.ts
│   │   │       ├── get-cars.handler.ts
│   │   │       ├── index.ts
│   │   │       └── update-car.handler.ts
│   │   └── index.ts
│   ├── dtos
│   │   ├── car
│   │   │   ├── create-car.dto.ts
│   │   │   ├── delete-car.dto.ts
│   │   │   ├── get-car.dto.ts
│   │   │   ├── get-cars.dto.ts
│   │   │   ├── index.ts
│   │   │   └── update-car.dto.ts
│   │   └── common
│   │       └── output.dto.ts
│   ├── entities
│   │   ├── car.entities.ts
│   │   ├── common.entities.ts
│   │   └── index.ts
│   ├── repositories
│   │   └── car.repository.ts
│   └── services
│       ├── car.service.ts
│       └── vehicle.service.ts
├── common
│   └── constants.ts
├── index.ts
├── loaders
│   ├── database-connection.loader.ts
│   ├── express-server.loader.ts
│   └── index.ts
└── utils
    └── error.ts
```

### Assumptions
- VIN is verified from Vehicle API
- VIN is an unique value
- Registration expiry date is set as 'dd/mm/yyyy' format in body payload
- Registration State consists of two lengths in upper case

### TODO (To be Improved)
- figure out how to expand update-car.dto based on create-car.dto
- add logging
- add error handling middleware for payload valdiation

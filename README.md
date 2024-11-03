## frontend

```
cd frontend
cp .env.example .env
npm i -g pnpm
pnpm install
pnpm start
```

## backend

```
cd backend
cp .env.example .env
npm i -g pnpm
pnpm install
pnpm start
```

### DOCKER IMPLEMENTATION

#### Individual Services

go to /frontend

```
docker build -t fe-image .
docker run -p 3000:3000 fe-image
```

you can access the frontend at http://localhost:3000

go to /backend

```
docker build -t be-image .
docker run -p 3001:3001 be-image
```

you can access the backend at http://localhost:3001

#### All Services

```
docker compose up -d
```

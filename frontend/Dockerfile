
FROM node:18

WORKDIR /frontend_app

COPY package.json pnpm-lock.yaml ./

RUN npm install

COPY . .

EXPOSE 3000

CMD npm start
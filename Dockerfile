FROM node:18

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

ENV VITE_SERVER_URL 'http://localhost:5555'

ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]
FROM node:alpine
FROM mongo

WORKDIR /app
COPY . .

RUN npm install

ENV PORT=5000

CMD node app.js

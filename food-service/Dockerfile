# Database
FROM mongo
WORKDIR /
RUN mongod
CMD ["CTRL + V"]

# Application
FROM node:alpine
WORKDIR /app
COPY . .

RUN npm install

ENV PORT=3000
EXPOSE $PORT

CMD node app.js

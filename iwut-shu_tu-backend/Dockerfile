FROM node:22-alpine
WORKDIR /app

ENV DBHOST=""
ENV DBPORT=""
ENV DBNAME=""

COPY . .
RUN npm install
CMD [ "npm", "start" ]
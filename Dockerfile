FROM alpine:3.18.2

RUN apk add --no-cache \
  nodejs \
  npm

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
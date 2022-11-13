FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=50005

EXPOSE 50005

CMD ["npm","start"]
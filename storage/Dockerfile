FROM node:16

#Working Dir
WORKDIR /usr/app

#copy packge json files

COPY tsconfig*.json ./

#copy source files
COPY . ./

COPY package*.json ./

#install dependencies
RUN npm install

RUN npm run build

ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "start" ]

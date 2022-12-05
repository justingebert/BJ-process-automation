FROM node:16

#Working Dir
WORKDIR /

#copy packge json files
COPY package*.json ./

COPY tsconfig*.json ./

#install dependencies
RUN npm install

#copy source files
COPY . ./

RUN npm run build

ENV PORT=50005

EXPOSE 50005

CMD ["npm","start"]
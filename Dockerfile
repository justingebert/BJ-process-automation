FROM node:16

#Working Dir
WORKDIR /*

#copy packge json files
COPY package*.json ./

#install dependencies
RUN npm install

#copy source files
COPY . .


WORKDIR /zeiterfassung


RUN tsc 

WORKDIR /*

ENV PORT=50005

EXPOSE 50005

CMD ["npm","start"]
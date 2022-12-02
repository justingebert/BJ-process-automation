FROM node:16

#Working Dir
WORKDIR /app

#copy packge json files
COPY package*.json ./

#install dependencies
RUN npm install

#copy source files
COPY . .

RUN cd /zeiterfassung 

RUN tsc

ENV PORT=50005

EXPOSE 50005


CMD ["npm","start"]
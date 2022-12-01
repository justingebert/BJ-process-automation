## LEARNING Javascript/Typescript:
Basics - Classes

Fireship Videos





## LEARNING Docker:
install an go though documentaiton tutorial

commands:

build image from dockerfile: cd into dir -> docker build -t <name> .

run container with image: docker run -p <Port>:<outport> <iamge name>

when container is stopped or deleted data is deleted aswell
-> not suitable for DataBase
->solution Volumes (mapping to diffrent directory)



view containers: docker ps
stop and remove container: docker rm -f <container-id>

named volume:
create volume: docker volume create todo-db
start container and assign volume: docker run -dp 3000:3000 -v todo-db:/etc/todos getting-started





## LEARNING DevOps CI/CD:

CD - Continuos integration -> merge code in (with e.g testing etc)
example: jest and webpack for pull request - set up with github action : yml file





## LEARNING Techstack:
https://www.youtube.com/watch?v=Sxxw3qtb3_g&ab_channel=Fireship
    software to learn: 
        frontend: = react/angular
        css = tailwind & sass & postcss
        bundler = webpack

        backend: 


## Learning Db:
watch fireship videos
install mysql 

login : mysql -u justin -p


when to to use what is most important:
https://www.youtube.com/watch?v=W2Z7fbCLSTw&t=381s&ab_channel=Fireship

1. key:value -> stored in ram / cache -> very fast
no qureys or joins -> data modulationion limited 
not for main data/primary -> mostly used to reduce data latency

2. wide colomn -> no schema -> can handle untructured data -> query language / no joins
time series/historical records
high write low read
not primary

3. document oriented
store 
schmema less - relationalish qureys - no joins

4. relational db
need schema
consistent


possible to run db in docker container


## Problems-Solutions:
Camera access -> browser requires ssl certificate



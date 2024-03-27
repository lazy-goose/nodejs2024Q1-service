FROM node:20-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install --omit dev

CMD ["npm", "run", "docker:cmd"]

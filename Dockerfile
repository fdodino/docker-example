FROM node:lts-alpine

COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

EXPOSE 3000

COPY ["index.js", "/usr/src/"]

CMD ["node", "index.js"]

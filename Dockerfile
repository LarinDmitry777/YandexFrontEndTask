# В качестве базового образа используем образ с Node.js 13
FROM node:13

# Копируем файлы необходимые для работы приложения
COPY config /config
COPY dist /dist
COPY package.json /
COPY package-lock.json1 /


RUN npm run deps:production

ENV NODE_ENV production

ENV PORT 80
EXPOSE 80

CMD npm run start:docker

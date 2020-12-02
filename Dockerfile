#задаем базовые родительский образ
FROM node:12
LABEL maintainer="lampmaster"
#задаем рабочую дирректорию для дальнейших инструкций
WORKDIR /app
#устанавливаем постоянные переменные среды
ENV PATH /app/node_modules/.bin:$PATH
#копируем файлы конфигурации
COPY package*.json ./
#устанавливаем пакеты
RUN npm install
#копируем проект в контейнер
COPY . ./
#команда с аргументами для запуска проекта
CMD ["npm", "start"]

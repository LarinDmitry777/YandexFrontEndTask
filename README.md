# Пример приложения «Заметки» с настроенной эксплуатацией

В основе [Express.js](https://expressjs.com/) и [Handelbars](http://handlebarsjs.com/). Статика приложения размещается в [Surge CDN](https://surge.sh/), а само приложение в облаке [Heroku](https://www.heroku.com/).

### Разработка

В первую очередь __необходимо выбрать уникальное имя проекта__,
и указать его в поле `name` файла `package.json`.

Далее устанавливаем зависимости:
```sh
npm run deps:all
```

Компилируем TypeScript в директорию `dist`:
```sh
npm run build
```

Запускаем сервис локально в режиме разработки:
```sh
npm run dev
```

И открываем в браузере:
http://localhost:8080/

При изменении TypeScript файлов, сервер будет перезапущен автоматически.

### Развёртывание

Устанавливаем Heroku по [инструкции](https://devcenter.heroku.com/articles/heroku-cli), затем авторизуемся и создаём приложение:
```sh
npm run heroku-init
```

Компилируем TypeScript в директорию `dist`:
```sh
npm run build
```

Размещаем статику в Surge CDN (в первый раз вводим почту и пароль):
```sh
npm run surge
```

Далее размещаем приложение:
```sh
npm run heroku
```

В дальнейшем всё это можно выполнить одной командой:
```sh
npm run deploy
```

### Доступные команды

| Команда | Действие |
| ------------- | ------------- |
| clean | Удаление зависимостей и собранных файлов |
| build | Сборка приложения |
| build:ts | Компилиция TypeScript исходников |
| build:next | Коипиляция next.js приложения в dist/ |
| lint | Запуск всех проверок |
| lint:css | Проверка css файлов на codestyle |
| lint:deps | Проверка зависимостей на уязвимости |
| lint:es | Проверка TypeScript файлов на codestyle |
| lint:ts | Проверка TypeScript файлов на валидность |
| deps:all | Установка всех зависимостей |
| deps:production | Установка зависимостей, ноебходимых только для работы приложения |
| dev | Запуск приложения в режиме разработки |
| docker:build | Локальная сборка Docker-образа |
| docker:run | Локальный запуск контейнера с приложением |
| heroku:login | Авторизация в Heroku |
| heroku:push | Сборка и отправка образа в Heroku |
| heroku:release | Запуск контейнера с приложением в Heroku |
| heroku:open | Открытие браузера с приложение в Heroku |
| heroku:logs | Просмотр логов приложения в Heroku |
| heroku | Деплой приложения в Heroku |
| heroku-init | Создание приложения в Heroku |
| start | Старт приложения |
| surge | Деплой статики в Surge |
| deploy | Сборка приложения, деплой приложения в Heroku и деплой статики в Surge |

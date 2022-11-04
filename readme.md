# TaskTrackerCat-front

Фронтовая чать сайта. Предназначен для простого отслеживания кормления кота.

## Содержание
- [Технологии](#технологии)
- [Разработка](#разработка)
- [Deploy и CI/CD](#deploy-и-ci/cd)
- [Зачем разработан этот проект?](#зачем-разработан-этот-проект)
- [To do](#to-do)
- [Источники](#источники)
- [Demo](#demo)

## Технологии
- ReactJs
- Material-ui
- Babel
- Webpack
- webpack dev server
- React refresh

## Разработка

### Требования
Для установки и запуска проекта, необходим [NodeJS](https://nodejs.org/).

Установите npm-пакеты с помощью команды:
```sh
$ npm install 
```

### Запуск Development сервера
Чтобы запустить сервер для разработки, выполните команду:
```sh
npm run start
```

### Создание билда
Чтобы выполнить production сборку, выполните команду: 
```sh
npm run build
```

## Deploy и CI/CD
### Изменение файлов
1. Поменять переменную `url` в файле `main.js` на _**url сервера**_

### Создание билда
```
npm run build
```
### Публикация ctrl+c, ctrl+v
Переместитите все содержимое в папке `build` на хостинг
_Если файлы при загрузке на хостинг не отправляются, заархивируйте все файлы, а потом разархивируйте на хостинге._

## Зачем разработан этот проект
Для контоля кормления кота.

## To do
- [x] Добавить крутое README
- [x] Всё переписать
- [x] Написать запросы на бэк
- [ ] Обновлять bundle.js при его изменении у всех клиентов
- [ ] Добавить темную тему

## Источники
Макет сайта -  https://www.behance.net/gallery/146894393/To-do-list-yandex-test

## Demo

![](https://github.com/Alexandrjob/TaskTrackerCat-front/blob/main/.github/assets/lobby.png?raw=true)
![](https://github.com/Alexandrjob/TaskTrackerCat-front/blob/main/.github/assets/mainpage.png?raw=true)

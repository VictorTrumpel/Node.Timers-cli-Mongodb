# Node.Timers-cli-Mongodb

Node + Mongodb + cli client

Апи таймеров. CLI приложение

- позволяет добавлять/удалять таймеры
- останавливать
- регистрировать нового пользователя
- авторизовываться
- предоставляет персонализированные таймеры для каждого пользователя
- воспроизведение сессии по кукам

Запуск:

# npm run dev

Команды:

## Регистрация
    cd client node index.js signup

## Авторизация
    cd client node index.js login
    
## Выйти
    cd client node index.js logout

## Запустить таймер
    cd client node index.js start <timer name>

## Остановить таймер
    cs client node index.js stop <timerId>
    
## Вывести все активные таймеры
    cs client node index.js status
    
## Вывести конкретный таймер
    cs client node index.js status <timerId>
    
## Вывести неактивные таймеры
    cs client node index.js status old

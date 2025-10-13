# Achieva - Telegram Mini App

## Деплой на Vercel

### Настройка переменных окружения

1. В панели Vercel перейдите в Settings → Environment Variables
2. Добавьте переменную:
   - **Name**: `TELEGRAM_BOT_TOKEN`
   - **Value**: Ваш токен бота от BotFather

### Структура проекта

- `api/webhook.js` - API endpoint для обработки webhook от Telegram
- `dist/` - Собранные файлы для продакшена
- `vercel.json` - Конфигурация Vercel

### Команды

```bash
# Установка зависимостей
npm install

# Локальная разработка
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview
```

### Webhook URL

После деплоя ваш webhook будет доступен по адресу:
`https://your-app-name.vercel.app/webhook`

### Настройка BotFather

1. Отправьте команду `/setwebhook` боту @BotFather
2. Укажите URL: `https://your-app-name.vercel.app/webhook`
3. Убедитесь, что webhook установлен успешно

### Тестирование

1. Проверьте работу webhook: `GET https://your-app-name.vercel.app/webhook`
2. Отправьте тестовое сообщение боту
3. Проверьте логи в панели Vercel

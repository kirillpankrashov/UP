# Test Runner Script for Uplify 3.0

Этот скрипт предназначен для удобного запуска тестов в проекте Uplify 3.0 по views.

## 📁 Файлы

- `run-tests.sh` - Основной скрипт для запуска тестов по views
- `TEST_RUNNER_README.md` - Данная инструкция

## 🚀 Использование

### Основной скрипт (`run-tests.sh`)

Запускает тесты по views:

```bash
# Запустить все тесты
./run-tests.sh

# Запустить тесты конкретного view
./run-tests.sh src/modules/Streamer/views/Wallet
./run-tests.sh src/modules/Streamer/views/Link
./run-tests.sh src/modules/Streamer/views/Campaigns
```

## 📋 Views для тестирования

### 🏦 Wallet
- Все тесты кошелька (Balance, Analytics, Services)

### 🔗 Link  
- Все тесты ссылок (Alerts, Profile, Setup, Analytics, Posts)

### 📊 Campaigns
- Все тесты кампаний (AdsetCard, AdsetInfo, Analytics, Store)

### 🏠 Dashboard
- Все тесты дашборда (Setup, Loyalty, Values)

### ⚙️ Settings
- Все тесты настроек (AdvertSettings, SspSettings, WidgetLink)

### 👤 Profile
- Все тесты профиля

### 🔗 Referrals
- Все тесты рефералов

### 🚫 Deactivated
- Тесты деактивации

## 🛠 Настройка

### Добавление новых views

1. **В основной скрипт** (`run-tests.sh`):
   - Отредактируйте массив `TEST_DIRS` в начале файла
   - Добавьте путь к новому view

### Пример добавления view:

```bash
# В run-tests.sh
TEST_DIRS=(
    # ... существующие views ...
    "src/modules/Streamer/views/NewView"  # Добавить сюда
)
```

## 🎨 Цветовая схема вывода

- 🔵 **Синий** - Заголовки и разделители
- 🟡 **Желтый** - Информационные сообщения
- 🟢 **Зеленый** - Успешные тесты
- 🔴 **Красный** - Неудачные тесты
- 🟠 **Оранжевый** - Предупреждения

## 📊 Статистика

Скрипт показывает:
- Общее количество views
- Количество пройденных views
- Количество неудачных views
- Список неудачных директорий
- Команды для повторного запуска неудачных views

## 🔧 Требования

- Node.js
- npm
- vitest
- bash (для Linux/macOS)

## 💡 Советы

1. **Для отладки** - используйте конкретный путь к view
2. **Для быстрой проверки** - используйте конкретный view
3. **Для полной проверки** - используйте `./run-tests.sh`
4. **Для CI/CD** - используйте `./run-tests.sh`

## 🐛 Устранение проблем

### Проблема: "Permission denied"
```bash
chmod +x run-tests.sh
```

### Проблема: "Directory not found"
- Проверьте правильность пути к view
- Убедитесь, что директория существует

### Проблема: "Test failed"
- Проверьте логи теста
- Используйте команду для повторного запуска из вывода скрипта

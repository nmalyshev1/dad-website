import re

file_path = "../dad-planner/index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    'Excel Grid View': 'Таблица Excel',
    'Calendar View': 'Календарь',
    'Analytics & Stats': 'Аналитика и статистика',
    'Excel-Style Bookings Spreadsheet': 'Таблица бронирований',
    'Cloud Sync Inactive': 'Облако: неактивно',
    'Cloud Sync Active': 'Облако: активно',
    'Lock': 'Блокировка',
    'Search by name, route, phone, car...': 'Поиск по имени, маршруту, телефону, авто...',
    'All Vehicles': 'Все автомобили',
    'DATE &amp; TIME': 'ДАТА И ВРЕМЯ',
    'DATE & TIME': 'ДАТА И ВРЕМЯ',
    'CUSTOMER NAME': 'ИМЯ КЛИЕНТА',
    'CONTACT DETAILS': 'КОНТАКТЫ',
    'PICKUP -&gt; DROPOFF': 'МАРШРУТ',
    'PICKUP -> DROPOFF': 'МАРШРУТ',
    'CAR SELECTED': 'АВТОМОБИЛЬ',
    'PRICE': 'ЦЕНА',
    'PAX/BAG': 'ПАСС/БАГАЖ',
    'ACTIONS': 'ДЕЙСТВИЯ',
    'Double-click row to edit': 'Дважды кликните, чтобы изменить',
    'Clear': 'Очистить',
    
    # Existing ones just to be safe
    'V-TRANSFER | Operator Dashboard': 'V-TRANSFER | Панель Оператора',
    'Syncing cloud data...': 'Синхронизация данных...',
    'Database empty/fresh': 'База данных пуста/новая',
    'Network Offline': 'Нет сети',
    'Add Booking': 'Добавить бронь',
    
    'Total Bookings': 'Всего бронирований',
    'Confirmed Revenue': 'Подтвержденная выручка',
    'Pending Revenue': 'Ожидаемая выручка',
    'Top Vehicle': 'Популярное авто',
    
    'All Statuses': 'Все статусы',
    'Pending': 'Ожидает',
    'Confirmed': 'Подтвержден',
    'Completed': 'Завершен',
    'Cancelled': 'Отменен',
    
    'Date & Time': 'Дата и Время',
    'Client': 'Клиент',
    'Route': 'Маршрут',
    'Car & Info': 'Авто и Инфо',
    'Status': 'Статус',
    
    'No bookings found.': 'Бронирования не найдены.',
    'Booking Details': 'Детали бронирования',
    
    'Manual Entry': 'Ручной ввод',
    'Save Booking': 'Сохранить бронь',
    
    'Telegram Paste': 'Вставка из Telegram',
    'Parse & Populate': 'Распознать и заполнить',
    
    'Database Management': 'Управление базой данных',
    'Export CSV (Excel)': 'Экспорт в CSV',
    'Backup Database (JSON)': 'Резервная копия (JSON)',
    'Restore Database': 'Восстановить базу',
    'Purge All Data (Danger)': 'Удалить все данные (Опасно)',
    
    'Save Changes': 'Сохранить изменения',
    'Close': 'Закрыть',
    
    'Flight Info': 'Информация о рейсе',
    'Child Seats': 'Детские кресла',
    'Hold Bags': 'Багаж (в багажник)',
    'Passengers': 'Пассажиры',
    'Luggage': 'Багаж (ручная кладь)',
    'Special Requirements': 'Особые требования',
    'None': 'Нет',
    
    'Full Name': 'Полное имя',
    'Email Address': 'Эл. почта',
    'Phone Number': 'Номер телефона',
    'Pickup Location': 'Место подачи',
    'Drop-off Location': 'Место назначения',
    'Price (€)': 'Цена (€)',
    
    'Linked Transfers': 'Связанные трансферы',
    'Returning client:': 'Постоянный клиент:',
    'Autofill': 'Автозаполнение',
    'Dismiss': 'Скрыть',
    
    'Enter Access PIN': 'Введите PIN-код',
    'Access Planner': 'Войти',
    
    'Booking saved successfully!': 'Бронь успешно сохранена!',
    'Changes saved successfully!': 'Изменения успешно сохранены!',
    'Booking deleted': 'Бронь удалена',
    'Status updated to': 'Статус обновлен на',
    'Booking details copied to clipboard!': 'Детали брони скопированы!'
}

for eng, rus in replacements.items():
    content = content.replace(eng, rus)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Translation completely applied.")

// Файл для интеграции статистики со всеми страницами сайта
// Подключается на всех страницах для сбора статистики

// Инициализация статистики при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Записываем посещение сайта
    recordVisit();
    
    // Добавляем обработчики для различных действий
    setupStatisticsTracking();
});

// Функция для записи статистики
function recordStatistic(type) {
    const today = new Date().toISOString().split('T')[0];
    
    // Получаем текущие данные статистики
    let statisticsData = JSON.parse(localStorage.getItem('statisticsData') || '{}');
    
    if (!statisticsData[type]) {
        statisticsData[type] = {};
    }
    
    if (!statisticsData[type][today]) {
        statisticsData[type][today] = 0;
    }
    
    statisticsData[type][today]++;
    localStorage.setItem('statisticsData', JSON.stringify(statisticsData));
    
    console.log(`Статистика записана: ${type} - ${statisticsData[type][today]} (${today})`);
}

// Функция для записи статистики посещений (с уникальными посетителями)
function recordVisit() {
    const today = new Date().toISOString().split('T')[0];
    const visitorId = generateVisitorId();
    
    let statisticsData = JSON.parse(localStorage.getItem('statisticsData') || '{}');
    
    if (!statisticsData.visits) {
        statisticsData.visits = {};
    }
    
    if (!statisticsData.visits[today]) {
        statisticsData.visits[today] = [];
    }
    
    // Добавляем посетителя только если его еще нет
    if (!statisticsData.visits[today].includes(visitorId)) {
        statisticsData.visits[today].push(visitorId);
    }
    
    localStorage.setItem('statisticsData', JSON.stringify(statisticsData));
}

// Генерация уникального ID посетителя
function generateVisitorId() {
    const userAgent = navigator.userAgent;
    const screenRes = `${screen.width}x${screen.height}`;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language;
    
    // Создаем хеш из характеристик браузера
    const hash = btoa(`${userAgent}-${screenRes}-${timeZone}-${language}`).slice(0, 16);
    return hash;
}

// Настройка отслеживания статистики
function setupStatisticsTracking() {
    console.log('Настройка отслеживания статистики...');

    // Отслеживание переходов в каталог
    const catalogLinks = document.querySelectorAll('a[href*="catalog"], a[href*="catalog.html"]');
    catalogLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Переход в каталог зафиксирован');
            recordStatistic('catalog');
        });
    });

    // Отслеживание переходов в новые поступления
    const newArrivalsLinks = document.querySelectorAll('a[href*="new-arrivals"], .new-arrivals a, .product-card[data-category="new"]');
    newArrivalsLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Переход в новые поступления зафиксирован');
            recordStatistic('newArrivals');
        });
    });

    // Отслеживание кликов на КИНОШЛЕП
    const kinoshlepElements = document.querySelectorAll('.kinoshlep, [data-kinoshlep], a[href*="kinoshlep"]');
    kinoshlepElements.forEach(element => {
        element.addEventListener('click', function() {
            console.log('Клик на КИНОШЛЕП зафиксирован');
            recordStatistic('kinoshlep');
        });
    });

    // Отслеживание регистраций пользователей
    const registrationForms = document.querySelectorAll('form[data-type="registration"], .registration-form');
    registrationForms.forEach(form => {
        form.addEventListener('submit', function() {
            console.log('Регистрация пользователя зафиксирована');
            recordStatistic('registrations');
        });
    });

    // Отслеживание оформления заказов (после подтверждения оплаты)
    const checkoutButtons = document.querySelectorAll('.checkout-btn, .order-btn, button[onclick*="checkout"]');
    checkoutButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Заказ будет записан только после подтверждения оплаты
            // Это будет реализовано в интеграции с ЮKassa
        });
    });

    // Отслеживание кликов по карточкам товаров из блока "Новые поступления"
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Проверяем, что клик не по кнопке действия (избранное, корзина)
            if (!e.target.closest('.action-btn') && !e.target.closest('.product-actions')) {
                // Проверяем, находится ли карточка в секции "Новые поступления"
                const newArrivalsSection = card.closest('[data-section="new-arrivals"], .new-arrivals, .new-arrivals-section');
                if (newArrivalsSection) {
                    console.log('Клик по карточке товара из "Новые поступления" зафиксирован');
                    recordStatistic('newArrivals');
                }
            }
        });
    });

    // Дополнительное отслеживание для карточек с прямыми ссылками
    const productCardLinks = document.querySelectorAll('.product-card[onclick*="product.html"]');
    productCardLinks.forEach(card => {
        // Создаем обработчик для onclick событий
        const originalOnclick = card.getAttribute('onclick');
        if (originalOnclick) {
            card.setAttribute('onclick', `recordStatistic('newArrivals'); ${originalOnclick}`);
        }
    });

    // Отслеживание по заголовку секции
    const newArrivalsSections = document.querySelectorAll('.section-title');
    newArrivalsSections.forEach(title => {
        if (title.textContent.includes('Новые поступления')) {
            const section = title.closest('[data-section="new-arrivals"], .content-section');
            if (section) {
                const cards = section.querySelectorAll('.product-card');
                cards.forEach(card => {
                    card.addEventListener('click', function(e) {
                        if (!e.target.closest('.action-btn') && !e.target.closest('.product-actions')) {
                            console.log('Клик по карточке товара из секции "Новые поступления" зафиксирован');
                            recordStatistic('newArrivals');
                        }
                    });
                });
            }
        }
    });

    console.log('Отслеживание статистики настроено');
}

// Функция для записи заказа (вызывается после подтверждения оплаты)
function recordOrder() {
    recordStatistic('orders');
}

// Экспорт функций для использования в других файлах
window.statistics = {
    recordStatistic,
    recordVisit,
    recordOrder,
    generateVisitorId
}; 
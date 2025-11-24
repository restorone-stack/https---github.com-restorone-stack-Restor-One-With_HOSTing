// ========================
//  CONFIG
// ========================
const API_URL = 'http://localhost:3000'; // пока не используется, но оставляем
const ALMATY_CENTER = [43.2380, 76.9456];

// ========================
//  I18N (переводы)
// ========================
const translations = {
    ru: {
        'stats.total': 'Заведений',
        'stats.visible': 'На карте',
        'stats.nearest': 'Ближайший',
        'sidebar.title': '🔍 Поиск и фильтры',
        'search.placeholder': 'Название, адрес, тип кухни...',
        'search.all': 'Все',
        'search.restaurants': 'Рестораны',
        'search.dishes': 'Блюда',
        'filters.type': '🏪 Тип заведения',
        'filters.all': 'Все',
        'filters.restaurant': 'Ресторан',
        'filters.cafe': 'Кафе',
        'filters.bar': 'Бар',
        'filters.rating': '⭐ Минимальный рейтинг',
        'filters.radius': '📍 Радиус поиска',
        'filters.sort': '📊 Сортировка',
        'sort.rating': 'По рейтингу',
        'sort.distance': 'По расстоянию',
        'sort.name': 'По имени',
        'units.km': 'км',
        'loading': 'Загрузка ресторанов...',
        'buttons.location': 'Моё местоположение',
        'buttons.nearest': 'Ближайший ресторан',
        'buttons.clusters': 'Кластеры',
        'buttons.reset': 'Сбросить',
        'buttons.map': 'На карте',
        'buttons.route': 'Маршрут',
        'buttons.details': 'Подробнее',
        'buttons.showRestaurants': 'Показать рестораны',
        'notifications.loaded': 'Загружено',
        'notifications.restaurants': 'заведений',
        'notifications.error': 'Ошибка загрузки. Запустите Backend сервер!',
        'notifications.location': 'Определяем ваше местоположение...',
        'notifications.locationSuccess': 'Местоположение определено!',
        'notifications.locationError': 'Не удалось определить местоположение',
        'notifications.nearest': 'Ближайший',
        'notifications.route': 'Маршрут',
        'notifications.routeError': 'Не удалось построить маршрут',
        'notifications.needLocation': 'Сначала определите своё местоположение',
        'notifications.building': 'Строим маршрут...',
        'notifications.clusters': 'Кластеры включены',
        'notifications.clustersOff': 'Кластеры выключены',
        'notifications.reset': 'Карта сброшена',
        'dish.availableIn': 'Доступно в',
        'dish.restaurants': 'ресторанах',
        'notFound': 'Ничего не найдено'
    },
    en: {
        'stats.total': 'Places',
        'stats.visible': 'On Map',
        'stats.nearest': 'Nearest',
        'sidebar.title': '🔍 Search & Filters',
        'search.placeholder': 'Name, address, cuisine type...',
        'search.all': 'All',
        'search.restaurants': 'Restaurants',
        'search.dishes': 'Dishes',
        'filters.type': '🏪 Place Type',
        'filters.all': 'All',
        'filters.restaurant': 'Restaurant',
        'filters.cafe': 'Cafe',
        'filters.bar': 'Bar',
        'filters.rating': '⭐ Minimum Rating',
        'filters.radius': '📍 Search Radius',
        'filters.sort': '📊 Sort',
        'sort.rating': 'By Rating',
        'sort.distance': 'By Distance',
        'sort.name': 'By Name',
        'units.km': 'km',
        'loading': 'Loading restaurants...',
        'buttons.location': 'My Location',
        'buttons.nearest': 'Nearest Restaurant',
        'buttons.clusters': 'Clusters',
        'buttons.reset': 'Reset',
        'buttons.map': 'On Map',
        'buttons.route': 'Route',
        'buttons.details': 'Details',
        'buttons.showRestaurants': 'Show Restaurants',
        'notifications.loaded': 'Loaded',
        'notifications.restaurants': 'places',
        'notifications.error': 'Loading error. Start Backend server!',
        'notifications.location': 'Getting your location...',
        'notifications.locationSuccess': 'Location found!',
        'notifications.locationError': 'Could not get location',
        'notifications.nearest': 'Nearest',
        'notifications.route': 'Route',
        'notifications.routeError': 'Could not build route',
        'notifications.needLocation': 'Please enable location first',
        'notifications.building': 'Building route...',
        'notifications.clusters': 'Clusters enabled',
        'notifications.clustersOff': 'Clusters disabled',
        'notifications.reset': 'Map reset',
        'dish.availableIn': 'Available in',
        'dish.restaurants': 'restaurants',
        'notFound': 'Nothing found'
    },
    kz: {
        'stats.total': 'Мекемелер',
        'stats.visible': 'Картада',
        'stats.nearest': 'Жақын',
        'sidebar.title': '🔍 Іздеу және сүзгілер',
        'search.placeholder': 'Атауы, мекенжайы, ас түрі...',
        'search.all': 'Барлығы',
        'search.restaurants': 'Мейрамханалар',
        'search.dishes': 'Тағамдар',
        'filters.type': '🏪 Мекеме түрі',
        'filters.all': 'Барлығы',
        'filters.restaurant': 'Мейрамхана',
        'filters.cafe': 'Кафе',
        'filters.bar': 'Бар',
        'filters.rating': '⭐ Ең төменгі рейтинг',
        'filters.radius': '📍 Іздеу радиусы',
        'filters.sort': '📊 Сұрыптау',
        'sort.rating': 'Рейтинг бойынша',
        'sort.distance': 'Қашықтық бойынша',
        'sort.name': 'Атау бойынша',
        'units.km': 'км',
        'loading': 'Мейрамханалар жүктелуде...',
        'buttons.location': 'Менің орным',
        'buttons.nearest': 'Жақын мейрамхана',
        'buttons.clusters': 'Кластерлер',
        'buttons.reset': 'Тастау',
        'buttons.map': 'Картада',
        'buttons.route': 'Бағыт',
        'buttons.details': 'Толығырақ',
        'buttons.showRestaurants': 'Мейрамханаларды көрсету',
        'notifications.loaded': 'Жүктелді',
        'notifications.restaurants': 'мекеме',
        'notifications.error': 'Жүктеу қатесі. Backend серверін іске қосыңыз!',
        'notifications.location': 'Орныңызды анықтауда...',
        'notifications.locationSuccess': 'Орын анықталды!',
        'notifications.locationError': 'Орынды анықтау мүмкін емес',
        'notifications.nearest': 'Жақын',
        'notifications.route': 'Бағыт',
        'notifications.routeError': 'Бағытты құру мүмкін емес',
        'notifications.needLocation': 'Алдымен орныңызды анықтаңыз',
        'notifications.building': 'Бағыт құрылуда...',
        'notifications.clusters': 'Кластерлер қосылды',
        'notifications.clustersOff': 'Кластерлер өшірілді',
        'notifications.reset': 'Карта тасталды',
        'dish.availableIn': 'Қолжетімді',
        'dish.restaurants': 'мейрамханада',
        'notFound': 'Ештеңе табылмады'
    }
};

let currentLanguage = 'ru';

function t(key) {
    return translations[currentLanguage]?.[key] || key;
}

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
    });

    updateTranslations();
}

function updateTranslations() {
    const langObj = translations[currentLanguage];

    if (!langObj) return;

    // текст
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (langObj[key]) el.textContent = langObj[key];
    });

    // placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (langObj[key]) el.placeholder = langObj[key];
    });

    // title
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (langObj[key]) el.title = langObj[key];
    });

    // перерисовать список, если данные уже загружены
    if (allRestaurants.length > 0 || foundDishes.length > 0) {
        displayResults();
    }
}

// ========================
//  STATE
// ========================

let map;
let markers = [];

let allRestaurants = [];
let allDishes = [];
let filteredRestaurants = [];
let foundDishes = [];

let activeDishId = null; // блюдо, для которого показываем цену на карте

let userMarker = null;
let userLocation = null;
let selectedRestaurant = null;
let selectedDish = null;

let infoWindow = null;
let directionsService = null;
let directionsRenderer = null;
let routeLine = null; // fallback-прямая линия, если Directions API не ответил

const filters = {
    search: '',
    searchType: 'all', // 'all' | 'restaurants' | 'dishes'
    type: 'all',
    minRating: 0,
    maxRadius: 20,
    sortBy: 'rating'
};

// ========================
//  MAP
// ========================
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: ALMATY_CENTER[0], lng: ALMATY_CENTER[1] },
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
    });

    infoWindow = new google.maps.InfoWindow();
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        preserveViewport: true,
        polylineOptions: {
            strokeColor: '#00ff66',
            strokeOpacity: 0.8,
            strokeWeight: 5
        }
    });
    directionsRenderer.setMap(map);
}

// ========================
//  DATA LOAD
// ========================
async function loadRestaurants() {
    showLoading(true);
    try {
        let restaurantsJson;
        
        // Try to fetch from PHP backend
        try {
            const restaurantsResponse = await fetch('http://localhost/api/restaurants.php');
            if (restaurantsResponse.ok) {
                restaurantsJson = await restaurantsResponse.json();
            } else {
                throw new Error('API not available');
            }
        } catch (apiError) {
            console.warn('PHP backend not available, using mock data');
            // Mock data for testing
            restaurantsJson = [
                {
                    id: 1,
                    name: "Ресторан Пример",
                    type: "Ресторан",
                    address: "ул. Абая 10, Алматы",
                    latitude: 43.238293,
                    longitude: 76.945465,
                    rating: 4.5,
                    cuisine: "Европейская"
                }
            ];
        }

        allRestaurants = restaurantsJson.map(r => ({
            ...r,
            id: Number(r.id),
            latitude: r.latitude !== null ? parseFloat(r.latitude) : null,
            longitude: r.longitude !== null ? parseFloat(r.longitude) : null,
            rating: r.rating !== null ? parseFloat(r.rating) : 0
        }));

        // блюда
        let dishesJson;
        
        try {
            const dishesResponse = await fetch('http://localhost/api/dishes.php');
            if (dishesResponse.ok) {
                dishesJson = await dishesResponse.json();
            } else {
                throw new Error('API not available');
            }
        } catch (apiError) {
            console.warn('Dishes API not available, using mock data');
            // Mock data for testing
            dishesJson = [
                {
                    id: 1,
                    name: "Стейк",
                    price: 5000,
                    ingredients: "говядина, соль, перец",
                    restaurants: "1"
                }
            ];
        }

        allDishes = dishesJson.map(d => {
            let id = Number(d.id);
            let price = d.price !== null ? Number(d.price) : 0;

            // ingredients
            let ingredients = d.ingredients;
            if (typeof ingredients === 'string') {
                const trimmed = ingredients.trim();
                if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
                    try {
                        ingredients = JSON.parse(trimmed);
                    } catch {
                        ingredients = trimmed.split(',').map(s => s.trim()).filter(Boolean);
                    }
                } else {
                    ingredients = trimmed.split(',').map(s => s.trim()).filter(Boolean);
                }
            }
            if (!Array.isArray(ingredients)) ingredients = [];

            // restaurants
            let restaurants = d.restaurants;
            if (typeof restaurants === 'string') {
                const trimmed = restaurants.trim();
                if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
                    try {
                        restaurants = JSON.parse(trimmed);
                    } catch {
                        restaurants = trimmed.split(',').map(x => Number(x.trim())).filter(Boolean);
                    }
                } else if (trimmed.length > 0) {
                    restaurants = trimmed.split(',').map(x => Number(x.trim())).filter(Boolean);
                } else {
                    restaurants = [];
                }
            }
            if (!Array.isArray(restaurants)) restaurants = [];

            return {
                ...d,
                id,
                price,
                ingredients,
                restaurants
            };
        });

        filteredRestaurants = [...allRestaurants];

        updateStats();
        applyFilters();

        showNotification(
            `${t('notifications.loaded')} ${allRestaurants.length} ${t('notifications.restaurants')}`,
            'success'
        );
    } catch (e) {
        console.error('Error loading data:', e);
        showNotification(t('notifications.error'), 'error');
    } finally {
        showLoading(false);
    }
}

// ========================
//  MARKERS
// ========================
function getRatingColor(rating) {
    if (rating >= 4.8) return 'green';
    if (rating >= 4.5) return 'blue';
    if (rating >= 4.0) return 'orange';
    return 'red';
}

function createMarker(restaurant, color) {
    const position = {
        lat: restaurant.latitude,
        lng: restaurant.longitude
    };

    // все блюда в ресторане
    const restaurantDishes = allDishes.filter(
        d => Array.isArray(d.restaurants) && d.restaurants.includes(restaurant.id)
    );

    const prices = restaurantDishes
        .map(d => d.price)
        .filter(p => typeof p === 'number' && p > 0);

    const minPrice = prices.length > 0 ? Math.min(...prices) : null;

    let priceHtml = '';

    // если активно конкретное блюдо
    if (activeDishId) {
        const activeDish = allDishes.find(d => d.id === activeDishId);
        if (
            activeDish &&
            Array.isArray(activeDish.restaurants) &&
            activeDish.restaurants.includes(restaurant.id) &&
            typeof activeDish.price === 'number'
        ) {
            priceHtml = `
                <div class="popup-info">
                    🍽️ ${activeDish.name}: <strong>${activeDish.price} ₸</strong>
                </div>
            `;
        }
    }

    // иначе — минимальная цена по меню
    if (!priceHtml && minPrice) {
        priceHtml = `<div class="popup-info">💰 от ${minPrice} ₸</div>`;
    }

    const popupContent = `
        <div class="custom-popup">
            <div class="popup-header">${restaurant.name}</div>
            <div class="popup-rating">⭐️ ${restaurant.rating || '—'}</div>
            ${priceHtml}
            <div class="popup-info">📍 ${restaurant.address || ''}</div>
            <div class="popup-actions">
                <button class="popup-btn primary" onclick="openRestaurantDetails(${restaurant.id})">
                    ${t('buttons.details')}
                </button>
                <button class="popup-btn secondary" onclick="showRoute(${restaurant.id})">
                    ${t('buttons.route')}
                </button>
            </div>
        </div>
    `;

    const marker = new google.maps.Marker({
        position,
        map,
        // если хочешь цветной кружок вместо стандартной иконки:
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: color,
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2
        }
    });

    // чтобы можно было найти маркер по restaurant.id
    marker.restaurant = restaurant;

    marker.addListener('click', () => {
        highlightRestaurantCard(restaurant.id);
        infoWindow.setContent(popupContent);
        infoWindow.open(map, marker);
    });

    return marker;
}

function displayMarkers() {
    // очистка
    markers.forEach(m => m.setMap(null));
    markers = [];

    filteredRestaurants.forEach(restaurant => {
        if (!restaurant.latitude || !restaurant.longitude) return;

        const color = getRatingColor(restaurant.rating);
        const marker = createMarker(restaurant, color);
        markers.push(marker);
    });

    document.getElementById('visibleRestaurants').textContent = filteredRestaurants.length;
}

// ========================
//  SIDEBAR / LIST
// ========================
function highlightRestaurantCard(id) {
    document.querySelectorAll('.result-card').forEach(card => {
        card.classList.remove('active');
    });
    const card = document.getElementById(`card-${id}`);
    if (card) card.classList.add('active');
}

function displayResults() {
    const container = document.getElementById('resultsSection');

    // режим: только блюда
    if (filters.searchType === 'dishes' && foundDishes.length > 0) {
        displayDishes(foundDishes);
        return;
    }

    // режим: все (блюда + рестораны)
    if (filters.searchType === 'all' && foundDishes.length > 0) {
        // блюда
        const dishCardsHtml = buildDishCardsHtml(foundDishes);
        // рестораны
        const restCardsHtml = buildRestaurantCardsHtml(filteredRestaurants);
        container.innerHTML = dishCardsHtml + restCardsHtml;
        return;
    }

    // только рестораны
    if (filteredRestaurants.length === 0) {
        container.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--gray);">${t('notFound')}</div>`;
        return;
    }

    container.innerHTML = buildRestaurantCardsHtml(filteredRestaurants);
}

function buildRestaurantCardsHtml(restaurants) {
    return restaurants
        .map(restaurant => {
            const distance = userLocation
                ? calculateDistance(
                    userLocation.lat,
                    userLocation.lng,
                    restaurant.latitude,
                    restaurant.longitude
                )
                : null;

            return `
                <div class="result-card" id="card-${restaurant.id}" onclick="focusRestaurant(${restaurant.id})">
                    <div class="card-header">
                        <div class="card-name">${restaurant.name}</div>
                        <div class="card-rating">⭐ ${restaurant.rating}</div>
                    </div>
                    <div class="card-type">🏪 ${restaurant.type || ''}</div>
                    ${
                        distance
                            ? `<div class="card-distance">📍 ${distance.toFixed(1)} ${t('units.km')}</div>`
                            : ''
                    }
                    <div class="card-address">${restaurant.address || ''}</div>
                    <div class="card-actions">
                        <button class="action-btn primary" onclick="event.stopPropagation(); focusRestaurant(${restaurant.id})">
                            ${t('buttons.map')}
                        </button>
                        ${
                            userLocation
                                ? `<button class="action-btn secondary" onclick="event.stopPropagation(); showRoute(${restaurant.id})">
                                    ${t('buttons.route')}
                                   </button>`
                                : ''
                        }
                    </div>
                </div>
            `;
        })
        .join('');
}

function buildDishCardsHtml(dishes) {
    // фильтрация блюд по типу / рейтингу / радиусу
    const filteredDishes = dishes.filter(dish => {
        const restaurantsWithDish = allRestaurants.filter(
            r => Array.isArray(dish.restaurants) && dish.restaurants.includes(r.id)
        );

        if (filters.type !== 'all') {
            if (!restaurantsWithDish.some(r => r.type === filters.type)) return false;
        }

        if (filters.minRating > 0) {
            if (!restaurantsWithDish.some(r => r.rating >= filters.minRating)) return false;
        }

        if (filters.maxRadius > 0 && userLocation) {
            const inRadius = restaurantsWithDish.some(r => {
                const d = calculateDistance(
                    userLocation.lat,
                    userLocation.lng,
                    r.latitude,
                    r.longitude
                );
                return d <= filters.maxRadius;
            });
            if (!inRadius) return false;
        }

        return true;
    });

    if (filteredDishes.length === 0) {
        return `<div style="text-align:center;padding:2rem;color:var(--gray);">${t('notFound')}</div>`;
    }

    return filteredDishes
        .map(dish => {
            const restaurantIds = dish.restaurants || [];
            const restaurants = allRestaurants.filter(r => restaurantIds.includes(r.id));

            return `
                <div class="result-card dish-card" onclick="focusDishRestaurants(${dish.id})">
                    <div class="card-header">
                        <div class="card-name">${dish.name}</div>
                        <div class="card-price">💰 ${dish.price} ₸</div>
                    </div>
                    <div class="card-category">🍽️ ${dish.category || ''}</div>
                    ${
                        dish.ingredients && dish.ingredients.length > 0
                            ? `<div class="card-ingredients">${dish.ingredients.join(', ')}</div>`
                            : ''
                    }
                    <div class="card-restaurants">
                        <div class="restaurants-count">
                            🏪 ${t('dish.availableIn')} ${restaurants.length} ${t('dish.restaurants')}
                        </div>
                        <div class="restaurants-list">
                            ${restaurants
                                .slice(0, 3)
                                .map(r => `<span class="restaurant-tag">${r.name}</span>`)
                                .join('')}
                            ${
                                restaurants.length > 3
                                    ? `<span class="restaurant-tag">+${restaurants.length - 3}</span>`
                                    : ''
                            }
                        </div>
                    </div>
                    <div class="card-actions">
                        <button class="action-btn primary" onclick="event.stopPropagation(); focusDishRestaurants(${dish.id})">
                            ${t('buttons.showRestaurants')}
                        </button>
                    </div>
                </div>
            `;
        })
        .join('');
}

function displayDishes(dishes) {
    const container = document.getElementById('resultsSection');
    container.innerHTML = buildDishCardsHtml(dishes);
}

function openRestaurantDetails(id) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('collapsed')) {
        sidebar.classList.remove('collapsed');
        const icon = document.getElementById('toggleIcon');
        if (icon) icon.textContent = '◀';
    }

    const card = document.getElementById(`card-${id}`);
    if (card) {
        document.querySelectorAll('.result-card').forEach(el => el.classList.remove('active'));
        card.classList.add('active');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    const restaurant = allRestaurants.find(r => r.id === id);
    if (restaurant && restaurant.latitude && restaurant.longitude) {
    	const position = { lat: restaurant.latitude, lng: restaurant.longitude };
    	map.setCenter(position);
    	map.setZoom(16);
    }
}

// ========================
//  FILTERS & SEARCH
// ========================
function applyFilters() {
    // база для фильтрации: либо результат поиска, либо все рестораны
    let base = filters.search ? [...filteredRestaurants] : [...allRestaurants];

    let results = base.filter(restaurant => {
        if (filters.type !== 'all' && restaurant.type !== filters.type) return false;

        if (restaurant.rating < filters.minRating) return false;

        const maxRadius = filters.maxRadius;
        if (maxRadius > 0 && maxRadius < 20) {
            const centerLat = userLocation ? userLocation.lat : ALMATY_CENTER[0];
            const centerLng = userLocation ? userLocation.lng : ALMATY_CENTER[1];
            const distance = calculateDistance(
                centerLat,
                centerLng,
                restaurant.latitude,
                restaurant.longitude
            );
            if (distance > maxRadius) return false;
        }

        return true;
    });

    // сортировка
    sortResults(filters.sortBy, results, false); // без немедленного displayResults

    filteredRestaurants = results;

    displayMarkers();
    if (filters.searchType === 'restaurants' || filters.searchType === 'all') {
        displayResults();
    } else {
        displayDishes(foundDishes);
    }
    updateStats();
}

function setSearchType(type) {
    filters.searchType = type;

    document.querySelectorAll('[data-search-type]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.searchType === type);
    });

    if (type !== 'all') {
        foundDishes = [];
    }

    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        handleSearch();
    } else {
        filteredRestaurants = [...allRestaurants];
        displayResults();
        displayMarkers();
    }
}

function updateSearchButton() {
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearBtn');

    if (input.value.trim()) {
        clearBtn.classList.remove('hidden');
    } else {
        clearBtn.classList.add('hidden');
    }
}

function clearSearch() {
    const input = document.getElementById('searchInput');
    input.value = '';
    filters.search = '';
    filteredRestaurants = [...allRestaurants];
    foundDishes = [];
    selectedDish = null;
    activeDishId = null;
    applyFilters();
    updateSearchButton();
    showNotification(t('notifications.reset'), 'info');
}

async function handleSearch() {
    const query = document.getElementById('searchInput').value.trim();
    filters.search = query;
    activeDishId = null;

    if (!query) {
        filteredRestaurants = [...allRestaurants];
        foundDishes = [];
        selectedDish = null;
        applyFilters();
        return;
    }

    showLoading(true);

    try {
        const searchLower = query.toLowerCase();

        if (filters.searchType === 'restaurants') {
            // только рестораны
            filteredRestaurants = allRestaurants.filter(r => {
                return (
                    (r.name && r.name.toLowerCase().includes(searchLower)) ||
                    (r.address && r.address.toLowerCase().includes(searchLower)) ||
                    (r.type && r.type.toLowerCase().includes(searchLower))
                );
            });
            foundDishes = [];

            if (filteredRestaurants.length === 0) {
                showNotification('Рестораны не найдены', 'info');
            }
        } else if (filters.searchType === 'dishes') {
            // только блюда
            foundDishes = allDishes.filter(dish => {
                return (
                    (dish.name && dish.name.toLowerCase().includes(searchLower)) ||
                    (dish.category && dish.category.toLowerCase().includes(searchLower)) ||
                    (Array.isArray(dish.ingredients) &&
                        dish.ingredients.some(ing => ing.toLowerCase().includes(searchLower)))
                );
            });
            filteredRestaurants = [];

            if (foundDishes.length === 0) {
                showNotification('Блюда не найдены', 'info');
                selectedDish = null;
                activeDishId = null;
            } else {
                selectedDish = foundDishes[0];
                activeDishId = foundDishes[0].id;

                const restaurantIds = new Set();
                foundDishes.forEach(dish => {
                    if (Array.isArray(dish.restaurants)) {
                        dish.restaurants.forEach(rid => restaurantIds.add(rid));
                    }
                });
                filteredRestaurants = allRestaurants.filter(r => restaurantIds.has(r.id));
            }
        } else {
            // и рестораны, и блюда
            const foundRestaurants = allRestaurants.filter(r => {
                return (
                    (r.name && r.name.toLowerCase().includes(searchLower)) ||
                    (r.address && r.address.toLowerCase().includes(searchLower)) ||
                    (r.type && r.type.toLowerCase().includes(searchLower))
                );
            });

            const foundDishesAll = allDishes.filter(dish => {
                return (
                    (dish.name && dish.name.toLowerCase().includes(searchLower)) ||
                    (dish.category && dish.category.toLowerCase().includes(searchLower)) ||
                    (Array.isArray(dish.ingredients) &&
                        dish.ingredients.some(ing => ing.toLowerCase().includes(searchLower)))
                );
            });

            foundDishes = foundDishesAll;
            selectedDish = foundDishesAll[0] || null;
            activeDishId = selectedDish ? selectedDish.id : null;

            if (foundRestaurants.length > 0) {
                filteredRestaurants = foundRestaurants;
            } else {
                const restaurantIds = new Set();
                foundDishesAll.forEach(dish => {
                    if (Array.isArray(dish.restaurants)) {
                        dish.restaurants.forEach(rid => restaurantIds.add(rid));
                    }
                });
                filteredRestaurants = allRestaurants.filter(r => restaurantIds.has(r.id));
            }

            if (foundRestaurants.length === 0 && foundDishesAll.length === 0) {
                showNotification('Ничего не найдено', 'info');
                selectedDish = null;
            } else {
                showNotification(
                    `Найдено ${foundRestaurants.length} ресторанов и ${foundDishesAll.length} блюд`,
                    'info'
                );
            }
        }

        applyFilters();
    } catch (e) {
        console.error('Search error:', e);
        showNotification('Ошибка поиска', 'error');

        // fallback
        filteredRestaurants = allRestaurants.filter(r => {
            const s = query.toLowerCase();
            return (
                (r.name && r.name.toLowerCase().includes(s)) ||
                (r.address && r.address.toLowerCase().includes(s)) ||
                (r.type && r.type.toLowerCase().includes(s))
            );
        });
        foundDishes = [];
        applyFilters();
    } finally {
        showLoading(false);
    }
}

function filterByType(type) {
    filters.type = type;

    document.querySelectorAll('[data-type]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === type);
    });

    applyFilters();
}

function filterByRating(value) {
    const ratingValue = parseFloat(value);
    filters.minRating = ratingValue;
    document.getElementById('ratingValue').textContent = ratingValue.toFixed(1);
    applyFilters();
}

function filterByRadius(value) {
    const radiusValue = parseInt(value, 10);
    filters.maxRadius = radiusValue;
    document.getElementById('radiusValue').textContent = radiusValue;
    applyFilters();
}

function sortResults(sortBy, resultsArray = filteredRestaurants, updateUI = true) {
    filters.sortBy = sortBy;

    if (updateUI) {
        document.querySelectorAll('[data-sort]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.sort === sortBy);
        });
    }

    resultsArray.sort((a, b) => {
        switch (sortBy) {
            case 'rating':
                return (b.rating || 0) - (a.rating || 0);
            case 'distance': {
                if (!userLocation) return 0;
                const distA = calculateDistance(
                    userLocation.lat,
                    userLocation.lng,
                    a.latitude,
                    a.longitude
                );
                const distB = calculateDistance(
                    userLocation.lat,
                    userLocation.lng,
                    b.latitude,
                    b.longitude
                );
                return distA - distB;
            }
            case 'name':
                return (a.name || '').localeCompare(b.name || '');
            default:
                return 0;
        }
    });

    if (updateUI && resultsArray === filteredRestaurants) {
        displayResults();
    }
}

// ========================
//  LOCATION & ROUTES
// ========================
function getUserLocation() {
    if (userLocation) {
        // выкл геолокацию
        userLocation = null;
        if (userMarker) {
            map.removeLayer(userMarker);
            userMarker = null;
        }
        document.getElementById('locationBtn').classList.remove('active');
        showNotification('Местоположение отключено', 'info');
        applyFilters();
        return;
    }

    if (!navigator.geolocation) {
        showNotification('Геолокация не поддерживается', 'error');
        return;
    }

    showNotification(t('notifications.location'), 'info');

    navigator.geolocation.getCurrentPosition(
        pos => {
            userLocation = {
    			lat: pos.coords.latitude,
    			lng: pos.coords.longitude
			};

if (userMarker) {
    userMarker.setMap(null);
}

userMarker = new google.maps.Marker({
    position: userLocation,
    map,
    icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#ff0000',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2
    },
    title: 'Вы здесь'
});

map.setCenter(userLocation);
map.setZoom(14);

document.getElementById('locationBtn').classList.add('active');
showNotification(t('notifications.locationSuccess'), 'success');

applyFilters();
updateNearestDistance();


            document.getElementById('locationBtn').classList.add('active');

            showNotification(t('notifications.locationSuccess'), 'success');

            applyFilters();
            updateNearestDistance();
        },
        err => {
            console.error(err);
            showNotification(t('notifications.locationError'), 'error');
        }
    );
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function findNearest() {
    if (!userLocation) {
        getUserLocation();
        return;
    }

    let nearest = null;
    let minDistance = Infinity;

    allRestaurants.forEach(r => {
        if (!r.latitude || !r.longitude) return;
        const d = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            r.latitude,
            r.longitude
        );
        if (d < minDistance) {
            minDistance = d;
            nearest = r;
        }
    });

    if (nearest) {
        focusRestaurant(nearest.id);
        showNotification(
            `${t('notifications.nearest')}: ${nearest.name} (${minDistance.toFixed(1)} км)`,
            'success'
        );
    }
}

function focusRestaurant(id) {
    const restaurant = allRestaurants.find(r => r.id === id);
	if (!restaurant || !restaurant.latitude || !restaurant.longitude) return;

	selectedRestaurant = restaurant;

	const position = { lat: restaurant.latitude, lng: restaurant.longitude };
	map.setCenter(position);
	map.setZoom(16);

	const marker = markers.find(m => m.restaurant && m.restaurant.id === id);
	if (marker) {
    	google.maps.event.trigger(marker, 'click');
	}

	highlightRestaurantCard(id);


    const card = document.getElementById(`card-${id}`);
    if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function focusDishRestaurants(dishId) {
    const dish = allDishes.find(d => d.id === dishId);
    if (!dish || !Array.isArray(dish.restaurants) || dish.restaurants.length === 0) {
        showNotification('Для этого блюда пока нет ресторанов', 'info');
        return;
    }

    activeDishId = dishId;

    const restaurants = allRestaurants.filter(r => dish.restaurants.includes(r.id));
    if (restaurants.length === 0) {
        showNotification('Рестораны не найдены', 'info');
        return;
    }

    filteredRestaurants = restaurants;
    displayMarkers();
    displayResults();

    const first = restaurants[0];
    if (first.latitude && first.longitude) {
        map.setView([first.latitude, first.longitude], 15);
    }
}

function showRoute(id) {
    if (!userLocation) {
        showNotification(t('notifications.needLocation'), 'error');
        return;
    }

    const restaurant = allRestaurants.find(r => r.id === id);
    if (!restaurant) return;

    // очищаем предыдущий маршрут
    if (directionsRenderer) {
        directionsRenderer.set('directions', null);
    }
    if (routeLine) {
        routeLine.setMap(null);
        routeLine = null;
    }

    showNotification(t('notifications.building'), 'info');

    const origin = { lat: userLocation.lat, lng: userLocation.lng };
    const destination = { lat: restaurant.latitude, lng: restaurant.longitude };

    directionsService.route(
        {
            origin,
            destination,
            travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);

                const leg = result.routes[0].legs[0];
                const distanceKm = leg.distance.value / 1000;
                const durationMin = Math.round(leg.duration.value / 60);

                showNotification(
                    `Маршрут: ${distanceKm.toFixed(1)} км, ~${durationMin} мин`,
                    'success'
                );
            } else {
                console.error('Directions error:', status);
                showNotification(
                    t('notifications.routeError') || 'Ошибка построения маршрута',
                    'error'
                );

                // fallback: прямая линия, как у тебя было на Leaflet
                routeLine = new google.maps.Polyline({
                    path: [origin, destination],
                    strokeColor: '#00ff66',
                    strokeOpacity: 0.7,
                    strokeWeight: 4,
                    geodesic: true
                });
                routeLine.setMap(map);

                const bounds = new google.maps.LatLngBounds();
                bounds.extend(origin);
                bounds.extend(destination);
                map.fitBounds(bounds);

                const distance = calculateDistance(
                    origin.lat,
                    origin.lng,
                    destination.lat,
                    destination.lng
                );
                showNotification(`Прямая линия: ${distance.toFixed(1)} км`, 'info');
            }
        }
    );
}

// ========================
//  UI / MISC
// ========================
function toggleClusters() {
    useClusters = !useClusters;
    document
        .getElementById('clusterBtn')
        .classList.toggle('active', useClusters);
    displayMarkers();
    showNotification(
        useClusters ? t('notifications.clusters') : t('notifications.clustersOff'),
        'info'
    );
}

function resetMap() {
    map.setCenter({ lat: ALMATY_CENTER[0], lng: ALMATY_CENTER[1] });
	map.setZoom(12);

    filters.search = '';
    filters.type = 'all';
    filters.minRating = 0;
    filters.maxRadius = 20;
    filters.sortBy = 'rating';
    filters.searchType = 'all';

    document.getElementById('searchInput').value = '';
    document.getElementById('ratingSlider').value = 0;
    document.getElementById('ratingValue').textContent = '0';
    document.getElementById('radiusSlider').value = 20;
    document.getElementById('radiusValue').textContent = '20';

    document.querySelectorAll('[data-search-type]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.searchType === 'all');
    });

    if (directionsRenderer) {
        directionsRenderer.set('directions', null);
    }
    if (routeLine) {
        routeLine.setMap(null);
        routeLine = null;
    }

    if (userLocation) {
        userLocation = null;
        if (userMarker) {
            userMarker.setMap(null);
            userMarker = null;
        }
        document.getElementById('locationBtn').classList.remove('active');
    }

    filteredRestaurants = [...allRestaurants];
    foundDishes = [];
    activeDishId = null;
    selectedDish = null;

    applyFilters();
    updateSearchButton();

    showNotification('Все фильтры сброшены', 'success');
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const icon = document.getElementById('toggleIcon');
    sidebar.classList.toggle('collapsed');
    icon.textContent = sidebar.classList.contains('collapsed') ? '▶' : '◀';
}

function updateStats() {
    document.getElementById('totalRestaurants').textContent = allRestaurants.length;
    document.getElementById('visibleRestaurants').textContent = filteredRestaurants.length;
}

function updateNearestDistance() {
    const el = document.getElementById('userDistance');
    if (!userLocation) {
        el.textContent = '--';
        return;
    }

    let minDistance = Infinity;

    allRestaurants.forEach(r => {
        if (!r.latitude || !r.longitude) return;
        const d = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            r.latitude,
            r.longitude
        );
        if (d < minDistance) minDistance = d;
    });

    el.textContent = `${minDistance.toFixed(1)} км`;
}

function showLoading(show) {
    document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none';
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
}

// ========================
//  INIT
// ========================
(function init() {
    // язык из localStorage
    const savedLang = localStorage.getItem('language') || 'ru';
    currentLanguage = savedLang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === savedLang);
    });

    updateTranslations();
    initMap();
    loadRestaurants();
    updateSearchButton();
})();
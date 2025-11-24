// ========== DATA STORAGE ==========
let currentUser = null;
let businessUsers = JSON.parse(localStorage.getItem('restor1_business_users')) || [];
let regularUsers = JSON.parse(localStorage.getItem('restor1_regular_users')) || [];
let reviews = JSON.parse(localStorage.getItem('restor1_reviews')) || [];
let currentLanguage = localStorage.getItem('restor1_language') || 'ru';
let currentRestaurantForReview = null;

// ========== TRANSLATIONS ==========
const translations = {
    ru: {
        logo: 'Restor-1',
        nav_erb: 'Единый Реестр Блюд',
        nav_restaurants: 'Заведения',
        nav_dashboard: 'Панель управления',
        btn_register: 'Регистрация',
        btn_login: 'Вход',
        btn_cabinet: 'Бизнес-кабинет',
        btn_logout: 'Выйти',
        hero_title: 'Добро пожаловать в Restor-1!',
        hero_subtitle: 'Единая платформа для поиска блюд и управления меню ресторанов. Найдите любимые блюда по лучшим ценам или зарегистрируйте свое заведение!',
        hero_view_dishes: 'Посмотреть блюда',
        hero_register_business: 'Зарегистрировать заведение',
        feature1_title: 'Единый Реестр Блюд',
        feature1_desc: 'Более 30 блюд из разных кухонь мира. Сравнивайте цены в разных заведениях и выбирайте лучшее предложение!',
        feature2_title: 'Заведения города',
        feature2_desc: 'Рестораны, кафе, кофейни и другие места. Узнайте меню и цены перед визитом!',
        feature3_title: 'Для бизнеса',
        feature3_desc: 'Зарегистрируйте свое заведение, управляйте меню и привлекайте клиентов!',
        feature4_title: 'Отзывы',
        feature4_desc: 'Читайте отзывы других пользователей и делитесь своим опытом!',
        erb_title: 'Единый Реестр Блюд',
        erb_subtitle: 'Выберите кухню, чтобы увидеть все блюда с ценами по заведениям',
        restaurants_title: 'Заведения',
        restaurants_subtitle: 'Список всех зарегистрированных заведений',
        register_title: 'Регистрация',
        tab_business: 'Для бизнеса',
        tab_user: 'Для пользователей',
        label_owner_name: 'ФИО владельца/доверенного лица',
        label_bin: 'БИН заведения',
        hint_bin: '12-значный идентификационный номер',
        label_restaurant_name: 'Название заведения',
        label_restaurant_type: 'Тип заведения',
        option_select_type: 'Выберите тип',
        type_restaurant: 'Ресторан',
        type_cafe: 'Кафе',
        type_coffee: 'Кофейня',
        type_bar: 'Бар',
        type_fastfood: 'Фастфуд',
        label_cuisines: 'Кухни (выберите все, что готовите)',
        label_address: 'Адрес',
        label_phone: 'Телефон',
        label_password: 'Пароль',
        label_confirm_password: 'Подтверждение пароля',
        label_founding_doc: 'Учредительный документ',
        upload_click: 'Нажмите для загрузки файла',
        btn_register_submit: 'Зарегистрироваться',
        already_have_account: 'Уже есть аккаунт?',
        login: 'Войти',
        label_full_name: 'ФИО',
        login_title: 'Войдите в систему',
        btn_login_submit: 'Войти',
        no_account: 'Нет аккаунта?',
        register: 'Зарегистрироваться',
        dashboard_title: 'Бизнес-кабинет',
        cabinet_overview: 'Обзор',
        cabinet_my_restaurant: 'Моё заведение',
        cabinet_my_menu: 'Моё меню',
        cabinet_reviews: 'Отзывы',
        cabinet_edit: 'Редактировать',
        welcome: 'Добро пожаловать!',
        dashboard_description: 'Управляйте своим заведением в одном месте. Добавляйте блюда из Единого Реестра Блюд, устанавливайте свои цены и привлекайте новых клиентов!',
        stats: 'Статистика',
        dishes_in_menu: 'Блюд в меню: ',
        menu_management: 'Управление меню',
        add_dishes_description: 'Добавляйте блюда из ЕРБ и устанавливайте цены',
        reviews: 'Отзывы',
        total_reviews: 'Всего отзывов: ',
        my_menu_title: 'Моё меню',
        add_dishes_from_erb: 'Добавить блюда из ЕРБ',
        add_dishes_from_file: 'Импорт через GPT',
        import_menu_title: 'Импорт меню через GPT',
        import_menu_desc: 'Загрузите меню из Word/PDF и отправьте в GPT прямо в личном кабинете',
        open_full_import_page: 'Открыть полноэкранно',
        import_menu_hint: 'После отправки откроется предпросмотр и подтверждение добавления блюд.',
        import_menu_launch: 'Откройте https://<ваш_домен>/registr_login/Registr_login_profile_mainPage.html#dashboard на хостинге, перейдите в «Моё меню» и загрузите файл.',
        restaurant_reviews: 'Отзывы о заведении',
        edit_restaurant_info: 'Редактировать информацию о заведении',
        save_changes: 'Сохранить изменения',
        select_dishes_from_erb: 'Выберите блюда из Единого Реестра Блюд',
        select_dishes_instruction: 'Отметьте нужные блюда галочками и укажите цены для вашего заведения',
        add_selected_dishes: 'Добавить выбранные блюда',
        cancel: 'Отмена',
        write_review: 'Написать отзыв',
        rating: 'Оценка',
        your_review: 'Ваш отзыв',
        publish_review: 'Опубликовать отзыв',
        back: 'Назад',
        leave_review: 'Оставить отзыв',
        view_menu: 'Посмотреть меню',
        no_reviews: 'Пока нет отзывов',
        dishes_count: 'Блюд в меню: '
    },
    kz: {
        logo: 'Restor-1',
        nav_erb: 'Тағамдардың Бірыңғай Тізілімі',
        nav_restaurants: 'Мекемелер',
        nav_dashboard: 'Басқару панелі',
        btn_register: 'Тіркелу',
        btn_login: 'Кіру',
        btn_cabinet: 'Бизнес-кабинет',
        btn_logout: 'Шығу',
        hero_title: 'Restor-1-ге қош келдіңіз!',
        hero_subtitle: 'Тағамдарды іздеу және мейрамханалардың мәзірін басқару үшін бірыңғай платформа. Сүйікті тағамдарыңызды ең жақсы бағаларда табыңыз немесе өз мекемеңізді тіркеңіз!',
        hero_view_dishes: 'Тағамдарды қарау',
        hero_register_business: 'Мекемені тіркеу',
        feature1_title: 'Тағамдардың Бірыңғай Тізілімі',
        feature1_desc: 'Әлемнің әртүрлі ас мәдениеттерінен 30-дан астам тағам. Әртүрлі мекемелердегі бағаларды салыстырыңыз және ең жақсы ұсынысты таңдаңыз!',
        feature2_title: 'Қаланың мекемелері',
        feature2_desc: 'Мейрамханалар, кафелер, кофейнялар және басқа орындар. Барардан бұрын мәзір мен бағаларды біліңіз!',
        feature3_title: 'Бизнес үшін',
        feature3_desc: 'Өз мекемеңізді тіркеңіз, мәзірді басқарыңыз және клиенттерді тартыңыз!',
        feature4_title: 'Пікірлер',
        feature4_desc: 'Басқа пайдаланушылардың пікірлерін оқыңыз және өз тәжірибеңізбен бөлісіңіз!',
        erb_title: 'Тағамдардың Бірыңғай Тізілімі',
        erb_subtitle: 'Барлық тағамдарды мекемелер бойынша бағаларымен көру үшін ас мәдениетін таңдаңыз',
        restaurants_title: 'Мекемелер',
        restaurants_subtitle: 'Барлық тіркелген мекемелердің тізімі',
        register_title: 'Тіркелу',
        tab_business: 'Бизнес үшін',
        tab_user: 'Пайдаланушылар үшін',
        label_owner_name: 'Иесінің/сенімгердің ТАӘ',
        label_bin: 'Мекеменің БСН',
        hint_bin: '12 таңбалы сәйкестендіру нөмірі',
        label_restaurant_name: 'Мекеменің атауы',
        label_restaurant_type: 'Мекеме түрі',
        option_select_type: 'Түрін таңдаңыз',
        type_restaurant: 'Мейрамхана',
        type_cafe: 'Кафе',
        type_coffee: 'Кофейня',
        type_bar: 'Бар',
        type_fastfood: 'Фастфуд',
        label_cuisines: 'Ас мәдениеттері (дайындайтын барлығын таңдаңыз)',
        label_address: 'Мекенжай',
        label_phone: 'Телефон',
        label_password: 'Құпия сөз',
        label_confirm_password: 'Құпия сөзді растау',
        label_founding_doc: 'Құрылтай құжаты',
        upload_click: 'Файлды жүктеу үшін басыңыз',
        btn_register_submit: 'Тіркелу',
        already_have_account: 'Аккаунт бар ма?',
        login: 'Кіру',
        label_full_name: 'ТАӘ',
        login_title: 'Жүйеге кіріңіз',
        btn_login_submit: 'Кіру',
        no_account: 'Аккаунт жоқ па?',
        register: 'Тіркелу',
        dashboard_title: 'Бизнес-кабинет',
        cabinet_overview: 'Шолу',
        cabinet_my_restaurant: 'Менің мекемем',
        cabinet_my_menu: 'Менің мәзірім',
        cabinet_reviews: 'Пікірлер',
        cabinet_edit: 'Өңдеу',
        welcome: 'Қош келдіңіз!',
        dashboard_description: 'Өз мекемеңізді бір жерден басқарыңыз. ТБТ-дан тағамдар қосыңыз, бағаларды белгілеңіз және жаңа клиенттерді тартыңыз!',
        stats: 'Статистика',
        dishes_in_menu: 'Мәзірдегі тағамдар: ',
        menu_management: 'Мәзірді басқару',
        add_dishes_description: 'ТБТ-дан тағамдар қосыңыз және бағаларды белгілеңіз',
        reviews: 'Пікірлер',
        total_reviews: 'Барлығы пікірлер: ',
        my_menu_title: 'Менің мәзірім',
        add_dishes_from_erb: 'ТБТ-дан тағамдар қосу',
		add_dishes_from_file: 'GPT арқылы импорт',
        import_menu_title: 'GPT арқылы мәзір импорттау',
        import_menu_desc: 'Word/PDF файлдағы мәзірді осы кабинеттен GPT-ке жіберіңіз',
        open_full_import_page: 'Толық экранда ашу',
        import_menu_hint: 'Жібергеннен кейін алдын ала қарау және растау парағы ашылады.',
        import_menu_launch: 'Хостингте https://<сайтыңыз>/registr_login/Registr_login_profile_mainPage.html#dashboard сілтемесін ашып, «Менің мәзірім» бөліміне өтіп файлды жүктеңіз.',
        restaurant_reviews: 'Мекеме туралы пікірлер',
        edit_restaurant_info: 'Мекеме туралы ақпаратты өңдеу',
        save_changes: 'Өзгерістерді сақтау',
        select_dishes_from_erb: 'Тағамдардың Бірыңғай Тізілімінен тағамдарды таңдаңыз',
        select_dishes_instruction: 'Қажетті тағамдарды белгілеңіз және өз мекемеңіз үшін бағаларды көрсетіңіз',
        add_selected_dishes: 'Таңдалған тағамдарды қосу',
        cancel: 'Болдырмау',
        write_review: 'Пікір жазу',
        rating: 'Бағалау',
        your_review: 'Сіздің пікіріңіз',
        publish_review: 'Пікірді жариялау',
        back: 'Артқа',
        leave_review: 'Пікір қалдыру',
        view_menu: 'Мәзірді қарау',
        no_reviews: 'Әзірге пікірлер жоқ',
        dishes_count: 'Мәзірдегі тағамдар: '
    },
    en: {
        logo: 'Restor-1',
        nav_erb: 'Unified Dishes Registry',
        nav_restaurants: 'Restaurants',
        nav_dashboard: 'Dashboard',
        btn_register: 'Register',
        btn_login: 'Login',
        btn_cabinet: 'Business Cabinet',
        btn_logout: 'Logout',
        hero_title: 'Welcome to Restor-1!',
        hero_subtitle: 'Unified platform for finding dishes and managing restaurant menus. Find your favorite dishes at the best prices or register your establishment!',
        hero_view_dishes: 'View Dishes',
        hero_register_business: 'Register Establishment',
        feature1_title: 'Unified Dishes Registry',
        feature1_desc: 'More than 30 dishes from different world cuisines. Compare prices in different establishments and choose the best offer!',
        feature2_title: 'City Establishments',
        feature2_desc: 'Restaurants, cafes, coffee shops and other places. Learn about menu and prices before visiting!',
        feature3_title: 'For Business',
        feature3_desc: 'Register your establishment, manage menu and attract customers!',
        feature4_title: 'Reviews',
        feature4_desc: 'Read reviews from other users and share your experience!',
        erb_title: 'Unified Dishes Registry',
        erb_subtitle: 'Select cuisine to see all dishes with prices by establishments',
        restaurants_title: 'Establishments',
        restaurants_subtitle: 'List of all registered establishments',
        register_title: 'Registration',
        tab_business: 'For Business',
        tab_user: 'For Users',
        label_owner_name: 'Owner/Authorized Person Full Name',
        label_bin: 'Establishment BIN',
        hint_bin: '12-digit identification number',
        label_restaurant_name: 'Establishment Name',
        label_restaurant_type: 'Establishment Type',
        option_select_type: 'Select Type',
        type_restaurant: 'Restaurant',
        type_cafe: 'Cafe',
        type_coffee: 'Coffee Shop',
        type_bar: 'Bar',
        type_fastfood: 'Fast Food',
        label_cuisines: 'Cuisines (select all you cook)',
        label_address: 'Address',
        label_phone: 'Phone',
        label_password: 'Password',
        label_confirm_password: 'Confirm Password',
        label_founding_doc: 'Founding Document',
        upload_click: 'Click to upload file',
        btn_register_submit: 'Register',
        already_have_account: 'Already have an account?',
        login: 'Login',
        label_full_name: 'Full Name',
        login_title: 'Log in to the system',
        btn_login_submit: 'Login',
        no_account: 'No account?',
        register: 'Register',
        dashboard_title: 'Business Cabinet',
        cabinet_overview: 'Overview',
        cabinet_my_restaurant: 'My Establishment',
        cabinet_my_menu: 'My Menu',
        cabinet_reviews: 'Reviews',
        cabinet_edit: 'Edit',
        welcome: 'Welcome!',
        dashboard_description: 'Manage your establishment in one place. Add dishes from the Unified Dishes Registry, set your prices and attract new customers!',
        stats: 'Statistics',
        dishes_in_menu: 'Dishes in menu: ',
        menu_management: 'Menu Management',
        add_dishes_description: 'Add dishes from UDR and set prices',
        reviews: 'Reviews',
        total_reviews: 'Total reviews: ',
        my_menu_title: 'My Menu',
        add_dishes_from_erb: 'Add Dishes from UDR',
		add_dishes_from_file: 'Import with GPT',
        import_menu_title: 'Import menu with GPT',
        import_menu_desc: 'Upload a Word/PDF menu and send it to GPT right inside the cabinet',
        open_full_import_page: 'Open full page',
        import_menu_hint: 'After submitting you will see a preview page to confirm adding dishes.',
        import_menu_launch: 'On hosting open https://<your_domain>/registr_login/Registr_login_profile_mainPage.html#dashboard, go to "My Menu" and upload the file.',
        restaurant_reviews: 'Establishment Reviews',
        edit_restaurant_info: 'Edit Establishment Information',
        save_changes: 'Save Changes',
        select_dishes_from_erb: 'Select Dishes from Unified Dishes Registry',
        select_dishes_instruction: 'Check the dishes you need and specify prices for your establishment',
        add_selected_dishes: 'Add Selected Dishes',
        cancel: 'Cancel',
        write_review: 'Write Review',
        rating: 'Rating',
        your_review: 'Your Review',
        publish_review: 'Publish Review',
        back: 'Back',
        leave_review: 'Leave Review',
        view_menu: 'View Menu',
        no_reviews: 'No reviews yet',
        dishes_count: 'Dishes in menu: '
    }
};

// ========== ЕДИНЫЙ РЕЕСТР БЛЮД ==========
const ERB_DATABASE = {
    'Казахская': [
        { id: 1, name: 'Бешбармак', description: 'Традиционное казахское блюдо из отварного мяса и тонкой лапши', cuisine: 'Казахская' },
        { id: 2, name: 'Куырдак', description: 'Жаркое из субпродуктов с луком и картофелем', cuisine: 'Казахская' },
        { id: 3, name: 'Баурсаки "1"кг', description: 'Традиционная казахская выпечка - жареные в масле кусочки теста', cuisine: 'Казахская' },
        { id: 4, name: 'Манты', description: 'Паровые пельмени с мясом и луком', cuisine: 'Казахская' },
        { id: 5, name: 'Лагман', description: 'Густой суп с длинной лапшой, мясом и овощами', cuisine: 'Казахская' }
    ],
    'Кавказская': [
        { id: 6, name: 'Хачапури', description: 'Грузинская лепешка с сыром и яйцом', cuisine: 'Кавказская' },
        { id: 7, name: 'Хинкали', description: 'Грузинские пельмени с сочной начинкой', cuisine: 'Кавказская' },
        { id: 8, name: 'Шашлык', description: 'Маринованное мясо, приготовленное на мангале', cuisine: 'Кавказская' },
        { id: 9, name: 'Долма', description: 'Фаршированные виноградные листья с рисом и мясом', cuisine: 'Кавказская' },
        { id: 10, name: 'Чахохбили', description: 'Тушеная курица в томатном соусе с травами', cuisine: 'Кавказская' }
    ],
    'Европейская': [
        { id: 11, name: 'Паста Карбонара', description: 'Итальянская паста со сливочным соусом и беконом', cuisine: 'Европейская' },
        { id: 12, name: 'Пицца Маргарита', description: 'Классическая итальянская пицца с томатами и моцареллой', cuisine: 'Европейская' },
        { id: 13, name: 'Стейк Рибай', description: 'Сочный говяжий стейк с мраморными прожилками', cuisine: 'Европейская' },
        { id: 14, name: 'Рататуй', description: 'Французское овощное рагу из баклажанов, кабачков и томатов', cuisine: 'Европейская' },
        { id: 15, name: 'Лазанья', description: 'Итальянская запеканка из слоев теста, мяса и сыра', cuisine: 'Европейская' }
    ],
    'Азиатская': [
        { id: 16, name: 'Суши сет', description: 'Японские роллы с рисом, рыбой и овощами', cuisine: 'Азиатская' },
        { id: 17, name: 'Рамен', description: 'Японский суп с лапшой, яйцом и мясом', cuisine: 'Азиатская' },
        { id: 18, name: 'Пад Тай', description: 'Тайская рисовая лапша с креветками и арахисом', cuisine: 'Азиатская' },
        { id: 19, name: 'Том Ям', description: 'Острый тайский суп с креветками и лемонграссом', cuisine: 'Азиатская' },
        { id: 20, name: 'Димсамы', description: 'Китайские паровые пельмени с различными начинками', cuisine: 'Азиатская' }
    ],
    'Узбекская': [
        { id: 21, name: 'Плов', description: 'Рис с мясом, морковью и специями', cuisine: 'Узбекская' },
        { id: 22, name: 'Самса', description: 'Слоеные пирожки с мясом или овощами', cuisine: 'Узбекская' },
        { id: 23, name: 'Шурпа', description: 'Наваристый мясной суп с крупными кусками овощей', cuisine: 'Узбекская' },
        { id: 24, name: 'Нарын', description: 'Конское мясо с домашней лапшой и бульоном', cuisine: 'Узбекская' },
        { id: 25, name: 'Мастава', description: 'Густой рисовый суп с мясом и овощами', cuisine: 'Узбекская' }
    ],
    'Американская': [
        { id: 26, name: 'Бургер классический', description: 'Сочная котлета, овощи и соус в булочке', cuisine: 'Американская' },
        { id: 27, name: 'Хот-дог', description: 'Сосиска в булочке с горчицей и кетчупом', cuisine: 'Американская' },
        { id: 28, name: 'Крылышки Баффало', description: 'Острые куриные крылышки в пряном соусе', cuisine: 'Американская' },
        { id: 29, name: 'Стейк Нью-Йорк', description: 'Классический американский стейк из говядины', cuisine: 'Американская' },
        { id: 30, name: 'Панкейки', description: 'Американские блинчики с кленовым сиропом', cuisine: 'Американская' }
    ]
};

// ========== INITIALIZATION ==========
window.onload = function() {
    checkAuth();
    renderCuisines();
    renderRestaurants();
    renderCuisinesCheckboxes();
    changeLanguage(); // Apply saved language
    document.getElementById('languageSelector').value = currentLanguage;
};

// ========== TRANSLATION ==========
function changeLanguage() {
    currentLanguage = document.getElementById('languageSelector').value;
    localStorage.setItem('restor1_language', currentLanguage);
    
    // Update all elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                element.placeholder = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });
    
    // Refresh stats if in dashboard
    if (currentUser && currentUser.type === 'business') {
        updateDashboardInfo();
    }
}

// ========== AUTH TAB SWITCHING ==========
function switchTab(type) {
    const tabs = document.querySelectorAll('.auth-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    if (type === 'business') {
        document.getElementById('businessRegisterForm').classList.remove('hidden');
        document.getElementById('userRegisterForm').classList.add('hidden');
    } else {
        document.getElementById('businessRegisterForm').classList.add('hidden');
        document.getElementById('userRegisterForm').classList.remove('hidden');
    }
}

// ========== CUISINES CHECKBOXES ==========
function renderCuisinesCheckboxes() {
    const containers = [
        document.getElementById('cuisinesCheckboxes'),
        document.getElementById('editCuisinesCheckboxes')
    ];
    
    containers.forEach(container => {
        if (!container) return;
        container.innerHTML = '';
        Object.keys(ERB_DATABASE).forEach(cuisine => {
            const item = document.createElement('div');
            item.className = 'checkbox-item';
            item.innerHTML = `
                <input type="checkbox" name="cuisines" value="${cuisine}" id="${container.id}_${cuisine}">
                <label for="${container.id}_${cuisine}">${cuisine}</label>
            `;
            container.appendChild(item);
        });
    });
}

// ========== AUTHENTICATION ==========
function checkAuth() {
    const savedUser = localStorage.getItem('restor1_currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        if (currentUser.type === 'business') {
            showBusinessState();
        } else {
            showUserState();
        }
    }
}

function showBusinessState() {
    document.getElementById('authButtons').classList.add('hidden');
    document.getElementById('businessButtons').classList.remove('hidden');
    document.getElementById('userButtons').classList.add('hidden');
    document.getElementById('publicNav').classList.add('hidden');
    document.getElementById('cabinetNav').classList.remove('hidden');
    document.getElementById('userNav').classList.add('hidden');
}

function showUserState() {
    document.getElementById('authButtons').classList.add('hidden');
    document.getElementById('businessButtons').classList.add('hidden');
    document.getElementById('userButtons').classList.remove('hidden');
    document.getElementById('publicNav').classList.add('hidden');
    document.getElementById('cabinetNav').classList.add('hidden');
    document.getElementById('userNav').classList.remove('hidden');
    document.getElementById('userName').textContent = currentUser.name;
}

function showLoggedOutState() {
    document.getElementById('authButtons').classList.remove('hidden');
    document.getElementById('businessButtons').classList.add('hidden');
    document.getElementById('userButtons').classList.add('hidden');
    document.getElementById('publicNav').classList.remove('hidden');
    document.getElementById('cabinetNav').classList.add('hidden');
    document.getElementById('userNav').classList.add('hidden');
}

function handleBusinessRegister(event) {
    event.preventDefault();
    
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    if (password !== confirmPassword) {
        showAlert('Пароли не совпадают!', 'error');
        return;
    }
    
    const email = document.getElementById('regEmail').value;
    
    if (businessUsers.find(u => u.email === email) || regularUsers.find(u => u.email === email)) {
        showAlert('Пользователь с таким email уже существует!', 'error');
        return;
    }
    
    // Get selected cuisines
    const selectedCuisines = Array.from(document.querySelectorAll('input[name="cuisines"]:checked'))
        .map(cb => cb.value);
    
    if (selectedCuisines.length === 0) {
        showAlert('Выберите хотя бы одну кухню!', 'error');
        return;
    }
    
    const newUser = {
        type: 'business',
        ownerName: document.getElementById('regOwnerName').value,
        email: email,
        bin: document.getElementById('regBin').value,
        restaurantName: document.getElementById('regRestaurantName').value,
        restaurantType: document.getElementById('regRestaurantType').value,
        cuisines: selectedCuisines,
        address: document.getElementById('regAddress').value,
        phone: document.getElementById('regPhone').value,
        password: password,
        menu: []
    };
    
    businessUsers.push(newUser);
    localStorage.setItem('restor1_business_users', JSON.stringify(businessUsers));
    
    showAlert('✅ Регистрация успешна! Теперь вы можете войти в систему.', 'success');
    document.getElementById('businessRegisterForm').reset();
    setTimeout(() => showSection('login'), 2000);
    renderRestaurants();
}

function handleUserRegister(event) {
    event.preventDefault();
    
    const password = document.getElementById('userRegPassword').value;
    const confirmPassword = document.getElementById('userRegConfirmPassword').value;
    
    if (password !== confirmPassword) {
        showAlert('Пароли не совпадают!', 'error');
        return;
    }
    
    const email = document.getElementById('userRegEmail').value;
    
    if (businessUsers.find(u => u.email === email) || regularUsers.find(u => u.email === email)) {
        showAlert('Пользователь с таким email уже существует!', 'error');
        return;
    }
    
    const newUser = {
        type: 'user',
        name: document.getElementById('userRegName').value,
        email: email,
        password: password
    };
    
    regularUsers.push(newUser);
    localStorage.setItem('restor1_regular_users', JSON.stringify(regularUsers));
    
    showAlert('✅ Регистрация успешна! Теперь вы можете войти в систему.', 'success');
    document.getElementById('userRegisterForm').reset();
    setTimeout(() => showSection('login'), 2000);
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    let user = businessUsers.find(u => u.email === email && u.password === password);
    if (user) {
        user.type = 'business';
    } else {
        user = regularUsers.find(u => u.email === email && u.password === password);
        if (user) {
            user.type = 'user';
        }
    }
    
    if (user) {
        currentUser = user;
        localStorage.setItem('restor1_currentUser', JSON.stringify(currentUser));
        
        if (user.type === 'business') {
            showBusinessState();
            showSection('dashboard');
            updateDashboardInfo();
        } else {
            showUserState();
            showSection('home');
        }
        
        document.getElementById('loginForm').reset();
        showAlert('✅ Вход выполнен успешно!', 'success');
    } else {
        showAlert('❌ Неверный email или пароль!', 'error');
    }
}

function logout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        currentUser = null;
        localStorage.removeItem('restor1_currentUser');
        showLoggedOutState();
        showSection('home');
        showAlert('Вы успешно вышли из системы', 'success');
    }
}

// ========== EDIT RESTAURANT ==========
function handleEditRestaurant(event) {
    event.preventDefault();
    
    const selectedCuisines = Array.from(document.querySelectorAll('#editCuisinesCheckboxes input:checked'))
        .map(cb => cb.value);
    
    if (selectedCuisines.length === 0) {
        showAlert('Выберите хотя бы одну кухню!', 'error');
        return;
    }
    
    currentUser.restaurantName = document.getElementById('editRestaurantName').value;
    currentUser.restaurantType = document.getElementById('editRestaurantType').value;
    currentUser.cuisines = selectedCuisines;
    currentUser.address = document.getElementById('editAddress').value;
    currentUser.phone = document.getElementById('editPhone').value;
    
    // Update in storage
    const userIndex = businessUsers.findIndex(u => u.email === currentUser.email);
    businessUsers[userIndex] = currentUser;
    localStorage.setItem('restor1_business_users', JSON.stringify(businessUsers));
    localStorage.setItem('restor1_currentUser', JSON.stringify(currentUser));
    
    updateDashboardInfo();
    renderRestaurants();
    showAlert('✅ Информация обновлена успешно!', 'success');
}

// ========== NAVIGATION ==========
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    
    if (sectionId === 'dashboard') {
        if (!currentUser || currentUser.type !== 'business') {
            showSection('login');
            showAlert('Пожалуйста, войдите как владелец заведения', 'error');
            return;
        }
        updateDashboardInfo();
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showCabinetSection(sectionId) {
    document.querySelectorAll('.cabinet-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.cabinet-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
    
    if (sectionId === 'reviews') {
        renderRestaurantReviews();
    }
}

// ========== ERB DISPLAY ==========
function renderCuisines() {
    const cuisineGrid = document.getElementById('cuisineGrid');
    cuisineGrid.innerHTML = '';
    
    Object.keys(ERB_DATABASE).forEach(cuisine => {
        const card = document.createElement('div');
        card.className = 'cuisine-card';
        card.textContent = cuisine;
        card.onclick = () => showDishes(cuisine);
        cuisineGrid.appendChild(card);
    });
}

function showDishes(cuisine) {
    const dishesSection = document.getElementById('dishesSection');
    const dishesGrid = document.getElementById('dishesGrid');
    const cuisineTitle = document.getElementById('selectedCuisineTitle');
    
    cuisineTitle.textContent = cuisine;
    dishesSection.style.display = 'block';
    dishesGrid.innerHTML = '';
    
    const dishes = ERB_DATABASE[cuisine];
    dishes.forEach(dish => {
        const prices = getDishPrices(dish.id);
        
        const card = document.createElement('div');
        card.className = 'dish-card';
        card.innerHTML = `
            <h3>${dish.name}</h3>
            <p>${dish.description}</p>
            ${prices.length > 0 ? `
                <div class="dish-prices">
                    <strong style="color: var(--text-dark); display: block; margin-bottom: 0.5rem;">Цены в заведениях:</strong>
                    ${prices.map(p => `
                        <div class="price-item" onclick="showRestaurantDetail('${p.email}')">
                            <span class="restaurant-name">${p.restaurant}</span>
                            <span class="price">${p.price} ₸</span>
                        </div>
                    `).join('')}
                </div>
            ` : '<p style="color: var(--text-gray); margin-top: 1rem; font-style: italic;">Блюдо пока не добавлено в меню заведений</p>'}
        `;
        dishesGrid.appendChild(card);
    });
    
    dishesSection.scrollIntoView({ behavior: 'smooth' });
}

function getDishPrices(dishId) {
    const prices = [];
    businessUsers.forEach(user => {
        if (user.menu) {
            const menuItem = user.menu.find(item => item.dishId === dishId);
            if (menuItem) {
                prices.push({
                    restaurant: user.restaurantName,
                    price: menuItem.price,
                    email: user.email
                });
            }
        }
    });
    return prices;
}

// ========== RESTAURANTS ==========
function renderRestaurants() {
    const restaurantsList = document.getElementById('restaurantsList');
    restaurantsList.innerHTML = '';
    
    if (businessUsers.length === 0) {
        restaurantsList.innerHTML = `
            <div class="info-card text-center">
                <h2>Пока нет зарегистрированных заведений</h2>
                <p style="font-size: 1.1rem; color: var(--text-gray); margin-top: 1rem;">
                    Станьте первым! Зарегистрируйте свое заведение и начните привлекать клиентов.
                </p>
                <button class="btn btn-primary mt-2" onclick="showSection('register')" style="padding: 1rem 2rem; font-size: 1.1rem;">
                    Зарегистрировать заведение
                </button>
            </div>
        `;
        return;
    }
    
    const grid = document.createElement('div');
    grid.className = 'dishes-grid';
    
    businessUsers.forEach(user => {
        const avgRating = getAverageRating(user.email);
        const reviewsCount = getReviewsCount(user.email);
        
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        card.onclick = () => showRestaurantDetail(user.email);
        card.innerHTML = `
            <div class="restaurant-header">
                <div>
                    <h3>🏪 ${user.restaurantName}</h3>
                    <div class="restaurant-rating">
                        <span class="stars">${getStarsDisplay(avgRating)}</span>
                        <span style="color: var(--text-gray);">${avgRating.toFixed(1)} (${reviewsCount})</span>
                    </div>
                </div>
                <div class="restaurant-type">${getRestaurantTypeText(user.restaurantType)}</div>
            </div>
            <p class="restaurant-info">📍 ${user.address}</p>
            <p class="restaurant-info">📞 ${user.phone || 'Не указан'}</p>
            <div class="restaurant-cuisines">
                ${user.cuisines ? user.cuisines.map(c => `<span class="cuisine-badge">${c}</span>`).join('') : ''}
            </div>
            <p style="margin-top: 1rem; color: var(--text-gray);">
                <strong>${translations[currentLanguage].dishes_count}${user.menu ? user.menu.length : 0}</strong>
            </p>
        `;
        grid.appendChild(card);
    });
    
    restaurantsList.appendChild(grid);
}

function showRestaurantDetail(email) {
    const user = businessUsers.find(u => u.email === email);
    if (!user) return;
    
    const avgRating = getAverageRating(email);
    const reviewsCount = getReviewsCount(email);
    const restaurantReviews = reviews.filter(r => r.restaurantEmail === email);
    
    const detailContent = document.getElementById('restaurantDetailContent');
    detailContent.innerHTML = `
        <div class="restaurant-card" style="cursor: default;">
            <div class="restaurant-header">
                <div>
                    <h3 style="font-size: 2rem;">🏪 ${user.restaurantName}</h3>
                    <div class="restaurant-rating" style="margin-top: 1rem;">
                        <span class="stars" style="font-size: 1.5rem;">${getStarsDisplay(avgRating)}</span>
                        <span style="color: var(--text-gray); font-size: 1.2rem;">${avgRating.toFixed(1)} (${reviewsCount})</span>
                    </div>
                </div>
                <div class="restaurant-type" style="font-size: 1rem;">${getRestaurantTypeText(user.restaurantType)}</div>
            </div>
            <div style="margin: 2rem 0;">
                <p class="restaurant-info" style="font-size: 1.1rem; margin-bottom: 0.8rem;">📍 ${user.address}</p>
                <p class="restaurant-info" style="font-size: 1.1rem; margin-bottom: 0.8rem;">📞 ${user.phone || 'Не указан'}</p>
                <div class="restaurant-cuisines">
                    ${user.cuisines ? user.cuisines.map(c => `<span class="cuisine-badge">${c}</span>`).join('') : ''}
            </div>
            
            ${currentUser && currentUser.type === 'user' ? `
                <button class="btn btn-primary" onclick="showReviewModal('${email}')" style="padding: 1rem 2rem; font-size: 1.1rem;">
                    ✍️ <span data-lang="leave_review">Оставить отзыв</span>
                </button>
            ` : ''}
            
            <h3 style="margin: 2rem 0 1rem; font-size: 1.8rem;">${translations[currentLanguage].view_menu || 'Меню'}</h3>
            ${user.menu && user.menu.length > 0 ? `
                <div class="dishes-grid">
                    ${user.menu.map(item => `
                        <div class="dish-card">
                            <h4>${item.name}</h4>
                            <p>${item.description}</p>
                            <p style="color: var(--green-primary); font-weight: 600; margin-top: 0.5rem;">
                                📍 Кухня: ${item.cuisine}
                            </p>
                            <div class="price-display" style="margin-top: 1rem;">${item.price} ₸</div>
                        </div>
                    `).join('')}
                </div>
            ` : `<p style="color: var(--text-gray);">Меню пока не добавлено</p>`}
            
            <div class="reviews-section">
                <h3 style="font-size: 1.8rem; margin-bottom: 1.5rem;">${translations[currentLanguage].reviews || 'Отзывы'}</h3>
                ${restaurantReviews.length > 0 ? restaurantReviews.map(review => {
                    const reviewer = regularUsers.find(u => u.email === review.userEmail);
                    return `
                        <div class="review-card">
                            <div class="review-header">
                                <div>
                                    <div class="review-author">${reviewer ? reviewer.name : 'Аноним'}</div>
                                    <div class="stars">${getStarsDisplay(review.rating)}</div>
                                </div>
                                <div class="review-date">${new Date(review.date).toLocaleDateString()}</div>
                            </div>
                            <div class="review-text">${review.text}</div>
                        </div>
                    `;
                }).join('') : `<p style="color: var(--text-gray);">${translations[currentLanguage].no_reviews || 'Пока нет отзывов'}</p>`}
            </div>
        </div>
    `;
    
    showSection('restaurant-detail');
    changeLanguage(); // Update translations
}

function getRestaurantTypeText(type) {
    const types = {
        'restaurant': translations[currentLanguage].type_restaurant || 'Ресторан',
        'cafe': translations[currentLanguage].type_cafe || 'Кафе',
        'coffee': translations[currentLanguage].type_coffee || 'Кофейня',
        'bar': translations[currentLanguage].type_bar || 'Бар',
        'fastfood': translations[currentLanguage].type_fastfood || 'Фастфуд'
    };
    return types[type] || type;
}

// ========== REVIEWS ==========
function showReviewModal(restaurantEmail) {
    if (!currentUser || currentUser.type !== 'user') {
        showAlert('Для оставления отзывов необходимо войти как пользователь', 'error');
        showSection('login');
        return;
    }
    
    currentRestaurantForReview = restaurantEmail;
    document.getElementById('reviewModal').classList.remove('hidden');
    document.getElementById('reviewForm').reset();
    document.getElementById('reviewRating').value = '';
    
    // Reset stars
    document.querySelectorAll('.star-rating').forEach(star => {
        star.textContent = '☆';
        star.style.color = '#fbbf24';
    });
}

function hideReviewModal() {
    document.getElementById('reviewModal').classList.add('hidden');
    currentRestaurantForReview = null;
}

function setRating(rating) {
    document.getElementById('reviewRating').value = rating;
    document.querySelectorAll('.star-rating').forEach((star, index) => {
        if (index < rating) {
            star.textContent = '★';
            star.style.color = '#fbbf24';
        } else {
            star.textContent = '☆';
            star.style.color = '#fbbf24';
        }
    });
}

function handleReview(event) {
    event.preventDefault();
    
    const rating = parseInt(document.getElementById('reviewRating').value);
    const text = document.getElementById('reviewText').value;
    
    if (!rating) {
        showAlert('Пожалуйста, поставьте оценку', 'error');
        return;
    }
    
    const newReview = {
        restaurantEmail: currentRestaurantForReview,
        userEmail: currentUser.email,
        rating: rating,
        text: text,
        date: new Date().toISOString()
    };
    
    reviews.push(newReview);
    localStorage.setItem('restor1_reviews', JSON.stringify(reviews));
    
    hideReviewModal();
    showAlert('✅ Отзыв опубликован!', 'success');
    
    // Refresh restaurant detail
    showRestaurantDetail(currentRestaurantForReview);
}

function getAverageRating(restaurantEmail) {
    const restaurantReviews = reviews.filter(r => r.restaurantEmail === restaurantEmail);
    if (restaurantReviews.length === 0) return 0;
    const sum = restaurantReviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / restaurantReviews.length;
}

function getReviewsCount(restaurantEmail) {
    return reviews.filter(r => r.restaurantEmail === restaurantEmail).length;
}

function getStarsDisplay(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
}

function renderRestaurantReviews() {
    const container = document.getElementById('restaurantReviews');
    const restaurantReviews = reviews.filter(r => r.restaurantEmail === currentUser.email);
    
    if (restaurantReviews.length === 0) {
        container.innerHTML = '<p style="color: var(--text-gray);">Пока нет отзывов о вашем заведении</p>';
        return;
    }
    
    container.innerHTML = restaurantReviews.map(review => {
        const reviewer = regularUsers.find(u => u.email === review.userEmail);
        return `
            <div class="review-card">
                <div class="review-header">
                    <div>
                        <div class="review-author">${reviewer ? reviewer.name : 'Аноним'}</div>
                        <div class="stars">${getStarsDisplay(review.rating)}</div>
                    </div>
                    <div class="review-date">${new Date(review.date).toLocaleDateString()}</div>
                </div>
                <div class="review-text">${review.text}</div>
            </div>
        `;
    }).join('');
}

// ========== DASHBOARD ==========
function updateDashboardInfo() {
    if (!currentUser || currentUser.type !== 'business') return;
    
    // Update stats
    const dishesCount = currentUser.menu ? currentUser.menu.length : 0;
    const reviewsCount = getReviewsCount(currentUser.email);
    const avgRating = getAverageRating(currentUser.email);
    
    document.getElementById('statsInfo').textContent = `${translations[currentLanguage].dishes_in_menu}${dishesCount}`;
    document.getElementById('reviewsInfo').textContent = `${translations[currentLanguage].total_reviews}${reviewsCount} | ⭐ ${avgRating.toFixed(1)}`;
    
    // Update restaurant info
    const restaurantInfoCard = document.getElementById('restaurantInfoCard');
    restaurantInfoCard.innerHTML = `
        <h2>🏪 ${currentUser.restaurantName}</h2>
        <div class="info-row">
            <span class="info-label">Владелец:</span>
            <span class="info-value">${currentUser.ownerName}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Тип заведения:</span>
            <span class="info-value">${getRestaurantTypeText(currentUser.restaurantType)}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Кухни:</span>
            <span class="info-value">${currentUser.cuisines ? currentUser.cuisines.join(', ') : 'Не указаны'}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Адрес:</span>
            <span class="info-value">${currentUser.address}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Телефон:</span>
            <span class="info-value">${currentUser.phone}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Email:</span>
            <span class="info-value">${currentUser.email}</span>
        </div>
        <div class="info-row">
            <span class="info-label">БИН:</span>
            <span class="info-value">${currentUser.bin}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Рейтинг:</span>
            <span class="info-value">${getStarsDisplay(avgRating)} ${avgRating.toFixed(1)} (${reviewsCount})</span>
        </div>
    `;
    
    // Update edit form
    document.getElementById('editRestaurantName').value = currentUser.restaurantName;
    document.getElementById('editRestaurantType').value = currentUser.restaurantType;
    document.getElementById('editAddress').value = currentUser.address;
    document.getElementById('editPhone').value = currentUser.phone;
    
    // Update cuisines checkboxes
    if (currentUser.cuisines) {
        currentUser.cuisines.forEach(cuisine => {
            const checkbox = document.getElementById(`editCuisinesCheckboxes_${cuisine}`);
            if (checkbox) checkbox.checked = true;
        });
    }
    
    // Update menu
    renderMyMenu();
}

// ========== MENU MANAGEMENT ==========
function showErbModal() {
    const modal = document.getElementById('erbModal');
    const container = document.getElementById('erbDishesForSelection');
    container.innerHTML = '';
    
    Object.keys(ERB_DATABASE).forEach(cuisine => {
        const section = document.createElement('div');
        section.className = 'erb-cuisine-section';
        section.innerHTML = `<h3 class="erb-cuisine-title">${cuisine}</h3>`;
        
        ERB_DATABASE[cuisine].forEach(dish => {
            const inMenu = currentUser.menu && currentUser.menu.find(item => item.dishId === dish.id);
            
            const dishItem = document.createElement('div');
            dishItem.className = 'erb-dish-item';
            if (inMenu) dishItem.classList.add('selected');
            
            dishItem.innerHTML = `
                <input type="checkbox" 
                       class="erb-dish-checkbox" 
                       id="dish_${dish.id}" 
                       ${inMenu ? 'checked disabled' : ''}
                       onchange="toggleDishSelection(this, ${dish.id})">
                <div class="erb-dish-info">
                    <h4>${dish.name}</h4>
                    <p>${dish.description}</p>
                </div>
                <input type="number" 
                       class="erb-price-input" 
                       id="price_${dish.id}" 
                       placeholder="Цена (₸)" 
                       min="0"
                       ${inMenu ? 'disabled' : ''}
                       ${inMenu ? `value="${inMenu.price}"` : ''}>
                ${inMenu ? '<span class="dish-status">✓ В меню</span>' : ''}
            `;
            section.appendChild(dishItem);
        });
        
        container.appendChild(section);
    });
    
    modal.classList.remove('hidden');
}

function hideErbModal() {
    document.getElementById('erbModal').classList.add('hidden');
}

function toggleDishSelection(checkbox, dishId) {
    const item = checkbox.closest('.erb-dish-item');
    if (checkbox.checked) {
        item.classList.add('selected');
    } else {
        item.classList.remove('selected');
    }
}

function addSelectedDishes() {
    const selectedDishes = [];
    
    Object.keys(ERB_DATABASE).forEach(cuisine => {
        ERB_DATABASE[cuisine].forEach(dish => {
            const checkbox = document.getElementById(`dish_${dish.id}`);
            const priceInput = document.getElementById(`price_${dish.id}`);
            
            if (checkbox && checkbox.checked && !checkbox.disabled) {
                const price = parseInt(priceInput.value);
                if (price && price > 0) {
                    selectedDishes.push({
                        dishId: dish.id,
                        name: dish.name,
                        description: dish.description,
                        cuisine: dish.cuisine,
                        price: price
                    });
                }
            }
        });
    });
    
    if (selectedDishes.length === 0) {
        showAlert('Выберите блюда и укажите цены!', 'error');
        return;
    }
    
    if (!currentUser.menu) {
        currentUser.menu = [];
    }
    currentUser.menu.push(...selectedDishes);
    
    // Update storage
    const userIndex = businessUsers.findIndex(u => u.email === currentUser.email);
    businessUsers[userIndex] = currentUser;
    localStorage.setItem('restor1_business_users', JSON.stringify(businessUsers));
    localStorage.setItem('restor1_currentUser', JSON.stringify(currentUser));
    
    hideErbModal();
    renderMyMenu();
    updateDashboardInfo();
    renderRestaurants();
    showAlert(`✅ Добавлено блюд: ${selectedDishes.length}`, 'success');
}

function renderMyMenu() {
    const menuList = document.getElementById('myMenuList');
    menuList.innerHTML = '';
    
    if (!currentUser.menu || currentUser.menu.length === 0) {
        menuList.innerHTML = `
            <div class="info-card text-center">
                <h3>Ваше меню пусто</h3>
                <p style="color: var(--text-gray); margin-top: 1rem;">
                    Добавьте блюда из Единого Реестра Блюд, чтобы начать привлекать клиентов
                </p>
            </div>
        `;
        return;
    }
    
    currentUser.menu.forEach((item, index) => {
        const menuItem = document.createElement('div');
        menuItem.className = 'my-menu-item';
        menuItem.innerHTML = `
            <div class="my-menu-item-info">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <p style="color: var(--green-primary); font-weight: 600;">📍 Кухня: ${item.cuisine}</p>
            </div>
            <div class="my-menu-item-actions">
                <div class="price-display">${item.price} ₸</div>
                <button class="btn btn-danger" onclick="deleteDishFromMenu(${index})">Удалить</button>
            </div>
        `;
        menuList.appendChild(menuItem);
    });
}

function deleteDishFromMenu(index) {
    if (confirm('Вы уверены, что хотите удалить это блюдо из меню?')) {
        currentUser.menu.splice(index, 1);
        
        const userIndex = businessUsers.findIndex(u => u.email === currentUser.email);
        businessUsers[userIndex] = currentUser;
        localStorage.setItem('restor1_business_users', JSON.stringify(businessUsers));
        localStorage.setItem('restor1_currentUser', JSON.stringify(currentUser));
        
        renderMyMenu();
        updateDashboardInfo();
        renderRestaurants();
        showAlert('Блюдо удалено из меню', 'success');
    }
}

// ========== UTILITIES ==========
function handleFileSelect(input, nameId) {
    const file = input.files[0];
    if (file) {
        document.getElementById(nameId).textContent = `✓ ${file.name}`;
        input.closest('.file-upload').classList.add('has-file');
    }
}

function showAlert(message, type) {
    document.querySelectorAll('.alert').forEach(alert => alert.remove());
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <span class="alert-icon">${type === 'success' ? '✅' : '❌'}</span>
        <span>${message}</span>
    `;
    
    const activeSection = document.querySelector('.section.active');
    if (activeSection) {
        activeSection.insertBefore(alert, activeSection.firstChild);
    }
    
    setTimeout(() => alert.remove(), 5000);
}
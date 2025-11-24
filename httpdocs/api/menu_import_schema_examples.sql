-- Пример добавления PRIMARY KEY и AUTO_INCREMENT
ALTER TABLE restaurants
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT,
  ADD PRIMARY KEY (id);

ALTER TABLE dishes
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT,
  ADD PRIMARY KEY (id);

ALTER TABLE restaurant_dishes
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT,
  ADD PRIMARY KEY (id);

-- Рекомендуемый UNIQUE-индекс, чтобы не дублировать связи ресторан-блюдо
ALTER TABLE restaurant_dishes
  ADD UNIQUE KEY uniq_restaurant_dish (restaurant_id, dish_id);
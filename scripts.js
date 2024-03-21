// JavaScript для взаємодії з користувачем та відправки запитів на сервер
let menu = {
    "Салат": 10,
    "Суп": 15,
    "Піца": 20,
    "Паста": 18,
    "Сок": 5,
    "Чай": 3
};

let order = [];
let total = 0;
let orderHistory = [];

function displayMenu() {
    const menuDiv = document.getElementById('menu');
    menuDiv.innerHTML = ''; // Очищення попереднього вмісту
    for (const item in menu) {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = ${item} - ${menu[item]} грн;
        menuItem.onclick = function() {
            addToOrder(item);
        };
        const deleteBtn = document.createElement('span');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerText = 'X';
        deleteBtn.onclick = function(event) {
            event.stopPropagation(); // Зупинити вспливання події, щоб не викликати addToOrder()
            deleteMenuItem(item);
        };
        menuItem.appendChild(deleteBtn);
        menuDiv.appendChild(menuItem);
    }
}

function addNewMenuItem() {
    const newName = document.getElementById('newItemName').value;
    const newPrice = parseFloat(document.getElementById('newItemPrice').value);
    if (newName && newPrice && !isNaN(newPrice)) {
        menu[newName] = newPrice;
        document.getElementById('newItemName').value = '';
        document.getElementById('newItemPrice').value = '';
        displayMenu(); // Відображення оновленого меню після додавання нової страви
    } else {
        alert('Будь ласка, введіть правильну назву та ціну страви.');
    }
}

function deleteMenuItem(name) {
    delete menu[name];
    displayMenu(); // Оновлення меню після видалення страви
    // При видаленні страви, також видаляємо її з поточного замовлення, якщо вона там є
    order = order.filter(item => item !== name);
    total = order.reduce((acc, curr) => acc + menu[curr], 0);
    updateOrderDisplay();
}

function addToOrder(item) {
    order.push(item);
    total += menu[item];
    updateOrderDisplay();
}

function removeFromOrder(index) {
    const removedItem = order.splice(index, 1)[0];
    total -= menu[removedItem];
    updateOrderDisplay();
}

function updateOrderDisplay() {
    const orderList = document.getElementById('order');
    orderList.innerHTML = '';
    order.forEach((item, index) => {
        orderList.innerHTML += <li>${item} <span class="delete-btn" onclick="removeFromOrder(${index})">X</span></li>;
    });
    document.getElementById('total').innerText = total;
}

function submitOrder() {
    const orderNumber = document.getElementById('orderNumber').value;
    if (!orderNumber || isNaN(orderNumber)) {
        alert('Будь ласка, введіть коректний номер замовлення.');
        return;
    }

    const currentOrder = {
        number: orderNumber,
        items: order.slice(),
        totalPrice: total
    };
    orderHistory.push(currentOrder);
    displayOrderHistory();
    console.log('Замовлення:', currentOrder);
    alert('Ваше замовлення успішно відправлено!');
    order = [];
    total = 0;
    updateOrderDisplay(); // Очистка відображення замовлення
}

function displayOrderHistory() {
    const orderHistoryList = document.getElementById('orderHistory');
    orderHistoryList.innerHTML = '';
    orderHistory.forEach(order => {
        orderHistoryList.innerHTML += <li>Замовлення №${order.number}: ${order.items.join(', ')}, Загальна сума: ${order.totalPrice} грн</li>;
    });
}

function clearOrderHistory() {
    orderHistory = [];
    displayOrderHistory();
}

// Викликаємо функцію для відображення меню при завантаженні сторінки
displayMenu();

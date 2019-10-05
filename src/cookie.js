/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    showCookieList();
});

addButton.addEventListener('click', () => {
    var cookieName = addNameInput.value,
        cookieValue = addValueInput.value;

    if (cookieName && cookieValue) {
        setCookie(cookieName, cookieValue);
        showCookieList();
    }
});

function setCookie(name, value, expires) {
    var updatedCookie = name + '=' + value;

    if (typeof expires === 'number' && expires) {
        var d = new Date();

        d.setTime(d.getTime() + expires * 1000);
        updatedCookie += ';expires=' + d.toUTCString();
    }

    document.cookie = updatedCookie;

    return updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, '', -1);
}

function getAllCookies() {
    if (!document.cookie) {
        return {};
    }

    return document.cookie.split('; ').reduce(function (prev, current) {
        var [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});
}

function isCookieMatchFilter(name, value) {
    var filterVal = filterNameInput.value;

    return name.indexOf(filterVal) >= 0 || value.indexOf(filterVal) >= 0;
}

function showCookieList() {
    var cookieList = getAllCookies();

    listTable.textContent = '';
    for (var cookieName in cookieList) {
        if (!isCookieMatchFilter(cookieName, cookieList[cookieName])) {
            continue;
        }
        var tr = document.createElement('tr'),
            nameTd = document.createElement('td'),
            valueTd = document.createElement('td'),
            actionTd = document.createElement('td'),
            delButton = document.createElement('button');

        listTable.appendChild(tr);
        tr.appendChild(nameTd);
        tr.appendChild(valueTd);
        tr.appendChild(actionTd);
        actionTd.appendChild(delButton);

        nameTd.textContent = cookieName;
        valueTd.textContent = cookieList[cookieName];
        delButton.textContent = 'Удалить';
        delButton.dataset.cookieName = cookieName;

        delButton.addEventListener('click', function(e) {
            deleteCookie(e.target.dataset.cookieName);
            showCookieList();
        });
    }
}

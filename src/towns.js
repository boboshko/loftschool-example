/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return new Promise( (resolve) => {
        const req = new XMLHttpRequest;

        req.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        req.send();
        req.addEventListener('load', () => {
            let arr = JSON.parse(req.response);

            arr.sort( (a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }

                return 0;
            });

            resolve(arr);
        })
    })
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    if (full.toLowerCase().indexOf(chunk.toLowerCase()) === -1) {
        return false;
    }

    return true;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise;

loadTowns().then((listTowns) => {
    townsPromise = listTowns;
});

filterInput.addEventListener('keyup', () => {
    filterResult.innerHTML='';
    if (townsPromise) {

        for (let town of townsPromise) {
            if (isMatching(town.name, filterInput.value)&& filterInput.value!=='') {
                let div = document.createElement('div');

                div.innerText= town.name;
                filterResult.appendChild(div);
            }
        }
    }
});

// loadingBlock.addEventListener('keyup', () => {
//     loadingBlock.innerHTML='';
//     if (townsPromise) {
//
//         for (let town of townsPromise) {
//             if (isMatching(town.name, loadingBlock.value)&& loadingBlock.value!=='') {
//                 let div = document.createElement('div');
//
//                 div.innerText= town.name;
//                 loadingBlock.appendChild(div);
//             }
//         }
//     }
// });
//
// filterBlock.addEventListener('keyup', () => {
//     filterBlock.innerHTML='';
//     if (townsPromise) {
//
//         for (let town of filterBlock) {
//             if (isMatching(town.name, filterBlock.value)&& filterBlock.value!=='') {
//                 let div = document.createElement('div');
//
//                 div.innerText= town.name;
//                 filterBlock.appendChild(div);
//             }
//         }
//     }
// });

export {
    loadTowns,
    isMatching
};

'use strict';

(function () {
    var cards = [{ from: 'Oryol', to: 'Tula', vehicle: 'train', flight_number: '123', place_number: '17', baggage_number: '', field: 'example' }, { from: 'Voronezh', to: 'Kursk', vehicle: 'bus', flight_number: '41', place_number: '', baggage_number: '001' }, { from: 'Rostov-na-Donu', to: 'Voronezh', vehicle: 'plan', flight_number: '10', place_number: '30B', baggage_number: '45', field: 'example' }, { from: 'Kursk', to: 'Oryol', vehicle: 'bus', flight_number: '102', place_number: '', baggage_number: '' }, { from: 'Krasnodar', to: 'Rostov-na-Donu', vehicle: 'train', flight_number: '45A', place_number: '26', baggage_number: '' }, { from: 'Tula', to: 'Moscow', vehicle: 'bus', flight_number: '36', place_number: '', baggage_number: '', Empty: '' }, { from: 'Simferopol', to: 'Krasnodar', vehicle: 'plan', flight_number: '98H', place_number: '54A', baggage_number: '254' }];

    var counter = 0;
    build(cards);

    /**
     * Событие выбора файла
     **/
    document.getElementById('file-input').addEventListener('change', function (e) {
        var file = e.target.files[0],
            reader = new FileReader();
        if (!file) return;
        reader.onload = function (e) {
            try {
                counter = 0;
                var content = e.target.result;
                cards = JSON.parse(content);
                build(cards);
            } catch (err) {
                console.error(err);
            }
        };
        reader.readAsText(file);
    }, false);

    /**
     * Вывод на экран план путешествия
     * @param {Array} cards отсортированный массив карточек
     */
    function build(cards) {
        var ol = document.getElementById('list');
        var li;
        try {
            while (ol.firstChild) {
                ol.removeChild(ol.firstChild);
            } // Очистка списка для повторного употребления
            sort(cards).forEach(function (card) {
                //Сортировка и последующий перебор массива для построения DOM модели
                li = document.createElement('li');
                li.appendChild(document.createTextNode(generatePhrase(card))); //Генерация словесного описания
                ol.appendChild(li);
            });
            console.log(counter);
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Функция сортировки карточек
     * @returns {Array} Возвращает отсортированный массив карточек
     **/
    function sort(arr) {
        if (!Array.isArray(arr)) {
            throw new Error('Not Array');
        }
        if (!arr.length) return [];
        var a = arr.slice();
        var res = [];
        res.push(arr[0]);

        do {
            for (var i = 0, j = a.length - 1; i < a.length; i++, j--) {
                counter++;
                if (res[0].from == a[i].to) {
                    res.unshift(a[i]);
                    a.splice(i, 1);
                } else if (res[res.length - 1].to == a[i].from) {
                    res.push(a[i]);
                    a.splice(i, 1);
                }
                if (a[j] && res[0].from == a[j].to) {
                    res.unshift(a[j]);
                    a.splice(j, 1);
                } else if (a[j] && res[res.length - 1].to == a[j].from) {
                    res.push(a[j]);
                    a.splice(j, 1);
                }
            }
        } while (a.length != 1);
        return res;
    }

    /**
     * Random
     **/
    function rand(min, max) {
        return Math.floor(Math.random() * max + min);
    };

    /**
     * Функция возвращает словесное описание маршрута
     * @param {Object} card карточка содержащая информацию о том, откуда и куда вы едете на данном отрезке маршрута, а также о типе транспорта и т.д.
     * @returns {String} Возвращает строку, описывающую маршрут
     **/
    function generatePhrase(card) {
        var phrase = '';
        var phrases = ['Take ' + card.vehicle + ' ' + card.flight_number + ' from ' + card.from + ' to ' + card.to + '. ', 'From ' + card.from + ', take ' + card.vehicle + ' ' + card.flight_number + ' to ' + card.to + '. ', 'Take ' + card.vehicle + ' ' + card.from + ' -- ' + card.to + '. Flight number ' + card.flight_number + '. '];

        phrase += phrases[rand(0, phrases.length)];
        phrases = ['Seat ' + card.place_number + '. ', 'Seat \u2116' + card.place_number + '. ', 'Take sit number ' + card.place_number + '. '];
        phrase += card.place_number ? phrases[rand(0, phrases.length)] : 'No seat assignment. ';
        phrase += card.baggage_number ? 'Baggage drop at ticket counter ' + card.baggage_number + '. ' : 'Baggage will be automatically transferred from your last leg. ';

        for (var attr in card) {
            //Если есть не стандартные поля выводим их в виде 'свойство: значение'
            if (attr.match(/from|to|vehicle|flight_number|place_number|baggage_number/i)) continue; //Пропускаем уже описанные свойства
            if (!card[attr].length) {
                phrase += 'No info about ' + attr + '. ';continue;
            }
            var str = attr.split(/[^\wа-яё0-9]+/ig).join(' ');
            str = str.charAt(0).toUpperCase() + str.substr(1);
            phrase += str + ': ' + card[attr] + '. ';
        }
        return phrase;
    }
})();
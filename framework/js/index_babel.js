'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Element = function () {
    /**
    * Создание html элемента
    * @param {HTMLElement, String} element Строка или HTMLElement
    * @returns {Object} Объект класса Element
    */
    function Element(element) {
      _classCallCheck(this, Element);

      if (typeof element == 'string') {
        this.element = document.createElement(element);
      } else if (element instanceof HTMLElement) {
        this.element = element;
      } else throw new new TypeError('Аргументы типа HTMLElement или String.')();
    }
    /**
    * Прикрепить элементы к родительскому
    * @param {HTMLElement,Object, String} childs Список элементов для добавление
    * @returns {Object} Объект класса Element
    */


    _createClass(Element, [{
      key: 'append',
      value: function append() {
        var _this = this;

        for (var _len = arguments.length, childs = Array(_len), _key = 0; _key < _len; _key++) {
          childs[_key] = arguments[_key];
        }

        childs.forEach(function (child) {
          console.log(typeof child === 'undefined' ? 'undefined' : _typeof(child));
          if (child instanceof HTMLElement) {
            _this.element.appendChild(child);
          } else if (child instanceof Element) {
            _this.element.appendChild(child.element);
          } else if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) == 'object') {
            _this.element.appendChild(document.createTextNode(JSON.stringify(child)));
          } else if (typeof child == 'string') {
            _this.element.appendChild(document.createTextNode(child));
          } else throw new TypeError(_this.appendTo.name + ' function. \u0422\u043E\u043B\u044C\u043A\u043E \u0430\u0440\u0433\u0443\u043C\u0435\u043D\u0442\u044B \u0442\u0438\u043F\u0430 HTMLElement.');
        });
        return this;
      }
      /**
      * Прикрепить объект класса  к родительскому
      * @param {HTMLElement,Object, String} parent родительский элемент
      * @returns {Object} Объект класса Element
      */

    }, {
      key: 'appendTo',
      value: function appendTo(parent) {
        if (!parent) throw new Error(this.appendTo.name + ' function. \u0420\u043E\u0434\u0438\u0442\u0435\u043B\u044C \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D.');
        if (parent instanceof HTMLElement) parent.appendChild(this.element);else if (parent instanceof Element) parent.element.appendChild(this.element);else if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) == 'object') parent.element.appendChild(this.element);else throw new TypeError(this.appendTo.name + ' function. \u0422\u043E\u043B\u044C\u043A\u043E \u0430\u0440\u0433\u0443\u043C\u0435\u043D\u0442\u044B \u0442\u0438\u043F\u0430 HTMLElement.');
        return this;
      }
      /**
      * Добавление  CSS класса/классов
      * @param {String} Строка с именем/именами класса
      * @returns {Object} Объект класса Element
      */

    }, {
      key: 'addClass',
      value: function addClass(cls) {
        var _this2 = this;

        if (!cls) return this;
        if (typeof cls != 'string') throw new TypeError(this.addClass.name + ' function. \u0422\u043E\u043B\u044C\u043A\u043E \u0430\u0440\u0433\u0443\u043C\u0435\u043D\u0442\u044B \u0442\u0438\u043F\u0430 string.');
        var classList = cls.split(/\W+/);
        if (!classList.length) throw new Error(this.addClass.name + ' function. \u0421\u043F\u0438\u0441\u043E\u043A \u043A\u043B\u0430\u0441\u0441\u043E\u0432 \u043F\u0443\u0441\u0442.');
        classList.forEach(function (clsName) {
          return _this2.element.classList.add(clsName);
        });
        return this;
      }
      /**
      * Проверка на наличие у объекта CSS класса
      * @param {String} Строка с именем класса
      * @returns {Boolean} Имеет класс или нет
      */

    }, {
      key: 'hasClass',
      value: function hasClass(cls) {
        if (!cls) return false;
        if (typeof cls != 'string') throw new TypeError(this.hasClass.name + ' function. \u0422\u043E\u043B\u044C\u043A\u043E \u0430\u0440\u0433\u0443\u043C\u0435\u043D\u0442\u044B \u0442\u0438\u043F\u0430 string.');
        return this.element.classList.contains(cls);
      }
      /**
      * Удаление CSS класса/классов
      * @param {String} Строка с именем/именами класса
      * @returns {Object} Объект класса Element
      */

    }, {
      key: 'removeClass',
      value: function removeClass(cls) {
        var _this3 = this;

        if (!cls) return this;
        if (typeof cls != 'string') throw new TypeError(this.removeClass.name + ' function. \u0422\u043E\u043B\u044C\u043A\u043E \u0430\u0440\u0433\u0443\u043C\u0435\u043D\u0442\u044B \u0442\u0438\u043F\u0430 string.');
        var classList = cls.split(/\W+/);
        if (!classList.length) throw new Error(this.removeClass.name + ' function. \u0421\u043F\u0438\u0441\u043E\u043A \u043A\u043B\u0430\u0441\u0441\u043E\u0432 \u043F\u0443\u0441\u0442.');
        classList.forEach(function (clsName) {
          return _this3.element.classList.remove(clsName);
        });
        return this;
      }
      /**
      * Добавление/удаление CSS класса/классов
      * @param {String} Строка с именем класса
      * @returns {Object} Объект класса Element
      */

    }, {
      key: 'toggleClass',
      value: function toggleClass(cls) {
        if (!cls) return this;
        if (typeof cls != 'string') throw new TypeError(this.toggleClass.name + ' function. \u0422\u043E\u043B\u044C\u043A\u043E \u0430\u0440\u0433\u0443\u043C\u0435\u043D\u0442\u044B \u0442\u0438\u043F\u0430 string.');
        this.element.classList.toggle(cls);
        return this;
      }
      /**
      * Добавление текста
      * @param {String} Строка с текстом
      * @returns {Object} Объект класса Element
      */

    }, {
      key: 'text',
      value: function text(str) {
        if (typeof str != 'string') throw new TypeError(this.text.name + ' function. \u0422\u043E\u043B\u044C\u043A\u043E \u0430\u0440\u0433\u0443\u043C\u0435\u043D\u0442\u044B \u0442\u0438\u043F\u0430 string.');
        this.element.appendChild(document.createTextNode(str));
        return this;
      }
      /**
      * Удаление всех дочерних элементов
      * @returns {Object} Объект класса Element
      */

    }, {
      key: 'empty',
      value: function empty() {
        while (this.element.firstChild) {
          this.element.removeChild(this.element.firstChild);
        }
        return this;
      }
    }]);

    return Element;
  }();

  try {
    var red = new Element('div').append(new Element('p').text('RED')).addClass('red small'),
        green = new Element('div').append(new Element('p').text('GREEN')).addClass('green').addClass('normal'),
        div = document.createElement('div'),
        parent = new Element(div).appendTo(document.body).append(red, green).toggleClass('blue').removeClass('blue'),
        blue = new Element('div').append('BLUE').addClass('blue large').appendTo(parent);
    setTimeout(function () {
      parent.empty().append(new Element('p').text('Cleared'));
    }, 3000);
  } catch (err) {
    console.error('Error: ' + err);
  }
})();
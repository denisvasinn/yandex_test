(function(){

  class Element {
    /**
    * Создание html элемента
    * @param {HTMLElement, String} element Строка или HTMLElement
    * @returns {Object} Объект класса Element
    */
    constructor(element) {
      if(typeof element == 'string') { this.element = document.createElement(element); }
      else if(element instanceof HTMLElement) { this.element = element; }
      else throw new new TypeError('Аргументы типа HTMLElement или String.')
    }
    /**
    * Прикрепить элементы к родительскому
    * @param {HTMLElement,Object, String} childs Список элементов для добавление
    * @returns {Object} Объект класса Element
    */
    append(...childs){
      childs.forEach((child) => {
        console.log(typeof child);
        if(child instanceof HTMLElement) { this.element.appendChild(child); }
        else if(child instanceof Element) { this.element.appendChild(child.element); }
        else if(typeof child == 'object') { this.element.appendChild(document.createTextNode(JSON.stringify(child))); }
        else if(typeof child == 'string') { this.element.appendChild(document.createTextNode(child)); }
        else throw new TypeError(`${this.appendTo.name} function. Только аргументы типа HTMLElement.`);
      });
      return this;
    }
    /**
    * Прикрепить объект класса  к родительскому
    * @param {HTMLElement,Object, String} parent родительский элемент
    * @returns {Object} Объект класса Element
    */
    appendTo(parent){
      if(!parent) throw new Error(`${this.appendTo.name} function. Родитель не указан.`);
      if(parent instanceof HTMLElement) parent.appendChild(this.element);
      else if(parent instanceof Element) parent.element.appendChild(this.element);
      else if(typeof child == 'object') parent.element.appendChild(this.element);
      else throw new TypeError(`${this.appendTo.name} function. Только аргументы типа HTMLElement.`);
      return this;
    }
    /**
    * Добавление  CSS класса/классов
    * @param {String} Строка с именем/именами класса
    * @returns {Object} Объект класса Element
    */
    addClass(cls){
      if(!cls) return this;
      if(typeof cls != 'string') throw new TypeError(`${this.addClass.name} function. Только аргументы типа string.`);
      let classList = cls.split(/\W+/);
      if(!classList.length) throw new Error(`${this.addClass.name} function. Список классов пуст.`);
      classList.forEach((clsName) => this.element.classList.add(clsName));
      return this;
    }
    /**
    * Проверка на наличие у объекта CSS класса
    * @param {String} Строка с именем класса
    * @returns {Boolean} Имеет класс или нет
    */
    hasClass(cls){
      if(!cls) return false;
      if(typeof cls != 'string') throw new TypeError(`${this.hasClass.name} function. Только аргументы типа string.`);
      return this.element.classList.contains(cls);
    }
    /**
    * Удаление CSS класса/классов
    * @param {String} Строка с именем/именами класса
    * @returns {Object} Объект класса Element
    */
    removeClass(cls){
      if(!cls) return this;
      if(typeof cls != 'string') throw new TypeError(`${this.removeClass.name} function. Только аргументы типа string.`);
      let classList = cls.split(/\W+/);
      if(!classList.length) throw new Error(`${this.removeClass.name} function. Список классов пуст.`);
      classList.forEach((clsName) => this.element.classList.remove(clsName));
      return this;
    }
    /**
    * Добавление/удаление CSS класса/классов
    * @param {String} Строка с именем класса
    * @returns {Object} Объект класса Element
    */
    toggleClass(cls){
      if(!cls) return this;
      if(typeof cls != 'string') throw new TypeError(`${this.toggleClass.name} function. Только аргументы типа string.`);
      this.element.classList.toggle(cls);
      return this;
    }
    /**
    * Добавление текста
    * @param {String} Строка с текстом
    * @returns {Object} Объект класса Element
    */
    text(str){
      if(typeof str != 'string') throw new TypeError(`${this.text.name} function. Только аргументы типа string.`);
      this.element.appendChild(document.createTextNode(str));
      return this;
    }
    /**
    * Удаление всех дочерних элементов
    * @returns {Object} Объект класса Element
    */
    empty(){
      while(this.element.firstChild) {
        this.element.removeChild(this.element.firstChild);
      }
      return this;
    }
  }

  try{
    let red = new Element('div').append(new Element('p').text('RED')).addClass('red small'),
        green = new Element('div').append(new Element('p').text('GREEN')).addClass('green').addClass('normal'),
        div = document.createElement('div'),
        parent = new Element(div).appendTo(document.body).append(red, green).toggleClass('blue').removeClass('blue'),
        blue = new Element('div').append('BLUE').addClass('blue large').appendTo(parent);
    setTimeout(() => { parent.empty().append(new Element('p').text('Cleared')); }, 3000);
  }
  catch(err){ 
    console.error(`Error: ${err}`);
  }
})();

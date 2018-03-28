function AnimationHandler() {
    var target = new Object();
    var targetClassName = "target";
    var animatingClassName = "animated";
    var typesAmount = 3;
    var delay = 50;
    //TODO: Вычисление CSS-длительности анимации;
    var additoryDelay = 800;
    this.initialize = function() {
        var additoryVariable = selectElementByClassName(targetClassName);
        if (additoryVariable.status) {
            target = additoryVariable.element;
            appendDecorators();
        } else notify(targetClassName, 2);
    };
    /*
     * Добавляет теги SPAN ко всем символам текстового узла;
     */
    var appendDecorators = function() {
        var counter = 0;
        var internalCounter = 0;
        var additoryCounter = 0;
        var results = new Array();
        var resultString = new Array();
        //Поиск текстовых узлов элемента;
        for (counter; counter < target.childNodes.length; counter++) {
            if (target.childNodes[counter].nodeType === Node.TEXT_NODE) {
                results.push(target.childNodes[counter]);
            }
        }
        for (counter = 0; counter < results.length; counter++) {
            resultString[counter] = "";
            for (var internalCounter = 0; internalCounter < results[counter].textContent.length; internalCounter++) {
                if (results[counter].textContent[internalCounter] !== " ") {
                    resultString[counter] += "<span class='" + animatingClassName + "-" + additoryCounter + "'>" + results[counter].textContent[internalCounter] + "</span>";
                    if (additoryCounter < typesAmount - 1) {
                        additoryCounter++;
                    } else additoryCounter = 0;
                } else resultString[counter] += results[counter].textContent[internalCounter];
            }
        }
        //TODO: Доработать добавление DOM-элементов;
        target.innerHTML = resultString[0] + "<span class='" + animatingClassName + "-3 second-part'>" + target.childNodes[1].innerHTML + "</span>";
        window.setTimeout(function () {
            startAnimation();
        }, 0);
    };
    /*
     * Запускает CSS-анимации для каждого элемента SPAN;
     */
    var startAnimation = function() {
        var counter = 0;
        var internalCounter = 0;
        var additoryVarible = new Object();
        var indicator = false;
        target.style.opacity = 1;
        additoryVarible = target.getElementsByTagName("span");
        //Проход по всем элементам SPAN;
        for (counter = 0; counter < additoryVarible.length; counter++) {
            while (!indicator && internalCounter < typesAmount) {
                if (testClassName(additoryVarible[counter], animatingClassName + "-" + internalCounter)) {
                    indicator = true;
                    window.setTimeout(function(counter, internalCounter) {
                        return function () {
                            clearClassName(additoryVarible[counter], animatingClassName + "-" + internalCounter);
                        };
                    }(counter, internalCounter), counter * delay + 10);
                } else internalCounter++;
            }
            if (indicator) {
                internalCounter = 0;
                indicator = false;
            } else {
                //Если найден элемент, для которого нужно применить анимацию появления;
                if (testClassName(additoryVarible[counter], animatingClassName + "-3")) {
                    window.setTimeout(function(counter) {
                        return function () {
                            clearClassName(additoryVarible[counter], animatingClassName + "-3");
                        };
                    }(counter), counter * delay + additoryDelay);
                }
            }
        }
    };
}
function clearStyleAttribute(element, properties) {
    "use strict";
    var counter = 0;
    var pattern = /.?/;
    if (element.hasAttribute("style")) {
        for (counter = 0; counter < properties.length; counter++) {
            switch (properties[counter]) {
                case "position":
                    pattern = /\s*position:\s*[a-z\-]+;\s*/ig;
                    break;
                case "width":
                case "height":
                case "top":
                case "left":
                    pattern = "\\s*" + properties[counter] + ":\\s*\\-{0,1}[0-9]+(\\.[0-9]+)*(px|%);\\s*";
                    break;
                case "opacity":
                    pattern = /\s*opacity:\s*[0-9]+(\.[0-9]+)*;\s*/ig;
                    break;
                case "display":
                    pattern = /\s*display:\s*(block|none);\s*/ig;
                    break;
                case "margin":
                    pattern = /\s*margin(-top|-left|-right|-bottom):\s*(-)?[0-9]+(\.[0-9]+)*(px|%);\s*/ig;
                    break;
                case "z-index":
                    pattern = /\s*z-index:\s*[0-9]+;\s*/ig;
                    break;
                case "padding":
                    pattern = /\s*padding(-top|-left|-right|-bottom):\s*(-)?[0-9]+(\.[0-9]+)*(px|%);\s*/ig;
                    break;
                default:
                    break;
            }
            if (new RegExp(pattern).test(element.getAttribute("style")))
                element.setAttribute("style", element.getAttribute("style").replace(new RegExp(pattern), ""));
        }
        if (!element.getAttribute("style").length) element.removeAttribute("style");
    }
}
function addClassName(element, className) {
    "use strict";
    if (element.className.length) element.className = element.className + " ";
    if (!new RegExp(className).test(element.className)) element.className = element.className + className;
}
function clearClassName(element, className) {
    "use strict";
    element.className = element.className.replace(new RegExp(className), "");
    element.className = element.className.replace(/\s+$/ig, "");
    if (!element.className.length) element.removeAttribute("class");
}
function testClassName(element, className) {
    "use strict";
    if (new RegExp("\\b" + className + "\\b(?!-)").test(element.className)) return true;
    else return false;
}
/**
* Функция используется для определения позиции DOM-элемента относительно начала страницы;
* @param {HTMLElement} element DOM-элемент, для которого необходимо определить вертикальный и горизонтальный отступ
* относительно начала документа;
* @author Илья Кантор;
*/
function calculateOffset(element) {
    "use strict";
    //Получение ограничивающего прямоугольника элемента;
    var rectangle = element.getBoundingClientRect();
    //В переменных содержатся ссылки на DOM-элементы "body" и "html";
    var body = document.body;
    var HTML = document.documentElement;
    //Определение текущей горизонтальной и вертикальной прокрутки документа;
    var scrollTop = window.pageYOffset || HTML.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || HTML.scrollLeft || body.scrollLeft;
    //Получение сдвига DOM-элементов "body" и "html" относительно окна браузера;
    var clientTop = HTML.clientTop || body.clientTop || 0;
    var clientLeft = HTML.clientLeft || body.clientLeft || 0;
    //Получение координат элемента относительно начала страницы;
    var top  = rectangle.top +  scrollTop - clientTop;
    var left = rectangle.left + scrollLeft - clientLeft;
    return { "top": Math.round(top), "left": Math.round(left) };
}
function checkObject(value) {
    for (var key in value) {
        if (value.hasOwnProperty(key)) return true;
    }
    return false;
}
function selectElementByClassName(className, container, indicator) {
    "use strict";
    var counter = 1;
    var additoryObject = new Object();
    var result = new Object();
    //Если пользователь явно не указал контейнер, поиск будет проводиться по всему документу;
    if (!container) container = document;
    additoryObject = container.getElementsByClassName(className);
    //Удаление лишних DOM-элементов;
    if (indicator && additoryObject.length > 1) {
        for (counter; counter < additoryObject.length; counter++)
            additoryObject[counter].parentNode.removeChild(additoryObject[counter]);
    }
    //Формирование ответа;
    if (!additoryObject.length) result = {"status": false};
    else result = {"status": true, "element": additoryObject[0]};
    return result;
}
function searchContainer(element, attributeTitle, attributeValue) {
    "use strict";
    var indicator = false;
    while (!indicator && element.nodeName !== "BODY") {
        switch (attributeTitle) {
            case "class":
                if (testClassName(element, attributeValue)) indicator = true;
                break;
            case "id":
                if (element.id === attributeValue) indicator = true;
                break;
            default: break;
        }
        if (!indicator) element = element.parentNode;
    }
    return {"status": indicator, "element": element};
}
/**
 * Функция для уведомления об возникновении ошибки;
 * @param {string} value Название класса или идентификатора;
 * @param {number} type Вид уведомления (1 - отсутствие класса у элемента,
 * 2 - не найдены элементы искомого класса, 3 - не найден элемент с идентификатором);
 */
function notify(value, type) {
    "use strict";
    if (type) {
        switch (parseInt(type)) {
            //Для сообщений об неудачном поиске DOM-элементов с указанным классом;
            case 1:
                console.error("DOM-элемент должен иметь класс '" + value + "';");
                break;
            case 2:
                console.error("Не найдено ни одного DOM-элемента с классом '" + value + "';");
                break;
            //Для сообщений об неудачном поиске DOM-элементов с указанным идентификатором;
            case 3:
                console.error("Не найден DOM-элемент с идентификатором '" + value + "';");
                break;
            default:
                console.error("Возникла ошибка;");
                break;
        }
    } else console.error(value);
}
/**
 * Класс отвечает за AJAX-отправку сообщений на сервер
 */
function Request() {
    "use strict";
    var validationObject = new Object();
    var spinnerObject = new Object();
    var requestCallerClassName = "request-caller";
    var handlerAddress = "";
    this.HandlerAddress = function(value) {
        if (!arguments.length) return handlerAddress;
        else handlerAddress = value;
    };
    var buttons = new Array();
    this.Buttons = function(elements) {
        var counter = 0;
        for (counter = 0; counter < elements.length; counter++) {
            if (testClassName(elements[counter], requestCallerClassName)) {
                buttons.push(elements[counter]);
            }
        }
    };
    this.setButton = function(element) {
        if (testClassName(element, requestCallerClassName)) {
            buttons.push(element);
        }
    };
    var validationIndicator = true;
    this.ValidationIndicator = function(value) {
        if (!arguments.length) return validationIndicator;
        else validationIndicator = value;
    };
    var refreshIndicator = false;
    this.RefreshIndicator = function(value) {
        if (!arguments.length) return refreshIndicator;
        else refreshIndicator = value;
    };
    //Название индикатора-заглушки, который препятствует отправке формы;
    var indicatorTitle = "data-indicator";
    this.IndicatorTitle = function(value) {
        if (!arguments.length) return indicatorTitle;
        else indicatorTitle = value;
    };
    var clearTextFields = function(form) {
        var counter = 0;
        var additoryObject = new Object();
        for (counter = 0; counter < form.elements.length; counter++) {
            additoryObject = form.elements[counter];
            switch (additoryObject.type) {
                case "submit":
                case "hidden":
                case "radio":
                case "checkbox":
                    break;
                default:
                    if (additoryObject.value.length) additoryObject.value = "";
                    break;
            }
        }
    };
    //Метод инициализирует возможность AJAX-отправки данных;
    this.appendHandler = function() {
        var counter = 0;
        var additoryVariable = new Object();
        for (var counter = 0; counter < buttons.length; counter++) {
            additoryVariable = buttons[counter];
            //Поиск формы, к которой относится кнопка;
            while (additoryVariable.nodeName !== "BODY" && additoryVariable.nodeName !== "FORM")
                additoryVariable = additoryVariable.parentNode;
            if (additoryVariable.nodeName === "FORM") {
                buttons[counter].addEventListener("click", this, false);
                try {
                    spinnerObject = new Spinner();
                    spinnerObject.setContainer(document.body);
                } catch (error) {
                    if (error instanceof ReferenceError) {
                        notify("Не подключен скрипт 'spinner.js';");
                    }
                }
                if (validationIndicator) {
                    try {
                        validationObject = new Validation();
                    } catch (error) {
                        if (error instanceof ReferenceError) {
                            notify("Не подключен скрипт 'validation.js';");
                        }
                    }
                }
            }
        }
    };
    this.handleEvent = function(event) {
        event = event || window.event;
        var XHR = new XMLHttpRequest();
        var form = event.target;
        var additoryObject = new Object();
        //Объект, который используется для сохранения в localStorage введённых пользователем данных;
        var data = new Object();
        var permissionIndicator = true;
        var requestBody = "";
        var counter = 0;
        XHR.onreadystatechange = function() {
            if (XHR.readyState === 4) {
                //Удаление индикатора-заглушки;
                document.body.removeAttribute(indicatorTitle);
                //Удаление индикатора отправки;
                spinnerObject.removeSpinner();
            }
        }.bind(this);
        if (event.type === "click") {
            if (!document.body.hasAttribute(indicatorTitle)) {
                while (form.nodeName !== "BODY" && form.nodeName !== "FORM")
                    form = form.parentNode;
                if (form.nodeName === "FORM") {
                    //Если указана необходимость валидации данных формы перед их отправкой;
                    if (validationIndicator) {
                        validationObject.setForm(form);
                        permissionIndicator = validationObject.validateForm();
                    }
                    if (permissionIndicator) {
                        //Установка индикатора-заглушки;
                        document.body.setAttribute(indicatorTitle, true);
                        //Добавление индикатора отправки;
                        spinnerObject.appendSpinner();
                        //Если используется POST-запросы (или на обработчик необходимо отправлять файлы); 
                        if (form.getAttribute("method") === "POST") {
                            data = new FormData(form);
                            data.append("ajax_indicator", true);
                            XHR.open(form.getAttribute("method"), handlerAddress, true);
                            XHR.send(data);
                        //Если используется GET-запросы;
                        } else {
                            //Формирование тела запроса;
                            for (counter = 0; counter < form.elements.length; counter++) {
                                additoryObject = form.elements[counter];
                                if (additoryObject.type !== "submit") {
                                    switch (additoryObject.type) {
                                        case "text":
                                        case "email":
                                        case "tel":
                                        case "hidden":
                                            requestBody = requestBody + additoryObject.name + "=" + additoryObject.value;
                                            if (counter < form.elements.length - 2) requestBody = requestBody + "&";
                                            break;
                                        case "radio":
                                            if (additoryObject.checked) {
                                                requestBody = requestBody + additoryObject.name + "=" + additoryObject.value;
                                                if (counter < form.elements.length - 2) requestBody = requestBody + "&";
                                            }
                                            break;
                                        default: break;
                                    }
                                    if (additoryObject.nodeName === "TEXTAREA") {
                                        requestBody = requestBody + additoryObject.name + "=" + additoryObject.value;
                                        if (counter < form.elements.length - 2) requestBody = requestBody + "&";
                                    }
                                }
                            }
                            XHR.open(form.getAttribute("method"), handlerAddress + "?" + requestBody + "&ajax_indicator=true", true);
                            XHR.send();
                        }
                        if (refreshIndicator) clearTextFields(form);
                    }
                }
            }
        }
    };
}
function Spinner() {
    var container = new Object();
    var indicator = new Object();
    var background = new Object();
    var indicatorClassName = "spinner";
    var backgroudClassName = "spinner-background";
    this.setContainer = function(value) {
        "use strict";
        container = value;
    };
    this.appendSpinner = function() {
        "use strict";
        background = document.createElement("div");
        background.className = backgroudClassName;
        indicator = document.createElement("div");
        indicator.className = indicatorClassName;
        container.appendChild(background);
        background.appendChild(indicator);
    };
    this.removeSpinner = function() {
        "use strict";
        background.removeChild(indicator);
        container.removeChild(background);
    };
}
function Validation() {
    "use strict";
    var errorClassName = "error";
    var requireAttributeTitle = "data-required";
    var validationTypeAttributeTitle = "data-type";
    var emptyTextFieldMessage = "Обязательное поле.";
    var wrongDataMessage = "Неправильно.";
    var additoryContainerClassName = "form-row";
    var form = new Object();
    var spinner = new Object();
    this.setForm = function(value) {
        var counter = 0;
        if (value.nodeName === "FORM") {
            form = value;
            //Добавление обработчика для сокрытия сообщений об ошибках;
            form.addEventListener("click", this, false);
            for (counter = 0; counter < form.elements.length; counter++)
                if (form.elements[counter].type !== "submit" && form.elements[counter].type !== "button" && form.elements[counter].type !== "hidden")
                    form.elements[counter].addEventListener("focus", this, false);
            try {
                spinner = new Spinner();
                spinner.setContainer(document.body);
            } catch (error) {
                if (error instanceof  ReferenceError) {
                    console.error("Не подключен скрипт 'spinner.js';");
                }
            }
        } else console.error("Вы указали некорректный DOM-элемент;");
    };
    this.getForm = function() {
        return form;
    };
    this.removeClickHandler = function() {
        form.removeEventListener("click", this, false);
    };
    this.appendSubmitHandler = function() {
        form.addEventListener("submit", this, false);
    };
    this.validateForm = function() {
        var counter = 0;
        var mainIdicator = true;
        var textField = new Object();
        for (counter = 0; counter < form.elements.length; counter++) {
            if (form.elements.type !== "submit" && form.elements.type !== "button" && form.elements.type !== "hidden") {
                textField = form.elements[counter];
                //Если поле имеет атрибут, который указывает на обязательность заполнения
                //этого поля;
                if (textField.hasAttribute(requireAttributeTitle) && !testClassName(textField, errorClassName)) {
                    if (!isEmpty(textField) && mainIdicator) mainIdicator = false;
                }
                if (textField.hasAttribute(validationTypeAttributeTitle) && !testClassName(textField, errorClassName)) {
                    if (!checkTextField(textField) && mainIdicator) mainIdicator = false;
                }
            }
        }
        if (form.getElementsByClassName(errorClassName).length && mainIdicator) mainIdicator = false;
        return mainIdicator;
    };
    var checkPresence = function(textField) {
        var additoryObject = textField;
        var indicator = true;
        while (additoryObject.nodeName !== "BODY" && indicator) {
            additoryObject = additoryObject.parentNode;
            if (window.getComputedStyle(additoryObject, "").display === "none") indicator = false;
        }
        return indicator;
    };
    this.clearTextFields = function() {
        var counter = 0;
        var additoryObject = new Object();
        for (counter = 0; counter < form.elements.length; counter++) {
            additoryObject = form.elements[counter];
            switch (additoryObject.type) {
                case "submit":
                case "hidden":
                case "radio":
                case "checkbox":
                    break;
                default:
                    if (additoryObject.value.length) additoryObject.value = "";
                    break;
            }
        }
    }.bind(this);
    var checkTextField = function(textField) {
        var pattern = /.?/ig;
        var indicator = true;
        switch(textField.getAttribute(validationTypeAttributeTitle)) {
            case "1":
                //Ввод буквенных символов в любом регистре;
                pattern = /^[a-zа-яёїъі]{4,}$/ig;
                break;
            case "2":
                //Ввод телефонного номера (украинские номера);
                pattern = /^(\+{0,1}38\s{0,1})*(\({0,1}[0-9]{3}\){0,1}\s{0,1})*[0-9]{3}\-{0,1}[0-9]{2}\-{0,1}[0-9]{2}$/ig;
                break;
            case "3":
                //Ввод email-адреса;
                pattern = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/ig;
                break;
            default: break;
        }
        if (textField.value.length && !pattern.test(textField.value)) {
            appendMessage(textField, wrongDataMessage);
            indicator = false;
        }
        return indicator;
    }.bind(this);
    var isEmpty = function(textField) {
        var indicator = true;
        if (!textField.value.length && checkPresence(textField)) {
            appendMessage(textField, emptyTextFieldMessage);
            indicator = false;
        }
        return indicator;
    }.bind(this);
    var appendMessage = function(textField, textMessage) {
        var verticalOffset = 0;
        var horizontalOffset = 0;
        var indicator = true;
        var additoryObject = textField;
        var message = document.createElement("span");
        message.className = errorClassName + "-message";
        message.innerHTML = textMessage;
        if (textField.name.length) {
            message.setAttribute("data-reference", textField.name);
        } else if (textField.id.length) {
            message.setAttribute("data-reference", textField.id);
        }
        if (textField.getAttribute("placeholder")) {
            textField.setAttribute("data-placeholder", textField.getAttribute("placeholder"));
            textField.removeAttribute("placeholder");
        }
        textField.parentNode.appendChild(message);
        //Вычисление отступа DOM-элемента, ссылка на который была передана в функцию, относительно формы или
        //DOM-элемента с классом addadditoryContainerClassName;
        if (additoryObject.parentNode !== form && !testClassName(additoryObject.parentNode, additoryContainerClassName)) {
            while (indicator && additoryObject.parentNode !== form && !testClassName(additoryObject, additoryContainerClassName)) {
                additoryObject = additoryObject.parentNode;
                horizontalOffset = horizontalOffset + additoryObject.offsetLeft;
                verticalOffset = verticalOffset + additoryObject.offsetTop;
                if (additoryObject.nodeName === "BODY") indicator = false;
            }
        } else {
            horizontalOffset = additoryObject.offsetLeft;
            verticalOffset = additoryObject.offsetTop;
        }
        if (indicator) {
            //Очистка текущего содержимого поля;
            textField.setAttribute("data-value", textField.value);
            textField.value = "";
            message.style.left = (horizontalOffset + 10) + "px";
            message.style.top = (verticalOffset + textField.offsetHeight / 2 - message.offsetHeight / 2) + "px";
            addClassName(textField, errorClassName);
        } else console.error("К сожалению, форма не была найдена;");
    }.bind(this);
    var hideMessage = function(textField, message) {
        clearClassName(textField, errorClassName);
        message.parentNode.removeChild(message);
        textField.focus();
        //Восстановление значения в поле;
        if (textField.hasAttribute("data-value")) {
            textField.value = textField.getAttribute("data-value");
            textField.removeAttribute("data-value");
        }
        if (textField.hasAttribute("data-placeholder")) {
            textField.setAttribute("placeholder", textField.getAttribute("data-placeholder"));
            textField.removeAttribute("data-placeholder");
        }
    }.bind(this);
    var searchMessage = function(textFieldTitle) {
        var counter = 0;
        var indicator = false;
        var element = new Object();
        while (!indicator && counter < form.getElementsByClassName(errorClassName + "-message").length) {
            element = form.getElementsByClassName(errorClassName + "-message")[counter];
            if (element.getAttribute("data-reference") === textFieldTitle) indicator = true;
            counter++;
        }
        return {"status": indicator, "element": element};
    }.bind(this);
    this.handleEvent = function(event) {
        event = event || window.event;
        //В переменной содержится ссылка на DOM-элемент, на который нажал пользователь;
        var element = event.target;
        //Дополнительная переменная;
        var additoryObject = new Object();
        //В переменной содержится ссылка на поле;
        var textField = new Object();
        //В переменной содержится ссылка на DOM-элемент, который выполняет роль
        //сообщения об ошибке;
        var message = new Object();
        //Индикатор указывает на то, нажал ли пользователь на поле, для которого
        //выводится сообщение об ошибке, или на сообщение об ошибке;
        var indicator = false;
        var textFieldTitle = "";
        if (event.type === "submit") {
            if (this.validateForm()) {
                form.submit();
                spinner.appendSpinner();
                window.setTimeout(function() {
                    spinner.removeSpinner();
                }.bind(this), 10000);
            }
        }
        if (event.type === "focus") {
            if (testClassName(element, errorClassName)) {
                textField = element;
                //Определение названия или идентификатора поля;
                if (textField.name.length) textFieldTitle = textField.name;
                else textFieldTitle = textField.id;
                //Поиск сообщения об ошибке;
                additoryObject = searchMessage(textFieldTitle);
                if (additoryObject.status) message = additoryObject.element;
                else console.error("При поиске сообщения об ошибке произошёл сбой в работе скрипта;");
                indicator = true;
            }
        }
        if (event.type === "click") {
            //Если пользователь нажал на поле, для которого выведено сообщение
            //об ошибке;
            if (testClassName(element, errorClassName)) {
                textField = element;
                //Определение названия или идентификатора поля;
                if (textField.name.length) textFieldTitle = textField.name;
                else textFieldTitle = textField.id;
                //Поиск сообщения об ошибке;
                additoryObject = searchMessage(textFieldTitle);
                if (additoryObject.status) message = additoryObject.element;
                else console.error("При поиске сообщения об ошибке произошёл сбой в работе скрипта;");
                indicator = true;
            }
            //Если пользователь нажал на сообщение об ошибке;
            if (testClassName(element, errorClassName + "-message")) {
                message = element;
                textFieldTitle = message.getAttribute("data-reference");
                textField = form.elements[textFieldTitle];
                if (!textField) console.error("При поиске поля произошёл сбой в работе скрипта;");
                indicator = true;
            }
        }
        if (indicator) {
            //Непосредственное сокрытие сообщений об ошибках;
            hideMessage(textField, message);
        }
    };
}
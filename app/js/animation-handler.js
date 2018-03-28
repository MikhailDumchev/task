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
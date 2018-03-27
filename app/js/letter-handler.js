function LetterHandler() {
    "use strict";
    var targetClassName = "target";
    var target = new Object();
    this.initialize = function() {
        var additoryVariable = selectElementByClassName(targetClassName);
        if (additoryVariable.status) {
            target = additoryVariable.element;
            addDecorator(target);
        }
    };
    var addDecorator = function() {
        var counter = 0;
        var targetString = target.innerHTML.split("<span>");
        var resultString = "";
        console.log(targetString);
        for (counter; counter < targetString[0].length; counter++) {
            if (targetString[0][counter] !== " ") {
                resultString += "<span class='animated'>" + targetString[0][counter] + "</span>"; 
            } else resultString += targetString[0][counter];
        }
        target.innerHTML = resultString + "<span>" + targetString[1];
    };
}
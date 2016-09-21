
var operationsArray = ['+']; //Выбранные операции
var trackAnswers = 0; //Кол-во правильных ответов
var trackErrors = 0; //Неправильных ответов
var answer = 0; //результат

//Добавление/удаление операции
function checkboxChange() {
    $(":checkbox").click(function (e) {
        if ($("[name=group1]:checked").length > 0) { //хотя-бы 1 чекбоксы
                operationsArray = [];
                $.each($("input[type='checkbox']:checked"), function () {
                    operationsArray.push($(this).val());
                });
                answer = generateExpr(); //сгенерировать новый пример
                $('#inputCheck').val(''); //очистить ввод        
        }
        else e.preventDefault();
    })
}

function generateNumber(min, max)
{
    return Math.floor(Math.random() * (max - min) + min);
}

//Сгенерировать пример
function generateExpr() {
    var operation = operationsArray[Math.floor(Math.random() * operationsArray.length)]; //случайная операция
   
    var first = 0; //первое число в примере
    var second = 0; //второе число в примере
    if (operation == '+') //если сложение
    {
        answer = generateNumber(2,100); //от 2 до 100
        first = generateNumber(0,answer); //до числа в ответе
        second = answer - first; //найти второе число
        if (second < 0) {
            second = -second; //изменить знак, если отрицательное
        }
        $('#expression').text(first + ' ' + operation + ' ' + second + ' = '); //вывести на экран
    }
    else if (operation == '-') //вычитание
    {
        answer =  generateNumber(2,100);
        first =  generateNumber(answer,100);
        second = answer - first;
        if (second < 0) {
            second = -second;
        }
        if (first > second) {
            $('#expression').text(first + ' ' + operation + ' ' + second + ' = ');
        }
        else {
            $('#expression').text(second + ' ' + operation + ' ' + first + ' = ');
        }
    }
    else if (operation == '*') //умножение
    {
        answer =  generateNumber(2,100);
        //искать только целые числа
        do {
            first =  generateNumber(1,answer);
        }while(answer%first>0)
        
        second = answer / first;
        $('#expression').text(first + ' ' + operation + ' ' + second + ' = ');
    }
    else if (operation == '/')
    {
        answer =  generateNumber(2,100);
        //искать только целые числа
        do {
            first = generateNumber(answer,100);
        } while (first%answer > 0)

        second = first / answer;
        $('#expression').text(first + ' ' + operation + ' ' + second + ' = ');
    }
    return answer; //ответ для проверки
}

$(document).ready(function () {
    $('#tabs').tab(); //активировать табы
    checkboxChange(); 
    answer = generateExpr(); //сохранить ответ
    //проверка ответа
    $('#checkButton').click(function () {
        if ($('#inputCheck').val() == '') //не пустое поле
        {
            alert('Введите число');
            return;
        }
        if (+($('#inputCheck').val()) == answer) {
            ++trackAnswers;
            $('#right').text(trackAnswers);
        }
        else {
            ++trackErrors;
            $('#wrong').text(trackErrors);
        }
        $('#inputCheck').val(''); //очистить ответ
        answer = generateExpr(); //сгенерировать новый пример
    });
    //валидация текстбокса
    $('#inputCheck').keydown(function (event) {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
            // Разрешаем: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) ||
            // Разрешаем: home, end, влево, вправо
                (event.keyCode >= 35 && event.keyCode <= 39)) {
            // Ничего не делаем
            return;
        }
        else {
            // Убеждаемся, что это цифра, и останавливаем событие keypress
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    })
});
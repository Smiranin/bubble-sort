"use script";
var counters = {};
var arr = [];
var btnSort = document.getElementById('sort'); 
var startContainer = document.getElementById('start-container');
var endContainer = document.getElementById('end-container');
var blockRes = document.getElementById('res');
var ul = document.createElement('ul');
var btn = document.getElementById('btn');

//Функция для формирования массива с фильтрованными данными. 
function getArr(){
    var str = btnSort.value;
    if(!str){alert('Заполните поле!'); return;}
    str = str.replace(/ /g, "")
    //Убираем с конца запятую если есть.
    if(str.slice(-1) == ','){
        str = str.slice(0, -1);
    }
    var arr1 = str.split(','); 
     for(var i = 0; i < arr1.length; i++){
        if(!isNaN(parseFloat(arr1[i])) && isFinite(arr1[i])){
             arr.push(+arr1[i]);
             continue;
        }
             alert("Упс! <" + arr1[i] + ">  Не число! Или вы ввели лишние знаки!");
             return false;
    }
    loadRes();
}

//Функция формирования страницы для введенных чисел и их сортировки.
function loadRes(){
      startContainer.className = "hide";
      endContainer.className = "";
      for(var x = 0; x < arr.length; x++ ){
      var li = document.createElement('li');
      li.innerHTML = arr[x];
      ul.appendChild(li);
      blockRes.appendChild(ul);
      btn.addEventListener("click", sort);
  }
}

//удаление не нужных классов.
function removeClass(k){
                ul.children[k].className = "";
                ul.children[k-1].className = "";
}

 //присвоение класса active блокам с текущими числами.
function addActiveClass(k){
                ul.children[k].className = "active";
                ul.children[k+1].className = "active";
}

//класс bulb для блоков с цифрами в которых происходит замена.
function addBulbClass(k){
                    ul.children[k].className = "bulb";
                    ul.children[k+1].className = "bulb";
}

//Присвение класса end для отсортированой числами.
function addEndClass(leng, i){
     ul.children[leng-i].className = "end";
     if((leng-i) == 1){
          ul.children[0].classList.add("end");
          alert('Массив отсортирован');
      }
      btn.addEventListener("click", sort);
}

//меняем местами цифры.
function changeNumbers(k){
           var elem = arr[k];
           arr[k] = arr[k+1];
           arr[k+1] = elem;
           ul.children[k].innerHTML =  arr[k];
           ul.children[k+1].innerHTML =  arr[k+1];
}

//Функция пузырьковой сортировки массива.
function sort(){
    btn.removeEventListener("click", sort);
    if(!counters.cnt)counters.cnt = 0;
    counters.cnt++;
    var leng = arr.length;
    //Первый цикл для сортировки.
    for(var i = counters.cnt; i < leng; i++){
        var k = 0;
        //Второй цикл для сортировки, с помощью рекурсивной функции.
        (function run() { 
            if(k !== 0){removeClass(k);}
            if (k < leng-i) {
                addActiveClass(k);
                if(arr[k] > arr[k+1]) {
                    //вызов блока с цифрами, которые меняются местами.
                    setTimeout(function() {
                        addBulbClass(k);
                                setTimeout(function() {
                                changeNumbers(k);
                                k++; 
                                //вызов новой итерации рекурсивной функции.
                                setTimeout(run, 500);
                                },200);
                    }, 500);
                    }else{
                        k++;
                        //вызов новой итерации рекурсивной функции.
                        setTimeout(run, 1200);
                    }
            }else{
               addEndClass(leng, i);
            }
        })();
        return;
    }
}

//Функция возврата стартовой страницы.
function reset() {
    location.reload()
}
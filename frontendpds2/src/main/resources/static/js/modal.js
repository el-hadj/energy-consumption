// MODAL FOR MANUEL MODE
var modalBtn = document.querySelector('.Modal-btn-manuel')
var modalBg = document.querySelector('.Modal-Manuel')
var modalClose = document.querySelector('.Modal-close')
var BtnClose = document.querySelector('.Btn-close')

// A click on the button opens the modal
modalBtn.addEventListener('click', function () {
    modalBg.classList.add('bg-active');
});

// A click on the button close the modal
modalClose.addEventListener('click', function () {
    modalBg.classList.remove('bg-active');
});

// A click on the validate button close the modal
BtnClose.addEventListener('click', function () {
    modalBg.classList.remove('bg-active');
});

// MODAL FOR AUTOMATIQUE MODE
var modalBtnAuto = document.querySelector('.Modal-btn-automatique')
var modalBgAuto = document.querySelector('.Modal-Automatique')
var modalCloseAuto = document.querySelector('.Modal-close-auto')
var BtnCloseAuto = document.querySelector('.Btn-close')

modalBtnAuto.addEventListener('click', function () {
    modalBgAuto.classList.add('bg-active');
});

modalCloseAuto.addEventListener('click', function (){
    modalBgAuto.classList.remove('bg-active');
});

BtnCloseAuto.addEventListener('click', function (){
    modalBgAuto.classList.remove('bg-active');
});

// MODAL FOR CONFORT MODE
var modalBtnConfort = document.querySelector('.Modal-btn-confort')
var modalBgConfort = document.querySelector('.Modal-Confort')
var modalCloseConfort = document.querySelector('.Modal-close-confort')
var BtnCloseConfort = document.querySelector('.Btn-close')

modalBtnConfort.addEventListener('click', function () {
    modalBgConfort.classList.add('bg-active');
});

modalCloseConfort.addEventListener('click', function (){
    modalBgConfort.classList.remove('bg-active');
});

BtnCloseConfort.addEventListener('click', function (){
    modalBgConfort.classList.remove('bg-active');
});

// MODAL FOR ECONOMIQUE MODE
var modalBtnEconomique = document.querySelector('.Modal-btn-economique')
var modalBgEconomique = document.querySelector('.Modal-Economique')
var modalCloseEconomique = document.querySelector('.Modal-close-economique')
var BtnCloseEconomique = document.querySelector('.Btn-close')

modalBtnEconomique.addEventListener('click', function () {
    modalBgEconomique.classList.add('bg-active');
});

modalCloseEconomique.addEventListener('click', function (){
    modalBgEconomique.classList.remove('bg-active');
});

BtnCloseEconomique.addEventListener('click', function (){
    modalBgEconomique.classList.remove('bg-active');
});




let ctx = document.getElementById('myChart').getContext('2d');
let label = ['hydraulique', 'solaire', 'éolien'];
let color = ['#7e99e3', '#7e83e3', '#a17ee3'];
let valuehyd = document.getElementById("hydrauliquevalue").innerHTML;
let valuesol = document.getElementById("solairevalue").innerHTML;
let valueeol = document.getElementById("eolienvalue").innerHTML;

let myChart = new Chart(ctx , {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [valuehyd, valuesol, valueeol],
            backgroundColor: color
        }],
        labels: label
    },
    options: {
        responsive: true
    }
})

let ctx2  = document.getElementById("mySecondChart").getContext('2d');
let names = document.getElementById("names").innerHTML;
let values = document.getElementById("values").innerHTML;
let color2 = ['#7e99e3', '#7e83e3', '#a17ee3', '#621ee2', '#b01ee2'];

let names2 = names.replace('[', '');
let newNames = names2.replace(']', '');
console.log(newNames);
let arrayNames = Array.from(newNames.split(','));

let values2 = values.replace('[', '');
let newValues = values2.replace(']', '');
console.log(newValues);
let arrayValues = Array.from(newValues.split(','));

console.log(arrayNames);
console.log(arrayValues);

let mySecondChart = new Chart(ctx2 , {
    type: 'doughnut',
    data: {
        datasets: [{
            data: arrayValues,
            backgroundColor: color2
        }],
        labels: arrayNames
    },
    options: {
        responsive: true
    }
})


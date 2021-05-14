import axios from 'axios';
let url = "";
let CurrencyAll;
let Currency = [];

const incomes = [
    {currency: 'USD', summ: 400, date: "2020-05-12"},
    {currency: 'EUR', summ: 500, date: "2020-05-13"},
    {currency: 'GBP', summ: 458, date: "2020-05-14"},
    {currency: 'RUB', summ: 120, date: "2021-05-12"},
    {currency: 'RUB', summ: 53, date: "2021-05-13"},
    {currency: 'EUR', summ: 124, date: "2021-05-14"},
];


for(let i = 0; i < incomes.length; i++){

    url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=" +
        incomes[i].currency + "&date=" + incomes[i].date.replace("-", "").replace("-", "") + "&json";

    CurrencyAll = await axios.get(url);
    Currency.push(CurrencyAll.data[0]);
}

let rawData = [];
let CurrencyToUAH = [];
let earned = 0;
let earnedUAH = 0;

for(let i = 0; i < incomes.length; i++){
    rawData.push({
        "currency": incomes[i].currency,
        "summ": incomes[i].summ,
        "date": incomes[i].date,
        "rate": Currency[i].rate
    })

    CurrencyToUAH = Currency[i].rate * incomes[i].summ;
    earned += incomes[i].summ;
    earnedUAH += (Currency[i].rate * incomes[i].summ);
}
let tax = earnedUAH * 0.05;

let report = {
    "totalEarned": earned,
    "totalEarnedUAH": earnedUAH,
    "tax5percent": tax,
    "rawData": rawData
};

console.log(report);


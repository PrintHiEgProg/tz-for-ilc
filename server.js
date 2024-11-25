const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cron = require("node-cron");

const app = express();
const PORT = process.env.PORT || 3000;


const fetchCurrencyRate = async () => {
  try {
    const response = await axios.get(
      "https://www.investing.com/currencies/usd-rub-chart"
    );
    const $ = cheerio.load(response.data);

    const rateElement = $(
      '[class*="text-5xl"][class*="font-bold"][class*="text-[#232526]"][class*="md:text-[42px]"][class*="md:leading-[60px]"]'
    );
    const rate = rateElement.text().trim();

    console.log(`Курс USD/RUB: ${rate}`);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};


cron.schedule("* * * * *", () => {
  fetchCurrencyRate();
});


app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

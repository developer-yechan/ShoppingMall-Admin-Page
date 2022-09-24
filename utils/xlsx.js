const xlsx = require("xlsx");

const countryCode = xlsx.readFile("./utils/xlsx/CountryCode.xlsx");
const deliveryCost = xlsx.readFile("./utils/xlsx/DeliveryCost.xlsx");

const xlsxToJson = (file) => {
  const sheetName = file.SheetNames[0];
  const sheet = file.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);
  return data;
};

const getCountry = (buyr_country) => {
  const countryData = xlsxToJson(countryCode);
  const filteredCountry = countryData.filter((countryInfo) => {
    return countryInfo.country_code === buyr_country;
  });

  const country = filteredCountry[0].country_name;
  return country;
};

const getPrice = (country, quantity) => {
  const costData = xlsxToJson(deliveryCost);
  const price = costData[quantity - 1][country];
  return price;
};

module.exports = { getCountry, getPrice };

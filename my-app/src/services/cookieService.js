export const setCookie = (cName, cValue, expDays) => {
  let date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires;
};

export const getCookie = (cName) => {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie);
  const cArr = cDecoded.split("; ");
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
};
export const AddCityToCookie = (cookieName, city) => {
  console.log("My saveCity:", cookieName, city);
  const getCookieData = getCookieValues();
  const { favCities } = getCookieData;
  console.log("My saveCity - cities:", JSON.parse(favCities));
  console.log("My saveCity - getCookieData:", getCookieData);
};

export const getCookieValues = () => {
  const cDecoded = decodeURIComponent(document.cookie);
  const { isDark, tempUnit, favCities } = Object.fromEntries(
    cDecoded.split("; ").map((val) => val.split("="))
  );
  return { isDark, tempUnit, favCities };
};

export const DelCityFromCookie = (cookieName, city) => {
  console.log("My saveCity:", cookieName, city);
  const { favCities } = getCookieValues();
  console.log("My saveCity - cities:", JSON.parse(favCities));
};

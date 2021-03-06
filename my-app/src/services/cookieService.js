export const setCookie = (cName, cValue, expDays) => {
  let date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires;
};

export const getCookieValues = () => {
  const cDecoded = decodeURIComponent(document.cookie);
  const { isDark, tempUnit, favCities } = Object.fromEntries(
    cDecoded.split("; ").map((val) => val.split("="))
  );
  return { isDark, tempUnit, favCities };
};

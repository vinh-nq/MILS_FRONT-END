export const getValueFromLink = (location, queryParamName, type) => {
  if (type === "STRING") {
    return new URLSearchParams(location.search).get(queryParamName) === null
      ? ""
      : new URLSearchParams(location.search).get(queryParamName);
  } else {
    return new URLSearchParams(location.search).get(queryParamName) === null
      ? 1
      : new URLSearchParams(location.search).get(queryParamName);
  }
};

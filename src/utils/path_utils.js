function path_mounter(path) {
  const routeCharPattern = /:([a-zA-Z]+)/g;

  const hasParams = path.replaceAll(routeCharPattern, "(?<$1>[a-z0-9-_]+)");

  const pathRegex = new RegExp(`^${hasParams}(?<query>\\?(.*))?$`);

  return pathRegex;
}

function getQueryParams(query) {
  return query
    .substr(1)
    .split("&")
    .reduce((queryParams, param) => {
      const [key, value] = param.split("=");

      queryParams[key] = value;

      return queryParams;
    }, {});
}

export { path_mounter, getQueryParams };

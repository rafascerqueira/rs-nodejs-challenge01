import http from "node:http";

import { contentType } from "./middlewares/contentType.js";
import { routes } from "./routes.js";
import { getQueryParams } from "./utils/path_utils.js";

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await contentType(request, response);

  const route = routes.find(
    (route) => route.method === method && route.path.test(url)
  );

  if (route) {
    const routeParams = request.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    request.params = params;
    request.query = query ? getQueryParams(query) : {};

    return route.handler(request, response);
  }

  return response.writeHead(404).end();
});

server.listen(3333);

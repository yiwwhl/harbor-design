import { RouteRecord } from "vue-router";

function routeCollector() {
  const routerModules = import.meta.glob("./modules/*.tsx", {
    import: "default",
    eager: true,
  });
  const sortedRouter = Object.values(routerModules).sort((a: any, b: any) => {
    return a.meta.order - b.meta.order;
  });
  return sortedRouter;
}

export const routes = routeCollector() as RouteRecord[];

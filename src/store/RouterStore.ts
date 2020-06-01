import {} from "mobx";
import { createBrowserHistory } from "history";

class RouterStore {
  history = createBrowserHistory();

  push = (path: string) => {

    if (path === "/directions/price/onlineprice") {
      window.location.href = path;
      return;
    }

    window.scrollTo({ top: 0 });
    this.history.push(path);
  }
}

export const routerStore = new RouterStore();
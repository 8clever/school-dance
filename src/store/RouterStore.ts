import {} from "mobx";
import { createBrowserHistory } from "history";

class RouterStore {
  history = createBrowserHistory();

  push = (path: string) => {
    window.scrollTo({ top: 0 });
    this.history.push(path);
  }
}

export const routerStore = new RouterStore();
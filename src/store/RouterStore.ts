import {} from "mobx";
import { createBrowserHistory } from "history";

class RouterStore {
  history = createBrowserHistory();
}

export const routerStore = new RouterStore();
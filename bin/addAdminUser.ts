import "../server/common/env";
import { mongo } from "../server/common/db";
import { userService } from "../server/api/services/user.service";

(async () => {
  await mongo.connect();
  await userService.editUser({
    login: "admin",
    password: "123456",
    role: "ADMIN"
  });
  console.log("done")
})().catch(console.log);
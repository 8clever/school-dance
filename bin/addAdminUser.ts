import "../server/common/env";
import { mongo } from "../server/common/db";
import { userService } from "../server/api/services/user.service";

(async () => {
  await mongo.connect();
  await userService._remove({ login: "admin" })
  await userService.editUser({
    login: "admin",
    password: "123456",
    role: "ADMIN"
  });
  console.log("done")
  process.exit(0);
})().catch(console.log);
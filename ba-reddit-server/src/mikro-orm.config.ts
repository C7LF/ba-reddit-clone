import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations, absolute path with dirname.
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files for both js and ts
  },
  entities: [Post],
  dbName: "ba-reddit",
  type: "postgresql",
  debug: !__prod__, // When not in production, set debug to true
} as Parameters<typeof MikroORM.init>[0];
// use MikroORM parameters to preserve type, allowing for suggested types (auto complete)

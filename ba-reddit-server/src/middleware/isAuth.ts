import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql/dist/interfaces/Middleware";

// Check if user is authenticated
export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("Not Authenticated");
  }

  // If user is authenticated move onto next call.
  return next();
};

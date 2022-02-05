import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    // No token (for example: createAccount, login)
    if (!token) {
      return null;
    }
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
    //console.log("decodedToken", decodedToken);
    const { id } = decodedToken;
    //console.log("id:", id);

    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

/*
export const protectedResolver = (user) => {
  if (!user) {
    throw Error("You need to login.");
};
*/

//functional programming
//ourResolver를 실행할 resolver
//protectedResolver는 graphQL resolver를 return하는 함수
//graphQL resolver는 root, args, context, info를 받음
//version 1
/*
export const protectedResolver =
  (ourResolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "You need to login.",
      };
    }
    return ourResolver(root, args, context, info);
  };
*/
//version 2
export function protectedResolver(ourResolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "You need to login.",
      };
    }
    return ourResolver(root, args, context, info);
  };
}

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

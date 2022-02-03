import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        // check if username or email are already on DB (username and email should be unique)
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        console.log(existingUser);
        if (existingUser) {
          throw new Error("This username or email is already taken.");
        }
        // hash password
        const saltRounds = 10;
        const uglyPassword = await bcrypt.hash(password, saltRounds);
        console.log(uglyPassword);

        // save and return the user
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
      } catch (error) {
        return error;
      }
    },
  },
};

import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { firstName, lastName, username, email, password: newPassword },
        //{ loggedInUser, protectedResolver } //context
        { loggedInUser } //context
      ) => {
        //console.log("editProfile");
        //console.log(firstName, lastName, username, email, newPassword, token);

        console.log("loggedInUser", loggedInUser);

        //protectedResolver(loggedInUser);

        // hash password
        let uglyPassword = null;
        if (newPassword) {
          const saltRounds = 10;
          uglyPassword = await bcrypt.hash(newPassword, saltRounds);
        }

        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            firstName,
            lastName,
            username,
            email,
            ...(uglyPassword && { password: uglyPassword }),
          },
        });
        console.log("updatedUser", updatedUser);
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update profile.",
          };
        }
      }
    ),
  },
};

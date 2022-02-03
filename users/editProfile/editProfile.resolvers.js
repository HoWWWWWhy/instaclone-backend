import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password: newPassword }
    ) => {
      console.log("editProfile");
      console.log(firstName, lastName, username, email, newPassword);

      // hash password
      let uglyPassword = null;
      if (newPassword) {
        const saltRounds = 10;
        uglyPassword = await bcrypt.hash(newPassword, saltRounds);
      }

      const updatedUser = await client.user.update({
        where: { id: 1 },
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
    },
  },
};

import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      const existingUser = await client.user.findUnique({
        where: { username },
      });

      if (!existingUser) {
        return {
          ok: false,
          error: "That user does not exist.",
        };
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            connect: {
              username, // Follow하는 User 속성 중 unique한 속성 선택
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};

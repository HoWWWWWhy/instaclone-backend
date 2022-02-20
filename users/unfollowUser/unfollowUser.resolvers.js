import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }, { loggedInUser }) => {
        const existingUser = await client.user.findUnique({
          where: { username },
        });

        if (!existingUser) {
          return {
            ok: false,
            error: "That user does not exist. Can't unfollow user.",
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: {
                username, // Follow하는 User 속성 중 unique한 속성 선택
              }, // disconnect 상태에서 또 disconnect 할 경우 오류
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

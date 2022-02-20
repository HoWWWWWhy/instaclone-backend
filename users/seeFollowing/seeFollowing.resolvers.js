import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      const existingUser = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      //console.log(existingUser);
      if (!existingUser) {
        return {
          ok: false,
          error: "That user does not exist. Can't see following.",
        };
      }

      const following = await client.user
        .findUnique({
          where: {
            username,
          },
        })
        .following({
          take: 3,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });

      return {
        ok: true,
        following,
      };
    },
  },
};

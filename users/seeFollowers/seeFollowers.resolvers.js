import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const existingUser = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      //console.log(existingUser);
      if (!existingUser) {
        return {
          ok: false,
          error: "That user does not exist. Can't see followers.",
        };
      }

      const followers = await client.user
        .findUnique({
          where: {
            username,
          },
        })
        .followers({
          take: 2,
          skip: (page - 1) * 2,
        });

      // 어떤 사람의 follower를 아는 방법은 그 사람을 follow 하고 있는 사람들의 수를 아는 것!
      const totalFollowers = await client.user.count({
        where: {
          following: {
            some: { username },
          },
        },
      });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 2),
      };

      //해당 user의 followers 리스트를 가져옴
      /*
      const aFollowers = await client.user
        .findUnique({
          where: {
            username,
          },
        })
        .followers();
      console.log("aFollowers:", aFollowers.length);
      */
      //another way: 전체 user 중 해당 user를 follow하고 있는 리스트를 가져옴
      /*
      const bFollowers = await client.user.findMany({
        where: {
          following: {
            some: {
              username,
            },
          },
        },
      });
      console.log("bFollowers:", bFollowers.length);
      */
    },
  },
};

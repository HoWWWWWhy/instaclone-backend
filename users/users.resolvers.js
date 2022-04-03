import client from "../client";

export default {
  User: {
    // user의 follower 리스트에 내가 존재하는 경우 count. 즉, 내가 몇 명을 follow 중인지 알 수 있음.
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: { id },
          },
        },
      }),
    // user의 following 리스트에 내가 존재하는 경우 count. 즉, 몇 명이 나를 follow 중인지 알 수 있음.
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: { id },
          },
        },
      }),

    isMe: ({ id }, _, { loggedInUser }) => {
      //console.log("id:", id);
      //console.log("args:", args);
      //console.log("context:", context);
      //   if (!loggedInUser) {
      //     return false;
      //   }
      //   return loggedInUser.id === id;

      //optional chaining
      return loggedInUser?.id === id;
    },

    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      //   const exists = await client.user
      //     .findUnique({
      //       where: { username: loggedInUser.username },
      //     })
      //     .following({
      //       where: {
      //         id,
      //       },
      //     });

      const exists = await client.user.count({
        where: {
          id,
          followers: {
            some: {
              username: loggedInUser.username,
            },
          },
        },
      });
      //console.log("exists:", exists);
      //return exists.length !== 0;
      return exists !== 0;
    },

    photos: ({ id }) => client.user.findUnique({ where: { id } }).photos(),
  },
};

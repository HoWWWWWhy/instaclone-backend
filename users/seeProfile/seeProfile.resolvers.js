import client from "../../client";

export default {
  Query: {
    seeProfile: (_, { username }) =>
      client.user.findUnique({
        where: {
          username,
        },
        //원하는 사용자 관계를 가져오기 위해 include를 사용할 수 있지만 관계가 너무 많아지는 경우에 비효율적
        // include: {
        //   following: true,
        //   followers: true,
        // },
      }),
  },
};

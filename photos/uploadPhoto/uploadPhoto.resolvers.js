import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = [];
        if (caption) {
          // parse caption (Regular expressions)
          const re = /#[\w+]+/g;
          const hashtags = caption.match(re);
          console.log(hashtags);
          hashtagObj = hashtags.map((hashtag) => ({
            where: {
              hashtag,
            },
            create: {
              hashtag,
            },
          }));
          console.log(hashtagObj);
        }
        // get or create Hashtags
        return client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });
        // save the photo with the parsed hashtags

        // add the photo to the hashtags
      }
    ),
  },
};

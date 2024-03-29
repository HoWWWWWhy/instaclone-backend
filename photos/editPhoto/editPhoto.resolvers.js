import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.util";

export default {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { loggedInUser }) => {
        //console.log(loggedInUser);
        const oldPhoto = await client.photo.findFirst({
          where: { id, userId: loggedInUser.id },
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });
        //console.log(oldPhoto);
        if (!oldPhoto) {
          return {
            ok: false,
            error: "Photo not found.",
          };
        }
        const photo = await client.photo.update({
          where: {
            id,
          },
          data: {
            caption,
            hashtags: {
              disconnect: oldPhoto.hashtags,
              connectOrCreate: processHashtags(caption),
            },
          },
        });
        //console.log(photo);

        return {
          ok: true,
        };
      }
    ),
  },
};

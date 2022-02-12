import { GraphQLUpload } from "graphql-tools";
import { createWriteStream } from "fs";
import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

export default {
  Upload: GraphQLUpload,

  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          firstName,
          lastName,
          username,
          email,
          password: newPassword,
          bio,
          avatar,
        },
        //{ loggedInUser, protectedResolver } //context
        { loggedInUser } //context
      ) => {
        //console.log("editProfile");
        //console.log(firstName, lastName, username, email, newPassword, token);

        console.log("loggedInUser", loggedInUser);

        //protectedResolver(loggedInUser);
        let avatarURL = null;
        if (avatar) {
          //File Upload: save a file in server temporarily
          //console.log("avatar:", avatar);
          const { filename, createReadStream } = await avatar;
          const savedFileName = `${loggedInUser.id}-${Date.now()}-${filename}`;

          console.log("filename:", filename);
          //console.log("createReadStream:", createReadStream);
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            process.cwd() + "/uploads/" + savedFileName
          );
          readStream.pipe(writeStream);
          //console.log("readStream:", readStream);
          avatarURL = `http://localhost:4000/static/${savedFileName}`;
        }

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
            bio,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatarURL && { avatar: avatarURL }),
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

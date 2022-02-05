require("dotenv").config();
import { ApolloServer } from "apollo-server";
//import schema from "./schema";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";

/* #4.14 File Upload part One
Upload scalar type 사용을 위해 ApolloServer에 makeExecutableSchema로 직접 만든 schema 대신
typeDefs와 resolvers를 넣어주면 Apollo Server에서 schema를 직접 만들어 제공한다.
*/
const server = new ApolloServer({
  //schema,
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    //console.log(req.headers);
    return {
      //token: req.headers.token,
      loggedInUser: await getUser(req.headers.token),
      protectResolver,
    };
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`server is running on http://localhost:${PORT}/`));

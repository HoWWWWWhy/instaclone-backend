require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
//import { graphqlUploadExpress } from "graphql-tools";
//import schema from "./schema";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";

/* #4.14 File Upload part One
Upload scalar type 사용을 위해 ApolloServer에 makeExecutableSchema로 직접 만든 schema 대신
typeDefs와 resolvers를 넣어주면 Apollo Server에서 schema를 직접 만들어 제공한다.
*/
const PORT = process.env.PORT;
async function startApolloServer(typeDefs, resolvers) {
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

  const app = express();
  app.use(logger("tiny"));
  //app.use(graphqlUploadExpress());
  // This middleware should be added before calling `applyMiddleware`.
  await server.start();
  server.applyMiddleware({ app }); //Apollo Server야. 너 이제부터 우리 app server랑 같이 작동해.
  await new Promise((resolve) => app.listen({ port: PORT }, resolve));

  console.log(`server is running on http://localhost:${PORT}/graphql`);
  // server.listen({ port: PORT }, () => {
  //   console.log(`server is running on http://localhost:${PORT}/`);
  // });
}

startApolloServer(typeDefs, resolvers);

// import { loadFilesSync } from "@graphql-tools/load-files";
// import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

import {
  loadFilesSync,
  mergeTypeDefs,
  mergeResolvers,
  //makeExecutableSchema,
} from "graphql-tools";

// loadFilesSync는 export default를 가져옴
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

//const schema = makeExecutableSchema({ typeDefs, resolvers });

//export default schema;
export { typeDefs, resolvers };

import {ApolloServer, gql} from "apollo-server";

const typeDefs = gql`
    type Movie {
        title: String
        year: Int
    }
    type Query {
        movies: [Movie]
        movie: Movie
    }
    type Mutation {
        createMovie: Boolean
        deleteMovie: Boolean
    }
`;

const resolvers = {
    Query: {
        movies: () => [],
        movie: () => ({title: "Hello", year: 2021})
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});


server
.listen()
.then(() => console.log("Server is running on http://localhost:4000/"));
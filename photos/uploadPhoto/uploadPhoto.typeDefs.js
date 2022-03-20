import { gql } from "apollo-server";

export default gql`
  scalar Upload

  type Mutation {
    uploadPhoto(file: String!, caption: String): Photo
  }
`;

// temporarily change type of file for test: Upload to String
// uploadPhoto(file: Upload!, caption: String): Photo!

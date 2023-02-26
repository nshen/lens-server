import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import publicationQuery from "./queries/publication";

const client = new ApolloClient({
  uri: "https://api.lens.dev",
  cache: new InMemoryCache(),
});

export async function getPublicationFields(id: string) {
  return client.query({
    query: publicationQuery,
    variables: {
      id: id,
    },
  });
}

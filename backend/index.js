const { ApolloServer, gql } = require("apollo-server");
const data = require("./data");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Term {
    term: String
    description: String
    tags: [Tag]
  }

  type Tag {
    id: ID
    title: String
    terms: [Term]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getTerms(search: String, tags: [ID]): [Term]
    getTags: [Tag]
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getTerms: (parent, { search, tags }) => {
      const tagsWeWant = tags;

      let filteredByTag = data.terms;
      if (tagsWeWant.length) {
        filteredByTag = data.terms.filter(({ tags }) =>
          tags.some(tag => tagsWeWant.includes(tag))
        );
      }

      const needle = search.toLowerCase();
      return filteredByTag.filter(
        ({ term, description }) =>
          term.toLowerCase().includes(needle) ||
          description.toLowerCase().includes(needle)
      );
    },
    getTags: () => data.tags
  },

  // When querying for a 'Term' provide the associated 'Tags' in full, even though we only store the tag id
  Term: {
    tags(term) {
      return data.tags.filter(({ id }) => term.tags.includes(id));
    }
  },

  // When query a 'Tag' provide a list of terms that have that tag
  Tag: {
    terms(tag) {
      const tagId = tag.id;
      return data.terms.filter(({ tags }) => tags.includes(tagId));
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

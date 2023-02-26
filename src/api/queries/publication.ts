import { gql } from "@apollo/client/core";

const query = gql`
  query Publication($id: InternalPublicationId!) {
    publication(request: { publicationId: $id }) {
      __typename
      ... on Post {
        ...PostFields
      }
      ... on Comment {
        ...CommentFields
      }
      ... on Mirror {
        ...MirrorFields
      }
    }
  }

  fragment PublicationStatsFields on PublicationStats {
    totalUpvotes
    totalAmountOfMirrors
    totalAmountOfCollects
    totalAmountOfComments
  }

  fragment PostFields on Post {
    id
    stats {
      ...PublicationStatsFields
    }
  }

  fragment MirrorBaseFields on Mirror {
    id
  }

  fragment MirrorFields on Mirror {
    ...MirrorBaseFields
    mirrorOf {
      ... on Post {
        ...PostFields
      }
      ... on Comment {
        ...CommentFields
      }
    }
  }

  fragment CommentBaseFields on Comment {
    id
    stats {
      ...PublicationStatsFields
    }
  }

  fragment CommentFields on Comment {
    ...CommentBaseFields
    mainPost {
      ... on Post {
        ...PostFields
      }
      ... on Mirror {
        ...MirrorBaseFields
        mirrorOf {
          ... on Post {
            ...PostFields
          }
          ... on Comment {
            ...CommentMirrorOfFields
          }
        }
      }
    }
  }

  fragment CommentMirrorOfFields on Comment {
    ...CommentBaseFields
    mainPost {
      ... on Post {
        ...PostFields
      }
      ... on Mirror {
        ...MirrorBaseFields
      }
    }
  }
`;

export default query;

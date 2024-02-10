import { createYoga } from 'graphql-yoga';
import { schema } from '../../graphql/schema';

const { handleRequest } = createYoga({
  fetchAPI: {
    Request: Request,
    Response: Response,
  },
  schema,
  graphqlEndpoint: '/api/graphql',
});

export default handleRequest;

// import { createYoga } from 'graphql-yoga';
// import { schema } from '../../graphql/schema';

// const { handleRequest } = createYoga({
//   fetchAPI: {
//     Request: Request,
//     Response: Response,
//   },
//   schema,
//   graphqlEndpoint: '/api/graphql',
// });

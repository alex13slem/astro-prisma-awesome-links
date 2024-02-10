// export const typeDefs = `
//   type Link {
//     id: ID
//     title: String
//     url: String
//     description: String
//     imageUrl: String
//     category: String
//     users: [String]
//   }

//   type Query {
//     links: [Link]!
//   }
//  `;

import { builder } from './builder';
import './types/Link';
import './types/User';

export const schema = builder.toSchema();

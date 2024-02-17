import prisma from '../lib/prismaClient';

export const resolvers = {
  Query: {
    links: () => prisma.link.findMany(),
    users: () => prisma.user.findMany(),
  },
};

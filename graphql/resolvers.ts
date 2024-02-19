import prisma from '../src/lib/prismaClient';

export const resolvers = {
  Query: {
    links: () => prisma.link.findMany(),
    users: () => prisma.user.findMany(),
  },
};

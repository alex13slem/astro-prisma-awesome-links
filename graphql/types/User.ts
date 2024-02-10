import prisma from '../../lib/prismaClient';
import { builder } from '../builder';

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email', { nullable: true }),
    image: t.exposeString('image', { nullable: true }),
    role: t.expose('role', { type: Role }),
    bookmarks: t.relation('bookmarks'),
  }),
});

const Role = builder.enumType('Role', {
  values: ['USER', 'ADMIN'] as const,
});

builder.queryField('users', (t) =>
  t.prismaField({
    type: ['User'],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.user.findMany({ ...query }),
  })
);

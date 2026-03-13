import bcrypt from 'bcryptjs';

import { type PrismaClient } from '@/prisma/generated/client';

export default async function seedUsers(prisma: PrismaClient): Promise<Users> {
  const alice = await prisma.user.create({
    data: {
      id: '1',
      email: 'alice@example.com',
      username: 'alice',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Alice Alto',
      dietaryPreferences: 'Vegetarian',
    },
  });

  const bob = await prisma.user.create({
    data: {
      id: '2',
      email: 'bob@example.com',
      username: 'bob',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Bob Bass',
    },
  });

  const charles = await prisma.user.create({
    data: {
      id: '3',
      email: 'charles@example.com',
      username: 'charles',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Charles Capo',
    },
  });

  const diana = await prisma.user.create({
    data: {
      id: '4',
      email: 'diana@example.com',
      username: 'diana',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Diana Diva',
      dietaryPreferences: 'Vegan',
    },
  });

  const evan = await prisma.user.create({
    data: {
      id: '5',
      email: 'evan@example.com',
      username: 'evan',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Evan Echo',
    },
  });

  const fred = await prisma.user.create({
    data: {
      id: '6',
      email: 'fred@example.com',
      username: 'fred',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Fred Fermata',
    },
  });

  const george = await prisma.user.create({
    data: {
      id: '7',
      email: 'george@example.com',
      username: 'george',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'George Guitar',
    },
  });

  const helen = await prisma.user.create({
    data: {
      id: '8',
      email: 'helen@example.com',
      username: 'helen',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Helen Harmony',
      dietaryPreferences: 'Gluten-Free',
    },
  });

  const liam = await prisma.user.create({
    data: {
      id: '9',
      email: 'liam@example.com',
      username: 'liam',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Liam Lyric',
    },
  });

  const lucas = await prisma.user.create({
    data: {
      id: '10',
      email: 'lucas@example.com',
      username: 'lucas',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Lucas Lyric',
    },
  });

  const isak = await prisma.user.create({
    data: {
      id: '11',
      email: 'isak@example.com',
      username: 'isak',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Isak Inspiration',
    },
  });

  const elin = await prisma.user.create({
    data: {
      id: '12',
      email: 'elin@example.com',
      username: 'elin',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Elin Elegance',
    },
  });

  const ellen = await prisma.user.create({
    data: {
      id: '13',
      email: 'ellen@example.com',
      username: 'ellen',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Ellen Elegance',
    },
  });

  const elinor = await prisma.user.create({
    data: {
      id: '14',
      email: 'elinor@example.com',
      username: 'elinor',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Elinor Elegance',
    },
  });

  const ingrid = await prisma.user.create({
    data: {
      id: '15',
      email: 'ingrid@example.com',
      username: 'ingrid',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Ingrid Inspiration',
    },
  });

  const vera = await prisma.user.create({
    data: {
      id: '16',
      email: 'vera@example.com',
      username: 'vera',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Vera Vocal',
    },
  });

  const hilding = await prisma.user.create({
    data: {
      id: '17',
      email: 'hilding@example.com',
      username: 'hilding',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Hilding Harmony',
    },
  });

  const felix = await prisma.user.create({
    data: {
      id: '18',
      email: 'felix@example.com',
      username: 'felix',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Felix Forte',
    },
  });

  const linn = await prisma.user.create({
    data: {
      id: '19',
      email: 'linn@example.com',
      username: 'linn',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Linn Lyric',
    },
  });

  const thore = await prisma.user.create({
    data: {
      id: '20',
      email: 'thore@example.com',
      username: 'thore',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Thore Tenor',
    },
  });

  const rebekka = await prisma.user.create({
    data: {
      id: '21',
      email: 'rebekka@example.com',
      username: 'rebekka',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Rebekka Rhapsody',
    },
  });

  const robert = await prisma.user.create({
    data: {
      id: '22',
      email: 'robert@example.com',
      username: 'robert',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Robert Rhapsody',
    },
  });

  const julia = await prisma.user.create({
    data: {
      id: '23',
      email: 'julia@example.com',
      username: 'julia',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Julia Jazz',
    },
  });

  const mathias = await prisma.user.create({
    data: {
      id: '24',
      email: 'mathias@example.com',
      username: 'mathias',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Mathias Melody',
    },
  });

  const elisabeth = await prisma.user.create({
    data: {
      id: '25',
      email: 'elisabeth@example.com',
      username: 'elisabeth',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Elisabeth Elegance',
    },
  });

  const maria = await prisma.user.create({
    data: {
      id: '26',
      email: 'maria@example.com',
      username: 'maria',
      passwordHash: await bcrypt.hash('password', 10),
      name: 'Maria Melody',
    },
  });

  return {
    alice,
    bob,
    charles,
    diana,
    evan,
    fred,
    george,
    helen,
    liam,
    lucas,
    isak,
    elin,
    ellen,
    elinor,
    ingrid,
    hilding,
    vera,
    felix,
    linn,
    thore,
    rebekka,
    robert,
    julia,
    mathias,
    elisabeth,
    maria,
  };
}

export interface Users {
  alice: { id: string };
  bob: { id: string };
  charles: { id: string };
  diana: { id: string };
  evan: { id: string };
  fred: { id: string };
  george: { id: string };
  helen: { id: string };

  liam: { id: string };
  lucas: { id: string };
  isak: { id: string };
  elin: { id: string };
  ellen: { id: string };
  elinor: { id: string };
  vera: { id: string };
  ingrid: { id: string };

  hilding: { id: string };
  felix: { id: string };
  linn: { id: string };
  thore: { id: string };
  rebekka: { id: string };
  robert: { id: string };
  julia: { id: string };

  mathias: { id: string };
  elisabeth: { id: string };
  maria: { id: string };
}

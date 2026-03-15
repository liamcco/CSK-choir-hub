import bcrypt from 'bcryptjs';

import { type PrismaClient } from '@/prisma/generated/client';

export default async function seedUsers(prisma: PrismaClient): Promise<Users> {
  const alice = await prisma.user.create({
    data: {
      id: '1',
      email: 'alice@example.com',
      name: 'Alice Alto',
      dietaryPreferences: 'Vegetarian',
    },
  });

  const bob = await prisma.user.create({
    data: {
      id: '2',
      email: 'bob@example.com',
      name: 'Bob Bass',
    },
  });

  const charles = await prisma.user.create({
    data: {
      id: '3',
      email: 'charles@example.com',
      name: 'Charles Capo',
    },
  });

  const diana = await prisma.user.create({
    data: {
      id: '4',
      email: 'diana@example.com',
      name: 'Diana Diva',
      dietaryPreferences: 'Vegan',
    },
  });

  const evan = await prisma.user.create({
    data: {
      id: '5',
      email: 'evan@example.com',
      name: 'Evan Echo',
    },
  });

  const fred = await prisma.user.create({
    data: {
      id: '6',
      email: 'fred@example.com',
      name: 'Fred Fermata',
    },
  });

  const george = await prisma.user.create({
    data: {
      id: '7',
      email: 'george@example.com',
      name: 'George Guitar',
    },
  });

  const helen = await prisma.user.create({
    data: {
      id: '8',
      email: 'helen@example.com',
      name: 'Helen Harmony',
      dietaryPreferences: 'Gluten-Free',
    },
  });

  const liam = await prisma.user.create({
    data: {
      id: '9',
      email: 'liam@example.com',
      name: 'Liam Lyric',
    },
  });

  const lucas = await prisma.user.create({
    data: {
      id: '10',
      email: 'lucas@example.com',
      name: 'Lucas Lyric',
    },
  });

  const isak = await prisma.user.create({
    data: {
      id: '11',
      email: 'isak@example.com',
      name: 'Isak Inspiration',
    },
  });

  const elin = await prisma.user.create({
    data: {
      id: '12',
      email: 'elin@example.com',
      name: 'Elin Elegance',
    },
  });

  const ellen = await prisma.user.create({
    data: {
      id: '13',
      email: 'ellen@example.com',
      name: 'Ellen Elegance',
    },
  });

  const elinor = await prisma.user.create({
    data: {
      id: '14',
      email: 'elinor@example.com',
      name: 'Elinor Elegance',
    },
  });

  const ingrid = await prisma.user.create({
    data: {
      id: '15',
      email: 'ingrid@example.com',
      name: 'Ingrid Inspiration',
    },
  });

  const vera = await prisma.user.create({
    data: {
      id: '16',
      email: 'vera@example.com',
      name: 'Vera Vocal',
    },
  });

  const hilding = await prisma.user.create({
    data: {
      id: '17',
      email: 'hilding@example.com',
      name: 'Hilding Harmony',
    },
  });

  const felix = await prisma.user.create({
    data: {
      id: '18',
      email: 'felix@example.com',
      name: 'Felix Forte',
    },
  });

  const linn = await prisma.user.create({
    data: {
      id: '19',
      email: 'linn@example.com',
      name: 'Linn Lyric',
    },
  });

  const thore = await prisma.user.create({
    data: {
      id: '20',
      email: 'thore@example.com',
      name: 'Thore Tenor',
    },
  });

  const rebekka = await prisma.user.create({
    data: {
      id: '21',
      email: 'rebekka@example.com',
      name: 'Rebekka Rhapsody',
    },
  });

  const robert = await prisma.user.create({
    data: {
      id: '22',
      email: 'robert@example.com',
      name: 'Robert Rhapsody',
    },
  });

  const julia = await prisma.user.create({
    data: {
      id: '23',
      email: 'julia@example.com',
      name: 'Julia Jazz',
    },
  });

  const mathias = await prisma.user.create({
    data: {
      id: '24',
      email: 'mathias@example.com',
      name: 'Mathias Melody',
    },
  });

  const elisabeth = await prisma.user.create({
    data: {
      id: '25',
      email: 'elisabeth@example.com',
      name: 'Elisabeth Elegance',
    },
  });

  const maria = await prisma.user.create({
    data: {
      id: '26',
      email: 'maria@example.com',
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

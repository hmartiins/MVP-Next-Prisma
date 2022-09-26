import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/primsa';

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const { title } = req.body;

  await prisma.task.create({
    data: {
      isDone: false,
      title,
    }
  });

  return res.status(201).json({});
}
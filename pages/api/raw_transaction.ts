// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import withPagination from '../../lib/withPagination'

async function handler( req: NextApiRequest, res: NextApiResponse ) {
  const transactions = await req.paginate(prisma.raw_transaction, {})
  res.status(200).json(transactions)
}

export default withPagination(handler)

import type { NextApiRequest, NextApiResponse } from 'next'
import type { PaginateFunction } from 'prisma-pagination'
import { createPaginator } from 'prisma-pagination'

type RequestHandler = (req: NextApiRequest, res: NextApiResponse) => any;

declare module 'next' {
  export interface NextApiRequest {
    paginate: PaginateFunction
  }
}


const withPagination = (handler: RequestHandler) => {
  return (req: NextApiRequest, res: NextApiResponse): RequestHandler => {
    const page = Number(req.query.page) || 1
    const perPage = Number(req.query.per_page) || 10
    req.paginate = createPaginator({ page, perPage })
    return handler(req, res);
  };
};

export default withPagination;

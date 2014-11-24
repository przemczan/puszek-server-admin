<?php

namespace Puszek\PuszekAdmin\AdminBundle\Repository;

use Knp\Component\Pager\Pagination\PaginationInterface;
use Symfony\Component\HttpFoundation\Request;

class MessageRepository extends AbstractRepository
{
    /**
     * @param Request $request
     * @return PaginationInterface
     */
    public function restFindAll(Request $request)
    {
        return $this->restifyPagination($this->knpPaginator->paginate(
            $this->repository->createQueryBuilder('message')->sort('createdAt', 'desc')->getQuery(),
            $request->query->get('page', 1),
            20
        ));
    }

    /**
     * @param $id
     * @return null|object
     */
    public function find($id)
    {
        return $this->repository->find($id);
    }
}
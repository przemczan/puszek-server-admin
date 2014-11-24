<?php

namespace Puszek\PuszekAdmin\AdminBundle\Repository;

use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ORM\EntityRepository;
use Knp\Bundle\PaginatorBundle\Pagination\SlidingPagination;
use Knp\Component\Pager\Paginator;

abstract class AbstractRepository
{
    /**
     * @var EntityRepository
     */
    protected $repository;

    /**
     * @var string
     */
    private $entityClass;

    /**
     * @var DocumentManager
     */
    protected $dm;

    /**
     * @var Paginator
     */
    protected $knpPaginator;

    /**
     * @param DocumentManager $dm
     * @param Paginator $knpPaginator
     * @param $entityClass
     */
    public function __construct(DocumentManager $dm, Paginator $knpPaginator, $entityClass)
    {
        $this->dm = $dm;
        $this->entityClass = $entityClass;
        $this->repository = $dm->getRepository($entityClass);
        $this->knpPaginator = $knpPaginator;
    }

    /**
     * @return EntityRepository
     */
    public function getRepository()
    {
        return $this->repository;
    }

    /**
     * @return DocumentManager
     */
    public function getDm()
    {
        return $this->dm;
    }

    /**
     * @return Paginator
     */
    public function getPaginator()
    {
        return $this->knpPaginator;
    }

    /**
     * @param SlidingPagination $pagination
     * @return array
     */
    public function restifyPagination(SlidingPagination $pagination)
    {
        return [
            'meta' => [
                'page_number' => $pagination->getCurrentPageNumber(),
                'items_per_page' => $pagination->getItemNumberPerPage(),
                'total_count' => $pagination->getTotalItemCount(),
                'params' => [
                    'page' => $pagination->getCurrentPageNumber(),
                ],
            ],
            'items' => $pagination->getItems()
        ];
    }
}
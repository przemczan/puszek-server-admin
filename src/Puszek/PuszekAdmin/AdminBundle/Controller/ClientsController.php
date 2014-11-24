<?php

namespace Puszek\PuszekAdmin\AdminBundle\Controller;

use Doctrine\ORM\EntityRepository;
use Puszek\PuszekAdmin\AdminBundle\Document\Client;
use Puszek\PuszekAdmin\AdminBundle\Form\Type\ClientType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as Extra;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ClientsController extends AbstractController
{
    /**
     * @var EntityRepository
     */
    protected $repository;

    /**
     * @var EntityManager
     */
    protected $em;


    /**
     * @param ContainerInterface $container
     */
    public function setContainer(ContainerInterface $container = null)
    {
        parent::setContainer($container);
        $this->em = $this->get('doctrine_mongodb')->getManager();
        $this->repository = $this->get('puszek.repository.client');
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function getClientsAction(Request $request)
    {
        return $this->restify($this->repository->restFindAll($request));
    }

    /**
     * @param $slug
     * @return Response
     */
    public function deleteClientsAction($slug)
    {
        $client = $this->repository->find($slug);
        if ($client) {
            $this->em->remove($client);
            $this->em->flush();
        }

        return new Response();
    }

    /**
     * @return Response
     */
    public function postClientsAction(Request $request)
    {
        $form = $this->createForm(new ClientType());
        $form->handleRequest($request);

        if ($form->isValid()) {
            $client = $form->getData();
            $client->setPrivateKey(sha1(microtime() . rand(1, 999999999)));
            $this->em->persist($client);
            $this->em->flush();

            return $this->restify($client);
        }

        return new Response($form->getErrors(), 500);
    }

    /**
     * @param Request $request
     * @param $slug
     * @return Response
     */
    public function putClientsAction(Request $request, $slug)
    {
        $client = $this->repository->find($slug);
        if (!$client instanceof Client) {
            return new Response('Resource not found', 500);

        }

        $request->setMethod('POST');
        $form = $this->createForm(new ClientType(), $client);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $client = $form->getData();
            $this->em->persist($client);
            $this->em->flush();

            return $this->restify($client);
        }

        return $this->restify($form->getErrors(true), null, 500);
    }
}

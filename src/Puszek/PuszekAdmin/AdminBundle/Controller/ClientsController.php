<?php

namespace Puszek\PuszekAdmin\AdminBundle\Controller;

use Doctrine\ORM\EntityRepository;
use Puszek\PuszekAdmin\AdminBundle\Document\Client;
use Puszek\PuszekAdmin\AdminBundle\Form\Type\ClientType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
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
        $this->repository = $this->em->getRepository('Puszek\PuszekAdmin\AdminBundle\Document\Client');
    }

    /**
     * @Extra\Template
     */
    public function indexAction()
    {
        $em = $this->get('doctrine_mongodb')->getManager();
        $repository = $em->getRepository('Puszek\PuszekAdmin\AdminBundle\Document\Client');
        $clientsList = $repository->findAll();

        return [
            'clientsList' => $clientsList
        ];
    }

    /**
     * @Extra\Template
     */
    public function createAction(Request $request)
    {
        $em = $this->get('doctrine_mongodb')->getManager();
        $form = $this->createForm(new ClientType());

        if ($request->isMethod('post')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $em->persist($form->getData());
                $em->flush();

                return $this->redirect($this->generateUrl('puszek_admin_homepage'));
            }
        }

        return [
            'form' => $form->createView()
        ];
    }

    /**
     * @param Request $request
     * @param Client $client
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Extra\Template
     */
    public function editAction(Request $request, Client $client)
    {
        $em = $this->get('doctrine_mongodb')->getManager();
        $form = $this->createForm(new ClientType(), $client);

        if ($request->isMethod('post')) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $em->persist($form->getData());
                $em->flush();

                return $this->redirect($this->generateUrl('puszek_admin_homepage'));
            }
        }

        return [
            'form' => $form->createView()
        ];
    }

    /**
     * @Extra\Template
     */
    public function deleteAction(Request $request, Client $client)
    {
        $em = $this->get('doctrine_mongodb')->getManager();
        $em->remove($client);
        $em->flush();

        return $this->redirect($this->generateUrl('puszek_admin_homepage'));
    }

    /**
     * @return Response
     */
    public function getClientsAction()
    {
        return $this->restify($this->repository->findAll());
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

        return new Response($form->getErrors());
    }
}

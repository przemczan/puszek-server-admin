<?php

namespace Puszek\PuszekAdmin\AdminBundle\Controller;

use Przemczan\PuszekSdkBundle\Service\API;
use Przemczan\PuszekSdkBundle\Service\SocketHelper;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as Extra;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MessagesController extends AbstractController
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
        $this->repository = $this->get('puszek.repository.message');
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function sendAction(Request $request)
    {
        /** @var API $api */
        $api = $this->get('przemczan_puszek_sdk.api');
        $receivers = $request->request->get('receivers');
        $receivers = is_array($receivers) ? $receivers : explode(',', $receivers);
        $receivers[] = $this->getUser()->getUsername();

        $response = $api->sendMessage(
            $request->request->get('sender'),
            $request->request->get('message'),
            $receivers
        );

        return $this->restify($response);
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function getMessagesAction(Request $request)
    {
        return $this->restify($this->repository->restFindAll($request));
    }
}

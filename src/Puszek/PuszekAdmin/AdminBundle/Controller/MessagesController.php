<?php

namespace Puszek\PuszekAdmin\AdminBundle\Controller;

use Doctrine\ORM\EntityRepository;
use Przemczan\PuszekSdkBundle\Service\API;
use Puszek\PuszekAdmin\AdminBundle\Document\Client;
use Puszek\PuszekAdmin\AdminBundle\Form\Type\ClientType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as Extra;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MessagesController extends AbstractController
{
    /**
     * @param Request $request
     * @return Response
     */
    public function sendAction(Request $request)
    {
        /** @var API $api */
        $api = $this->get('przemczan_puszek_sdk.api');
        $response = $api->sendMessage(
            $request->request->get('sender'),
            $request->request->get('message'),
            array_map('trim', explode(',', $request->request->get('receivers')))
        );

        return $this->restify($response);
    }
}

<?php

namespace Puszek\PuszekAdmin\AdminBundle\Controller;

use Przemczan\PuszekSdkBundle\Service\API;
use Przemczan\PuszekSdkBundle\Service\SocketHelper;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as Extra;
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
        $receivers = $request->request->get('receivers');
        $receivers = is_array($receivers) ? $receivers : explode(',', $receivers);
        $receivers[] = 'admin';

        $response = $api->sendMessage(
            $request->request->get('sender'),
            $request->request->get('message'),
            $receivers
        );

        return $this->restify($response);
    }
}

<?php

namespace Puszek\PuszekAdmin\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as Extra;

class DashboardController extends Controller
{
    /**
     * @Extra\Template
     */
    public function indexAction()
    {
        //var_dump($this->get('przemczan_puszek_sdk.api')->sendMessage('przemczan', 'message', ['test']));
        //var_dump($this->get('przemczan_puszek_sdk.socket_helper')->getSocketUrl('test', ['*', 'test'], 3600));
        return [
        ];
    }
}

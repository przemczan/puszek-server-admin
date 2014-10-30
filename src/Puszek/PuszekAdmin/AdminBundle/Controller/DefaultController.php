<?php

namespace Puszek\PuszekAdmin\AdminBundle\Controller;

use Puszek\PuszekAdmin\AdminBundle\Document\Client;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as Extra;

class DefaultController extends Controller
{
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
}

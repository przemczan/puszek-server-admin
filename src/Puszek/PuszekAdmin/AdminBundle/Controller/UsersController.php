<?php

namespace Puszek\PuszekAdmin\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as Extra;
use Symfony\Component\HttpFoundation\Response;

class UsersController extends Controller
{

    /**
     * @param $data
     * @param string $format
     * @return Response
     */
    protected function restify($data, $format = 'json')
    {
        return new Response($this->get('jms_serializer')->serialize($data, $format));
    }

    /**
     * @param $slug
     * @return Response
     */
    public function getUserAction($slug)
    {
        if ('me' === $slug) {
            return $this->restify($this->getUser());
        }

        return $this->restify(null);
    }
}

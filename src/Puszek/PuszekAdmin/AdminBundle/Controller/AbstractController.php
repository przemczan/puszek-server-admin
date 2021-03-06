<?php

namespace Puszek\PuszekAdmin\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as Extra;
use Symfony\Component\HttpFoundation\Response;

abstract class AbstractController extends Controller
{
    /**
     * @param $data
     * @param string $format
     * @param int $status
     * @return Response
     */
    protected function restify($data, $format = 'json', $status = 200)
    {
        return new Response($this->get('jms_serializer')->serialize($data, $format ?: 'json'), $status);
    }
}

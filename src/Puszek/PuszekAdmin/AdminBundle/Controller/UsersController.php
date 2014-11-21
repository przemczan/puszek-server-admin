<?php

namespace Puszek\PuszekAdmin\AdminBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration as Extra;
use Symfony\Component\HttpFoundation\Response;

class UsersController extends AbstractController
{
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

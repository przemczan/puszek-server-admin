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
        return [
        ];
    }
}

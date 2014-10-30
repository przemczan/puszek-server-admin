<?php

namespace Puszek\PuszekAdmin\AdminBundle\Controller;

use Puszek\PuszekAdmin\AdminBundle\Document\Client;
use Puszek\PuszekAdmin\AdminBundle\Form\Type\ClientType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as Extra;
use Symfony\Component\HttpFoundation\Request;

class ClientsController extends Controller
{
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

                return $this->redirect($this->generateUrl('puszek_puszek_admin_admin_homepage'));
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

        return $this->redirect($this->generateUrl('puszek_puszek_admin_admin_homepage'));
    }
}

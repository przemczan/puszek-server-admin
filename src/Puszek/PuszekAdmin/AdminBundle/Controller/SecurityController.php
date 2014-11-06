<?php

namespace Puszek\PuszekAdmin\AdminBundle\Controller;

use Puszek\PuszekAdmin\AdminBundle\Form\Type\LoginType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as Extra;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\SecurityContextInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class SecurityController extends AbstractController
{
    /**
     *
     */
    public function meAction(Request $request)
    {
        $data = false;

        if ($this->getUser() instanceof UserInterface) {
            $securityContext = $this->get('security.context');
            $data = [
                'user' => [
                    'fullName' => $this->getUser()->getUsername()
                ],
                'roles' => []
            ];
            if ($roles = $request->request->get('roles') and is_array($roles)) {
                foreach ($roles as $role) {
                    $data['roles'][$role] = $securityContext->isGranted((string)$role);
                }
            }
        }

        return $this->restify($data);
    }

    /**
     *
     */
    public function loginAction(Request $request)
    {
        $session = $request->getSession();

        // get the login error if there is one
        if ($request->attributes->has(SecurityContextInterface::AUTHENTICATION_ERROR)) {
            $error = $request->attributes->get(
                SecurityContextInterface::AUTHENTICATION_ERROR
            );
        } elseif (null !== $session && $session->has(SecurityContextInterface::AUTHENTICATION_ERROR)) {
            $error = $session->get(SecurityContextInterface::AUTHENTICATION_ERROR);
            $session->remove(SecurityContextInterface::AUTHENTICATION_ERROR);
        } else {
            $error = '';
        }

        // last username entered by the user
        $lastUsername = (null === $session) ? '' : $session->get(SecurityContextInterface::LAST_USERNAME);

        return $this->restify([
                'authenticated' => $this->getUser() instanceof UserInterface,
                'error'         => $error ? $error->getMessage() : '',
            ]);
    }
}

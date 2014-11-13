<?php

namespace Puszek\PuszekAdmin\AdminBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ClientType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->addEventListener(FormEvents::PRE_SET_DATA, function (FormEvent $event) {
                $client = $event->getData();
                $form = $event->getForm();
                $isNew = !$client or null === $client->getId();
                $form->add('id', null, ['mapped' => false]);
                $form->add('name', null, ['mapped' => $isNew]);
                $form->add('privateKey', null, ['mapped' => !$isNew]);
            }
        );
    }

    /**
     * {@inheritdoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults([
                'data_class' => 'Puszek\PuszekAdmin\AdminBundle\Document\Client',
                'csrf_protection' => false,
                'allow_extra_fields' => true,
                'ignore_extra_fields' => true,
            ]);
    }

    /**
     * Returns the name of this type.
     *
     * @return string The name of this type
     */
    public function getName()
    {
        return '';
    }
}

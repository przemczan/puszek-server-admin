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
        $builder
            ->add('id')
            //->add('name')
            //->add('privateKey')
        ;

        $builder->addEventListener(FormEvents::PRE_SET_DATA, function (FormEvent $event) {
            $client = $event->getData();
            $form = $event->getForm();

            if (!$client or null === $client->getId()) {
                $form->add('name');
                //$form->remove('privateKey');
            } else {
                $form->add('privateKey');
                //$form->remove('name');
            }
        });
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

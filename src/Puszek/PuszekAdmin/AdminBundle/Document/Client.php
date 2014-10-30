<?php

namespace Puszek\PuszekAdmin\AdminBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\Document
 */
class Client
{
    /**
     * @MongoDB\Id
     */
    protected $id;

    /**
     * @MongoDB\String
     * @MongoDB\UniqueIndex
     */
    protected $name;

    /**
     * @MongoDB\String
     */
    protected $privateKey;

    /**
     * Get id
     *
     * @return id $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return self
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Get name
     *
     * @return string $name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set privateKey
     *
     * @param string $privateKey
     * @return self
     */
    public function setPrivateKey($privateKey)
    {
        $this->privateKey = $privateKey;
        return $this;
    }

    /**
     * Get privateKey
     *
     * @return string $privateKey
     */
    public function getPrivateKey()
    {
        return $this->privateKey;
    }
}

<?php

use Simp\Pindrop\Services\ServiceProvider;

require 'vendor/autoload.php';

$serviceProvider = new ServiceProvider();
$container = $serviceProvider->buildContainer();

$container->get('plugin.services.register');

function getAppContainer(): \DI\Container
{
    global $container;
    return $container;
}
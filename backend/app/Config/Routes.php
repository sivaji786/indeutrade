<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->get('/', 'Home::index');

$routes->group('api', function($routes) {
    $routes->post('login', 'AuthController::login');
    $routes->options('login', function() {});
    $routes->get('tariffs/categories', 'Tariff::categories');
    $routes->get('tariff/(:num)/ai-intelligence', 'Tariff::aiIntelligence/$1');
    $routes->resource('tariffs', ['controller' => 'Tariff']);
    $routes->resource('users', ['controller' => 'UserController']);
    $routes->resource('sync', ['controller' => 'SyncController']);

    // FTA Intelligence
    $routes->get('fta/roadmaps', 'Fta::roadmaps');
    $routes->get('fta/corridors', 'Fta::corridors');
    $routes->put('fta/roadmaps/(:num)', 'Fta::updateRoadmap/$1');
    $routes->put('fta/corridors/(:num)', 'Fta::updateCorridor/$1');

    // Regulatory Intelligence
    $routes->get('regulations/matrix', 'Regulation::matrix');
    $routes->get('regulations/alerts', 'Regulation::alerts');
    $routes->put('regulations/matrix/(:num)', 'Regulation::updateMatrix/$1');
    $routes->put('regulations/alerts/(:num)', 'Regulation::updateAlert/$1');

    // Analytics Intelligence
    $routes->get('analytics/corridor-performance', 'Analytics::corridorPerformance');
    $routes->get('analytics/sector-distribution', 'Analytics::sectorDistribution');
    $routes->get('analytics/trade-flows', 'Analytics::tradeFlows');

    // Enterprise Maturity
    $routes->get('alerts', 'AlertController::index');
    $routes->put('alerts/(:num)/read', 'AlertController::markRead/$1');
    $routes->get('audit/logs', 'AuditLogController::index');

    // Wiki Module (Admin)
    $routes->group('admin/wiki', function($routes) {
        $routes->get('/', 'Admin\Wiki::index');
        $routes->get('(:segment)', 'Admin\Wiki::show/$1');
    });
});

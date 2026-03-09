<?php

namespace Simp\Pindrop\Modules\streamer_frontend\src\Controller;

use DI\Container;
use DI\DependencyException;
use DI\NotFoundException;
use Simp\Pindrop\Controller\ControllerBase;
use Simp\Pindrop\Database\DatabaseException;
use Simp\Pindrop\Modules\streamer\src\Plugin\Movie;
use Simp\Pindrop\Modules\streamer\src\Plugin\Playlist;
use Simp\Pindrop\Modules\streamer\src\Plugin\Show;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class FrontendController extends ControllerBase
{
    public function __construct(protected Movie $movie, protected Show $show, protected Playlist $playlist)
    {
        parent::__construct();
    }

    /**
     * @throws NotFoundException
     * @throws DependencyException
     */
    public static function create(Container $container): static
    {
        return new self(
            $container->get('streamer.movie'),
            $container->get('streamer.show'),
            $container->get('streamer.playlist')
        );
    }

    /**
     * @throws DatabaseException
     */
    public function homepage(Request $request, string $route_name, $options): Response
    {
        $ipAddress = $request->getClientIp();
        $randomFeatured = $this->movie->getRandomFeaturedMovie(1);
        $playingMovies = $this->movie->getMoviePlaying(12, $ipAddress);
        $playingMovies = streamer_frontend_resolve_records($playingMovies);
        $playingNow = $this->movie->getMoviePlayingNow(12);
        $playingNow = streamer_frontend_resolve_records($playingNow);
        $popularMovies = $this->movie->getMoviesLocally(['rating_min' => 6.8, 'limit' => 12])['movies'] ?? [];
        $popularShows = $this->show->getShowsLocally(['rating_min'=>6.8, 'limit'=>12])['shows'] ?? [];
        $newReleaseMovies = $this->movie->getMoviesLocally([
            'year_from'=> new \DateTime("now")->modify("-1 year")->format('Y-m-d'),
            'year_to'=> new \DateTime("now")->format('Y-m-d'),
            'limit'=>6
        ])['movies'] ?? [];
        $newReleaseShows = $this->show->getShowsLocally([
            'year_from'=> new \DateTime("now")->modify("-1 year")->format('Y-m-d'),
            'year_to'=> new \DateTime("now")->format('Y-m-d'),
            'limit'=>6
        ])['shows'] ?? [];

        //dump($newReleaseMovies, $newReleaseShows);

        if (!empty($randomFeatured)) {
            $randomFeatured = reset($randomFeatured);
            $randomFeatured['thumbnail_path'] = streamer_frontend_image_path_resolve($randomFeatured['thumbnail_path']);
            $randomFeatured['duration'] = streamer_frontend_format_minutes($randomFeatured['duration']);
        }

        foreach ($popularMovies as $k=>$popularMovie) {
            $popularMovies[$k]['thumbnail_path'] = streamer_frontend_image_path_resolve($popularMovie['thumbnail_path']);
            $popularMovies[$k]['duration'] = streamer_frontend_format_minutes($popularMovie['duration']);
        }

        foreach ($popularShows as $k=>$popularShow) {
            $popularShows[$k]['thumbnail_path'] = streamer_frontend_image_path_resolve($popularShow['thumbnail_path']);
        }

        foreach ($newReleaseMovies as $k=>$newReleaseMovie) {
            $newReleaseMovies[$k]['thumbnail_path'] = streamer_frontend_image_path_resolve($newReleaseMovie['thumbnail_path']);
        }

        foreach ($newReleaseShows as $k=>$newReleaseShow) {
            $newReleaseShows[$k]['thumbnail_path'] = streamer_frontend_image_path_resolve($newReleaseShow['thumbnail_path']);
        }

        return $this->renderTwig('@streamer_frontend/homepage.html.twig',[
            'randomFeatured' => $randomFeatured,
            'playingMovies' => $playingMovies,
            'playingNows' => $playingNow,
            'popularMovies' => $popularMovies,
            'popularShows' => $popularShows,
            'newReleaseMovies' => $newReleaseMovies,
            'newReleaseShows' => $newReleaseShows,
        ]);
    }


}
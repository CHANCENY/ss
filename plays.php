<?php

require_once __DIR__ . '/vendor/autoload.php';

$batchRule = new \Simp\VideoPhp\batch\BatchRule();

$rules = [
    ...$batchRule->getRule('00_convert'),
    ...$batchRule->getRule('06_split'),
    ...$batchRule->getRule('05_frames'),
    ...$batchRule->getRule('10_output'),
];

$rules['split']['output_folder'] = __DIR__ . DIRECTORY_SEPARATOR . "segments";
$rules['split']['duration_per_clip'] =  $video_data['segment_count'] ?? 1200;
$rules['split']['enabled'] = true;
$rules['subtitle']['enabled'] = true;
$rules['subtitle']['output_file'] = __DIR__ . DIRECTORY_SEPARATOR . "subtitles";

$rules['output_file'] = __DIR__ . DIRECTORY_SEPARATOR . "playlist";

$rules['frames']['output_folder'] = __DIR__ . DIRECTORY_SEPARATOR . "frames";
$rules['frames']['enabled'] = true;
$rules['frames']['interval_seconds'] = 600;

\Simp\VideoPhp\video\Video::playlistBatchProcessor()->process( __DIR__. "/House of the Dragon Anthology  Soundtrack Compilation - Diego Mitre Music (1080p, h264).mp4",$rules);

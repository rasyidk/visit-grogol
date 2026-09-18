<?php

use App\Models\PageContent;

$idFile = file_get_contents(base_path('../frontend/messages/id.json'));
$enFile = file_get_contents(base_path('../frontend/messages/en.json'));

$idJson = json_decode($idFile, true);
$enJson = json_decode($enFile, true);

$idContent = $idJson['KehidupanMasyarakat'] ?? [];
$enContent = $enJson['KehidupanMasyarakat'] ?? [];

$combined = [
    'id' => $idContent,
    'en' => $enContent,
];

$page = PageContent::firstOrCreate(['page_name' => 'kisah-kami']);
$page->update(['content' => $combined]);

echo "Seeded kisah-kami successfully.\n";

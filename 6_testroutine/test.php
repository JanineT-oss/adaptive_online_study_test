<?php
$file = 'people.txt';
// Öffnet die Datei, um den vorhandenen Inhalt zu laden
$current = file_get_contents($file);
// Fügt eine neue Person zur Datei hinzu
$current .= "John Smith\n";
// Schreibt den Inhalt in die Datei zurück
file_put_contents($file, $current);
?>

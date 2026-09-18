<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Reservasi Baru</title>
</head>
<body style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
    <h2>Reservasi Baru</h2>
    <p>Ada permintaan reservasi baru dari website Visit Grogol Kaloka.</p>

    <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
        <tr><td><strong>Nama</strong></td><td>{{ $reservation->name }}</td></tr>
        <tr><td><strong>Email</strong></td><td>{{ $reservation->email }}</td></tr>
        <tr><td><strong>Tanggal kedatangan</strong></td><td>{{ $reservation->arrival_date?->format('d/m/Y') ?? '-' }}</td></tr>
        <tr><td><strong>Jumlah tamu</strong></td><td>{{ $reservation->guests }}</td></tr>
        <tr><td><strong>Paket</strong></td><td>{{ $reservation->package_type ?: '-' }}</td></tr>
        <tr><td><strong>Pesan tambahan</strong></td><td>{{ $reservation->note ?: '-' }}</td></tr>
    </table>

    <p style="margin-top: 24px;">Balas email ini untuk menghubungi calon tamu.</p>
</body>
</html>

<?php

namespace App\Http\Controllers;

use App\Mail\ReservationReceived;
use App\Models\Reservasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ReservasiController extends Controller
{
    public function index(Request $request)
    {
        $query = Reservasi::query();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('package_type', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            $query->where('status', strtoupper($status));
        }

        $sortBy = [
            'arrivalDate' => 'arrival_date',
            'createdAt' => 'created_at',
            'created_at' => 'created_at',
        ][$request->input('sortBy', 'createdAt')] ?? 'created_at';
        $sortOrder = strtolower($request->input('sortOrder', 'desc')) === 'asc' ? 'asc' : 'desc';
        $limit = $request->input('limit', 10);

        if ($limit === 'all') {
            return response()->json([
                'data' => $query->orderBy($sortBy, $sortOrder)->get()->map(fn (Reservasi $item) => $this->toApiArray($item)),
            ]);
        }

        $paginated = $query->orderBy($sortBy, $sortOrder)->paginate((int) $limit);

        return response()->json([
            'data' => collect($paginated->items())->map(fn (Reservasi $item) => $this->toApiArray($item))->values(),
            'meta' => [
                'page' => $paginated->currentPage(),
                'totalPages' => $paginated->lastPage(),
                'limit' => $paginated->perPage(),
                'total' => $paginated->total(),
                'hasNext' => $paginated->hasMorePages(),
                'hasPrev' => $paginated->currentPage() > 1,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['required', 'email', 'max:255'],
            'arrivalDate' => ['required_without:arrival_date', 'date'],
            'arrival_date' => ['nullable', 'date'],
            'guests' => ['required', 'integer', 'min:1', 'max:500'],
            'packageType' => ['required_without:package_type', 'string', 'max:160'],
            'package_type' => ['nullable', 'string', 'max:160'],
            'note' => ['required', 'string', 'max:5000'],
        ]);

        $reservation = Reservasi::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'arrival_date' => $validated['arrivalDate'] ?? $validated['arrival_date'] ?? null,
            'guests' => $validated['guests'],
            'package_type' => $validated['packageType'] ?? $validated['package_type'] ?? null,
            'note' => $validated['note'] ?? null,
            'status' => 'PENDING',
        ]);

        try {
            Mail::to(config('mail.reservation_to'))->send(new ReservationReceived($reservation));
        } catch (Throwable $exception) {
            Log::error('Reservation email delivery failed.', [
                'reservation_id' => $reservation->id,
                'exception' => $exception,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Reservasi sudah tersimpan, tetapi email notifikasi gagal dikirim. Silakan periksa pengaturan SMTP di server.',
                'error_code' => 'MAIL_DELIVERY_FAILED',
            ], 502);
        }

        return response()->json(['data' => $this->toApiArray($reservation)], 201);
    }

    private function toApiArray(Reservasi $reservation): array
    {
        return [
            'id' => $reservation->id,
            'name' => $reservation->name,
            'email' => $reservation->email,
            'arrivalDate' => $reservation->arrival_date?->format('Y-m-d'),
            'guests' => $reservation->guests,
            'packageType' => $reservation->package_type,
            'note' => $reservation->note,
            'status' => $reservation->status,
            'createdAt' => $reservation->created_at?->toISOString(),
        ];
    }
}

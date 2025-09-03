<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMeetingMinuteRequest;
use App\Http\Requests\UpdateMeetingMinuteRequest;
use App\Models\MeetingMinute;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MeetingMinuteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = MeetingMinute::with('creator');

        // Only show published meeting minutes to non-admins
        if (!auth()->user()?->isAdmin()) {
            $query->published();
        }

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }

        // Filter by status if user is admin
        if ($request->filled('status') && auth()->user()?->isAdmin()) {
            $query->where('status', $request->status);
        }

        $meetingMinutes = $query->latest('meeting_date')->paginate(10);

        return Inertia::render('meeting-minutes/index', [
            'meetingMinutes' => $meetingMinutes,
            'filters' => $request->only(['status', 'search']),
            'canManage' => auth()->user()?->canCreateContent() ?? false,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('meeting-minutes/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMeetingMinuteRequest $request)
    {
        $meetingMinute = MeetingMinute::create([
            ...$request->validated(),
            'created_by' => auth()->id(),
        ]);

        return redirect()->route('meeting-minutes.show', $meetingMinute)
            ->with('success', 'Meeting minutes created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(MeetingMinute $meetingMinute)
    {
        // Check if user can view this meeting minute
        if ($meetingMinute->status !== 'published' && !auth()->user()?->canEditContent()) {
            abort(403, 'This meeting minute is not published yet.');
        }

        $meetingMinute->load('creator');

        return Inertia::render('meeting-minutes/show', [
            'meetingMinute' => $meetingMinute,
            'canEdit' => auth()->user()?->canEditContent() ?? false,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MeetingMinute $meetingMinute)
    {
        return Inertia::render('meeting-minutes/edit', [
            'meetingMinute' => $meetingMinute,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMeetingMinuteRequest $request, MeetingMinute $meetingMinute)
    {
        $meetingMinute->update($request->validated());

        return redirect()->route('meeting-minutes.show', $meetingMinute)
            ->with('success', 'Meeting minutes updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MeetingMinute $meetingMinute)
    {
        $meetingMinute->delete();

        return redirect()->route('meeting-minutes.index')
            ->with('success', 'Meeting minutes deleted successfully.');
    }
}
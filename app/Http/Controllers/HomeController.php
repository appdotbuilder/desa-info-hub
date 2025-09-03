<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\DocumentArchive;
use App\Models\MeetingMinute;
use App\Models\OrganizationProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with organization information and recent content.
     */
    public function index(Request $request)
    {
        // Get organization profile
        $organization = OrganizationProfile::first();

        // Get recent activities
        $recentActivities = Activity::with('creator')
            ->latest()
            ->take(6)
            ->get()
            ->map(function ($activity) {
                return [
                    'id' => $activity->id,
                    'title' => $activity->title,
                    'description' => $activity->description,
                    'activity_date' => $activity->activity_date,
                    'location' => $activity->location,
                    'status' => $activity->status,
                    'creator_name' => $activity->creator->name,
                ];
            });

        // Get recent published meeting minutes
        $recentMeetingMinutes = MeetingMinute::published()
            ->with('creator')
            ->latest('meeting_date')
            ->take(4)
            ->get()
            ->map(function ($minute) {
                return [
                    'id' => $minute->id,
                    'title' => $minute->title,
                    'meeting_date' => $minute->meeting_date,
                    'location' => $minute->location,
                    'creator_name' => $minute->creator->name,
                ];
            });

        // Get recent public documents
        $recentDocuments = DocumentArchive::publicVisible()
            ->with('uploader')
            ->latest()
            ->take(6)
            ->get()
            ->map(function ($doc) {
                return [
                    'id' => $doc->id,
                    'title' => $doc->title,
                    'description' => $doc->description,
                    'category' => $doc->category,
                    'file_type' => $doc->file_type,
                    'download_count' => $doc->download_count,
                    'uploader_name' => $doc->uploader->name,
                    'created_at' => $doc->created_at,
                ];
            });

        return Inertia::render('welcome', [
            'organization' => $organization,
            'recentActivities' => $recentActivities,
            'recentMeetingMinutes' => $recentMeetingMinutes,
            'recentDocuments' => $recentDocuments,
            'stats' => [
                'total_activities' => Activity::count(),
                'upcoming_activities' => Activity::upcoming()->count(),
                'published_meeting_minutes' => MeetingMinute::published()->count(),
                'public_documents' => DocumentArchive::publicVisible()->count(),
            ],
        ]);
    }
}
<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateOrganizationProfileRequest;
use App\Models\OrganizationProfile;
use Inertia\Inertia;

class OrganizationProfileController extends Controller
{
    /**
     * Display the organization profile.
     */
    public function show()
    {
        $profile = OrganizationProfile::first();

        return Inertia::render('organization/show', [
            'profile' => $profile,
            'canEdit' => auth()->user()?->isAdmin() ?? false,
        ]);
    }

    /**
     * Show the form for editing the organization profile.
     */
    public function edit()
    {
        $profile = OrganizationProfile::first();

        return Inertia::render('organization/edit', [
            'profile' => $profile,
        ]);
    }

    /**
     * Update the organization profile.
     */
    public function update(UpdateOrganizationProfileRequest $request)
    {
        $profile = OrganizationProfile::first();
        
        if ($profile) {
            $profile->update($request->validated());
        } else {
            OrganizationProfile::create($request->validated());
        }

        return redirect()->route('organization.show')
            ->with('success', 'Organization profile updated successfully.');
    }
}
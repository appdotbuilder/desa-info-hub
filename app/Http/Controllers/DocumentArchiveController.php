<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDocumentArchiveRequest;
use App\Http\Requests\UpdateDocumentArchiveRequest;
use App\Models\DocumentArchive;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentArchiveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = DocumentArchive::with('uploader');

        // Filter by visibility based on user role
        $user = auth()->user();
        if (!$user) {
            $query->publicVisible();
        } elseif (!$user->isAdmin()) {
            $query->whereIn('visibility', ['public', 'members_only']);
        }

        // Filter by category
        if ($request->filled('category')) {
            $query->byCategory($request->category);
        }

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('filename', 'like', "%{$search}%");
            });
        }

        $documents = $query->latest()->paginate(12);

        // Get available categories for filter
        $categories = DocumentArchive::whereNotNull('category')
            ->distinct()
            ->pluck('category')
            ->filter()
            ->values();

        return Inertia::render('documents/index', [
            'documents' => $documents,
            'categories' => $categories,
            'filters' => $request->only(['category', 'search']),
            'canManage' => $user?->canCreateContent() ?? false,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('documents/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDocumentArchiveRequest $request)
    {
        $document = DocumentArchive::create([
            ...$request->validated(),
            'uploaded_by' => auth()->id(),
        ]);

        return redirect()->route('documents.show', $document)
            ->with('success', 'Document uploaded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(DocumentArchive $document)
    {
        // Check if user can view this document
        $user = auth()->user();
        if ($document->visibility === 'admin_only' && (!$user || !$user->isAdmin())) {
            abort(403, 'You do not have permission to view this document.');
        }
        
        if ($document->visibility === 'members_only' && !$user) {
            abort(403, 'You must be logged in to view this document.');
        }

        $document->load('uploader');

        return Inertia::render('documents/show', [
            'document' => $document,
            'canEdit' => $user?->canEditContent() ?? false,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DocumentArchive $document)
    {
        return Inertia::render('documents/edit', [
            'document' => $document,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDocumentArchiveRequest $request, DocumentArchive $document)
    {
        $document->update($request->validated());

        return redirect()->route('documents.show', $document)
            ->with('success', 'Document updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DocumentArchive $document)
    {
        $document->delete();

        return redirect()->route('documents.index')
            ->with('success', 'Document deleted successfully.');
    }


}
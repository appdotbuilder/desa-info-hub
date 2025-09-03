<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDocumentArchiveRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user() && auth()->user()->canCreateContent();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'filename' => 'required|string|max:255',
            'file_path' => 'required|string|max:500',
            'file_type' => 'required|string|max:10',
            'file_size' => 'required|integer|min:1',
            'category' => 'nullable|string|max:100',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'visibility' => 'required|in:public,members_only,admin_only',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Document title is required.',
            'filename.required' => 'Filename is required.',
            'file_path.required' => 'File path is required.',
            'file_type.required' => 'File type is required.',
            'file_size.required' => 'File size is required.',
            'file_size.min' => 'File size must be greater than 0.',
            'visibility.required' => 'Document visibility is required.',
            'visibility.in' => 'Invalid visibility level selected.',
        ];
    }
}
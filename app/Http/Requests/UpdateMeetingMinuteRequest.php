<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMeetingMinuteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user() && auth()->user()->canEditContent();
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
            'content' => 'required|string',
            'meeting_date' => 'required|date',
            'location' => 'nullable|string|max:255',
            'attendees' => 'nullable|array',
            'attendees.*' => 'string|max:255',
            'status' => 'required|in:draft,published,archived',
            'published_at' => 'nullable|date',
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
            'title.required' => 'Meeting title is required.',
            'content.required' => 'Meeting content is required.',
            'meeting_date.required' => 'Meeting date is required.',
            'status.required' => 'Meeting status is required.',
            'status.in' => 'Invalid meeting status selected.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        if ($this->status === 'published' && !$this->published_at) {
            $this->merge([
                'published_at' => now(),
            ]);
        }
    }
}
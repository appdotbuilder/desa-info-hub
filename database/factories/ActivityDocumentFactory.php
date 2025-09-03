<?php

namespace Database\Factories;

use App\Models\Activity;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ActivityDocument>
 */
class ActivityDocumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['photo', 'report', 'other'];
        $fileType = fake()->randomElement(['jpg', 'png', 'pdf', 'docx']);
        
        return [
            'activity_id' => Activity::factory(),
            'filename' => fake()->word() . '.' . $fileType,
            'file_path' => 'activity_documents/' . fake()->uuid() . '.' . $fileType,
            'file_type' => $fileType,
            'file_size' => fake()->numberBetween(1024, 10485760), // 1KB to 10MB
            'document_type' => fake()->randomElement($types),
            'description' => fake()->sentence(),
            'uploaded_by' => User::factory(),
        ];
    }

    /**
     * Indicate that the document is a photo.
     */
    public function photo(): static
    {
        return $this->state(fn (array $attributes) => [
            'document_type' => 'photo',
            'file_type' => fake()->randomElement(['jpg', 'png']),
            'file_path' => 'activity_documents/' . fake()->uuid() . '.' . fake()->randomElement(['jpg', 'png']),
        ]);
    }

    /**
     * Indicate that the document is a report.
     */
    public function report(): static
    {
        return $this->state(fn (array $attributes) => [
            'document_type' => 'report',
            'file_type' => fake()->randomElement(['pdf', 'docx']),
            'file_path' => 'activity_documents/' . fake()->uuid() . '.' . fake()->randomElement(['pdf', 'docx']),
        ]);
    }
}
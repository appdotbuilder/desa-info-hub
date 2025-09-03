<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DocumentArchive>
 */
class DocumentArchiveFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['Surat Resmi', 'Laporan Keuangan', 'Dokumen Legal', 'Proposal', 'Lainnya'];
        $fileType = fake()->randomElement(['pdf', 'docx', 'xlsx', 'jpg', 'png']);
        $tags = fake()->randomElements(['penting', 'urgent', 'keuangan', 'legal', 'proposal', 'rapat'], fake()->numberBetween(1, 3));

        return [
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(2),
            'filename' => fake()->words(3, true) . '.' . $fileType,
            'file_path' => 'documents/' . fake()->uuid() . '.' . $fileType,
            'file_type' => $fileType,
            'file_size' => fake()->numberBetween(1024, 52428800), // 1KB to 50MB
            'category' => fake()->randomElement($categories),
            'tags' => $tags,
            'visibility' => fake()->randomElement(['public', 'members_only', 'admin_only']),
            'uploaded_by' => User::factory(),
            'download_count' => fake()->numberBetween(0, 50),
        ];
    }

    /**
     * Indicate that the document is public.
     */
    public function public(): static
    {
        return $this->state(fn (array $attributes) => [
            'visibility' => 'public',
        ]);
    }

    /**
     * Indicate that the document is for members only.
     */
    public function membersOnly(): static
    {
        return $this->state(fn (array $attributes) => [
            'visibility' => 'members_only',
        ]);
    }

    /**
     * Indicate that the document is for admins only.
     */
    public function adminOnly(): static
    {
        return $this->state(fn (array $attributes) => [
            'visibility' => 'admin_only',
        ]);
    }
}
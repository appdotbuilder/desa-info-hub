<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MeetingMinute>
 */
class MeetingMinuteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $attendees = [];
        for ($i = 0; $i < fake()->numberBetween(3, 10); $i++) {
            $attendees[] = fake()->name();
        }

        return [
            'title' => 'Rapat ' . fake()->sentence(3),
            'content' => fake()->paragraphs(5, true),
            'meeting_date' => fake()->dateTimeBetween('-6 months', '+1 month'),
            'location' => fake()->address(),
            'attendees' => $attendees,
            'file_path' => fake()->optional()->passthrough('meeting_minutes/' . fake()->uuid() . '.pdf'),
            'status' => fake()->randomElement(['draft', 'published', 'archived']),
            'created_by' => User::factory(),
            'published_at' => fake()->optional()->dateTimeBetween('-3 months', 'now'),
        ];
    }

    /**
     * Indicate that the meeting minute is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'published_at' => fake()->dateTimeBetween('-3 months', 'now'),
        ]);
    }

    /**
     * Indicate that the meeting minute is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'published_at' => null,
        ]);
    }
}
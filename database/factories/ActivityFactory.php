<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class ActivityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(3),
            'activity_date' => fake()->dateTimeBetween('now', '+6 months'),
            'location' => fake()->address(),
            'status' => fake()->randomElement(['planned', 'ongoing', 'completed', 'cancelled']),
            'created_by' => User::factory(),
        ];
    }

    /**
     * Indicate that the activity is upcoming.
     */
    public function upcoming(): static
    {
        return $this->state(fn (array $attributes) => [
            'activity_date' => fake()->dateTimeBetween('+1 day', '+3 months'),
            'status' => 'planned',
        ]);
    }

    /**
     * Indicate that the activity is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'activity_date' => fake()->dateTimeBetween('-6 months', '-1 day'),
            'status' => 'completed',
        ]);
    }
}
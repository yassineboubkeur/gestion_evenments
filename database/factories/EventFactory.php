<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    public function definition()
    {
        return [
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph,
            'date' => $this->faker->dateTimeBetween('+1 week', '+1 year'),
            'address' => $this->faker->address,
            'available_places' => $this->faker->numberBetween(10, 100),
            'image' => 'events/'.$this->faker->image('public/storage/events', 640, 480, null, false),
            'duration_minutes' => $this->faker->numberBetween(30, 240),
            'price' => $this->faker->randomFloat(2, 0, 100),
            'category' => $this->faker->randomElement(['Concert', 'Conference', 'Workshop', 'Exhibition']),
            'organizer_id' => \App\Models\User::factory(),
        ];
    }
}
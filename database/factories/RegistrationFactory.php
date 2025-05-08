<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RegistrationFactory extends Factory
{
    public function definition()
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'event_id' => \App\Models\Event::factory(),
            'payment_id' => 'PAYID-' . $this->faker->unique()->regexify('[A-Z0-9]{17}'),
            'payment_amount' => $this->faker->randomFloat(2, 10, 500),
            'payment_currency' => 'USD',
            'payment_status' => $this->faker->randomElement(['pending', 'paid', 'failed', 'refunded']),
            'payment_date' => $this->faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d H:i:s'), // Format the date
            'payer_email' => $this->faker->email,
            'payer_name' => $this->faker->name,
            'ticket_quantity' => $this->faker->numberBetween(1, 5),
            'notes' => $this->faker->optional()->sentence,
        ];
    }
}
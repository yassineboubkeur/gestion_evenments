<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            
            // User relationship
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Event relationship
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            
            // Payment information
            $table->string('payment_id')->unique()->comment('PayPal Order ID');
            $table->decimal('payment_amount', 10, 2);
            $table->string('payment_currency')->default('USD');
            $table->string('payment_status')->default('pending');
            $table->timestamp('payment_date')->nullable();
            
            // Payer information
            $table->string('payer_email');
            $table->string('payer_name');
            
            // Additional fields
            $table->integer('ticket_quantity')->default(1);
            $table->text('notes')->nullable();
            
            // Timestamps
            $table->timestamps();
            
            // Indexes
            $table->index(['user_id', 'event_id']);
            $table->index('payment_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
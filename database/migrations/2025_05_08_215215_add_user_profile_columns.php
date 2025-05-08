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
        Schema::table('users', function (Blueprint $table) {
            $table->date('birthday')->nullable()->after('password');
            $table->enum('gender', ['male', 'female', 'other'])->nullable()->after('birthday');
            $table->string('phone', 20)->nullable()->after('gender');
            $table->string('city', 100)->nullable()->after('phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['birthday', 'gender', 'phone', 'city']);
        });
    }
};

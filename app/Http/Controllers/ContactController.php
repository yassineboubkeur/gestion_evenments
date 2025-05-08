<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function create()
    {
        return view('contact');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'subject' => 'required',
            'message' => 'required',
        ]);

        // Sauvegarder en base de données
        Contact::create($validated);

        // Envoyer l'email
        Mail::to('your@email.com')->send(new ContactFormMail($validated));

        return back()->with('success', 'Thank you for your message!');
    }
}
<!DOCTYPE html>
<html>
<head>
    <title>Confirmation d'inscription</title>
    <style>
        .ticket {
            border: 1px solid #ddd;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
            /* background: rgb(228, 171, 66); */
        }
        .qr-code {
            margin: 20px 0;
            text-align: center;
        }
        .header {
            background-color: #f8f9fa;
            padding: 5px;
            text-align: center;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="ticket">
        <div style="position: relative; text-align: center;">
            <img 
                src="{{ asset('/logo12.png') }}" 
                alt="Company Logo" 
                style="
                    height: 9rem;
                    transition: all 0.3s ease;
                    display: inline-block; /* Ensures text-align works on the img */
                "
                class="group-hover:scale-105 group-hover:rotate-2" 
            />
            {{-- <div style="
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                border-radius: 9999px;
                background-color: rgba(255, 255, 255, 0.1);
                transition: all 0.3s ease;
            " class="group-hover:bg-white/20"></div> --}}
        </div>

        <div class="header">
            <h1 style="font-weight:bold;"> Votre billet pour <strong>{{ $registration->event->name }}</strong> </h1>
        </div>
        
        <p>Bonjour {{ $registration->payer_name }},</p>
        
        <p>Voici votre billet électronique pour l'événement <strong>{{ $registration->event->name }}</strong>.</p>
        
        <h2>Détails de l'événement :</h2>
        <ul>
            <li><strong>Date :</strong> {{ $registration->event->date->format('d/m/Y H:i') }}</li>
            <li><strong>Lieu :</strong> {{ $registration->event->address }}</li>
            <li><strong>Référence :</strong> {{ $registration->payment_id }}</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
            <h3 style="font-size: 18px;">Votre QR Code d'accès :</h3>
            <!-- Fixed img tag with src attribute -->
            <img src="{!! $qrCode !!}" 
                 alt="QR Code pour l'événement" 
                 style="display: block;
                        margin: 15px auto;
                        width: 200px;
                        height: 200px;
                        border: 1px solid #ddd;
                        padding: 10px;
                        background: white;">
            <p style="font-size: 14px; color: #555;">
                Présentez ce code à l'entrée de l'événement
            </p>
        </div>
        
        <p>Pour plus d'informations, visitez : <a href="{{ url('/events/' . $registration->event_id) }}">lien vers l'événement</a></p>
        <p>Cordialement,</p><br>
        <div style="display:flex; place-items: center;">
            
                <p>L'équipe d'organisation</p> 
                <div style="position: relative; text-align: center;margin-left:1em;">
                    <img 
                        src="{{ asset('logo12.png') }}" 
                        alt="Company Logo434" 
                        style="
                            height: 2rem;
                            transition: all 0.3s ease;
                            display: inline-block; /* Ensures text-align works on the img */
                        "
                        class="group-hover:scale-105 group-hover:rotate-2" 
                    />
                    <div style="
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        border-radius: 9999px;
                        background-color: rgba(255, 255, 255, 0.1);
                        transition: all 0.3s ease;
                    " class="group-hover:bg-white/20"></div>
                </div>
        </div>
       
    </div>
</body>
</html>
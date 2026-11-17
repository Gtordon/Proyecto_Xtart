<?php

namespace App\Exceptions;

use Exception;

// Aviso de que una reserva no se ha podido hacer.
// Lleva tres datos: el texto, el código corto y el número de error.
class ReservationException extends Exception
{
    public function __construct(
        string $message,
        public string $errorCode,
        public int $status,
    ) {
        parent::__construct($message);
    }
}
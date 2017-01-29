<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function crearRespuesta($datos,$codigo){
            return response()->json(['data' => $datos],$codigo);
        }
        
    public function crearRespuestaConData($message,$datos,$codigo){
            return response()->json(['message'=> $message,'data' => $datos],$codigo);
    }
    public function crearRespuestaConDataxml($message,$datos,$codigo){
            return $datos;
    }
        public function crearRespuestaError($mensaje,$codigo){
            return response()->json(['message'=> $mensaje,'code'=> $codigo],$codigo);
        }
        // es un override o redefinimos esta funcion para q no nos redireccione  a ninguna otra pagina y nos  responda
        // con un mensaje
    protected function buildFailedValidationResponse(Request $request, array $errors)
    {
        return $this->crearRespuestaError($errors,422);
    }
}

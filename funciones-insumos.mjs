import rl from './readline-interface.mjs'
import { writeFile } from 'node:fs/promises';
import Insumo from './model/Insumo.mjs';

export async function registrarInsumo(){
  const insumo = new Insumo();
  insumo.nombre = await rl.question('Escribe el nombre del insumo: ');
  insumo.proveedor = await rl.question('Escribe el proveedor del insumo: ');
  insumo.tipoInsumo = await rl.question('Escribe el tipo de insumo: ');
  
  return validarRegistroInsumo(insumo);
}

export async function validarRegistroInsumo(insumo){
  console.log('\nEste es el insumo a registrar:\n', insumo, '\n');

  
  const objetoRespuesta = {
    insumo: insumo,
  }

  while(true){
    const respuesta = await rl.question('¿Estás de acuerdo son la información a registrar? (S/N): ');
    if (respuesta === 'N'){
      objetoRespuesta.valido = false;
      break;
    }
    else if (respuesta === 'S'){
      objetoRespuesta.valido = true;
      break;
    }
    else{
      console.log('Ingrese una respuesta como S o N.')
    }
  }

  return objetoRespuesta;
}

export async function guardarInsumos(ruta, data) {
  const archivo = await writeFile(ruta, data);
  console.log('El archivo se ha guardado con exito');
  rl.close()
}
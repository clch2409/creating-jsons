import rl from './readline-interface.mjs'
import { writeFile } from 'node:fs/promises';
import Insumo from './model/Insumo.mjs';

export async function registrarInsumo(){
  const insumo = new Insumo();
  insumo.nombre = await rl.question('Escribe el nombre del insumo: ');
  insumo.proveedor = await rl.question('Escribe el proveedor del insumo: ');
  insumo.tipoInsumo = await rl.question('Escribe el tipo de insumo: ');
  const insumoValido = await validarRegistroInsumo(insumo)
  
  return insumoValido;
}

export async function validarRegistroInsumo(insumo){
  console.log('\nEste es el insumo a registrar:\n', insumo, '\n');

  const respuesta = await rl.question('¿Estás de acuerdo son la información a registrar? (S/N): ');
  const objetoRespuesta = {
    insumo: insumo,
  }

  if (respuesta === 'N'){
    objetoRespuesta.valido = false;
  }
  else{
    objetoRespuesta.valido = true;
  }

  return objetoRespuesta;
}

export async function guardarInsumos(ruta, data) {
  const archivo = await writeFile(ruta, data);
  console.log('El archivo se ha guardado con exito');
  rl.close()
}
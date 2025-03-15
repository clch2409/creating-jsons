import rl from './readline-interface.mjs'
import  { writeFile } from 'node:fs/promises';
import Insumo from './model/Insumo.mjs';
import data from '../mi-desayunito-project/web/json/insumos.json' with {type: 'json'}

const insumos = data.length > 0 ? data : [];

if (insumos.length === 0){
  console.log('No se encuentran registrado ningún insumo.');
}
else{
  console.log('Este es el listado de insumos:\n', insumos)
}

const ingresarInsumos = await rl.question('¿Desea comenzar a registrar? (S/N): ')

if(ingresarInsumos === 'S'){
  while(true){
    const registroValido = await registrarInsumo()
    
    if (registroValido){
      const continuar = await rl.question('¿Desea continuar registrando?: ')
      if(continuar === 'N')  {
        await guardarInsumos('../mi-desayunito-project/web/json/insumos.json', `${JSON.stringify(insumos)}`)
        break;
      }
    }
  }
}else{
  rl.close()
}

async function registrarInsumo(){
  const insumo = new Insumo();
  insumo.nombre = await rl.question('Escribe el nombre del insumo: ');
  insumo.proveedor = await rl.question('Escribe el proveedor del insumo: ');
  insumo.tipoInsumo = await rl.question('Escribe el tipo de insumo: ');
  const insumoValido = await validarRegistro(insumo)
  
  return insumoValido;
}

async function validarRegistro(insumo){
  console.log('\nEste es el insumo a registrar:\n', insumo, '\n');

  const respuesta = await rl.question('¿Estás de acuerdo son la información a registrar? (S/N): ');

  if (respuesta === 'N'){
    return false;
  }
  else{
    return true;
  }
}

async function guardarInsumos(rutra, data) {
  const archivo = await writeFile(rutra, data)
  rl.close()
}
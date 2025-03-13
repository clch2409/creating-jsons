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
    const insumo = new Insumo();
    insumo.nombre = await rl.question('Escribe el nombre del insumo: ');
    insumo.proveedor = await rl.question('Escribe el proveedor del insumo: ');
    insumo.tipoInsumo = await rl.question('Escribe el tipo de insumo: ');
    const continuar = await rl.question('¿Desea seguir agregando más insumos? (S/N): ')
  
    insumos.push(insumo)
  
    console.log(insumos)
    
    if(continuar === 'N')  {
      await guardarInsumos('../mi-desayunito-project/web/json/insumos.json', `${JSON.stringify(insumos)}`)
      break;
    }
  }
}else{
  rl.close()
}

async function guardarInsumos(path, data) {
  const archivo = await writeFile(path, data)
  rl.close()
}
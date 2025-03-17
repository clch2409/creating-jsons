import rl from './readline-interface.mjs'
import dataInsumos from '../mi-desayunito-project/web/json/insumos.json' with {type: 'json'}
import { registrarInsumo, guardarInsumos } from './funciones-insumos.mjs';

const insumos = dataInsumos.length > 0 ? dataInsumos : [];


const queRegistrar = parseInt(await rl.question('¿Qué desea registrar?: \n -Insumos (1) \n -Productos del menú (2)'));

if (queRegistrar === 1){
  //* Registro de insumos
}
else if(queRegistrar === 2){
  //* Registro de productos del menú
}

async function registroDeInsumos(){
  const registroValido = await registrarInsumo()
    
  if (registroValido.valido){
    insumos.push(registroValido.insumo);
    const continuar = await rl.question('¿Desea continuar registrando?: ')
    if(continuar === 'N')  {
      await guardarInsumos('../mi-desayunito-project/web/json/insumos.json', `${JSON.stringify(insumos)}`)
    }
  }
}

async function registroDeMenu(){

}
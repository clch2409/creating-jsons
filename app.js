import rl from './readline-interface.mjs'
import dataInsumos from '../mi-desayunito-project/web/json/insumos.json' with {type: 'json'}
import { registrarInsumo, guardarInsumos } from './funciones-insumos.mjs';
import { registrarProducto, guardarMenu } from './funciones-menu.mjs';

const insumos = dataInsumos.length > 0 ? dataInsumos : [];
const productos = []




while(true){
  const queRegistrar = parseInt(await rl.question('¿Qué desea registrar?: \n -Insumos (1) \n -Productos del menú (2)'));

  if (queRegistrar === 1){
    await registroDeInsumos()
  }
  else if(queRegistrar === 2){
    await registroDeProductos()
  }
  else{
    console.log('Por favor, ingrese los números solicitados');
  }
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

async function registroDeProductos(){
  const registroValido = await registrarProducto()

  if (registroValido.valido){
    productos.push(registroValido.insumo);
    const continuar = await rl.question('¿Desea continuar registrando?: ')
    if(continuar === 'N')  {
      await guardarMenu('../mi-desayunito-project/web/json/menu.json', `${JSON.stringify(productos)}`)
    }
  }
}
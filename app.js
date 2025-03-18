import rl from './readline-interface.mjs'
import dataInsumos from '../mi-desayunito-project/web/json/insumos.json' with {type: 'json'}
import dataMenu from '../mi-desayunito-project/web/json/menu.json' with {type: 'json'}
import { registrarInsumo, guardarInsumos } from './funciones-insumos.mjs';
import { registrarProducto, guardarMenu } from './funciones-menu.mjs';

const insumos = dataInsumos.length > 0 ? dataInsumos : [];
const productos = dataMenu.length > 0 ? dataMenu : [];


while(true){
  const queRegistrar = parseInt(await rl.question('¿Qué desea registrar?: \n -Insumos (1) \n -Productos del menú (2)\n -Salir (3)\n'));

  if (queRegistrar === 1){
    await registro(1);
  }
  else if(queRegistrar === 2){
    await registro(2);
  }
  else if(queRegistrar === 3){
    rl.close();
    break;
  }
  else{
    console.log('Por favor, ingrese los números solicitados');
  }
}

async function registro(tipoRegistro){
  while(true){
    let registroValido = null;
    if (tipoRegistro === 1){
      console.log('\nEstos son los insumos registrados:\n', insumos, '\n');
      registroValido = await registrarInsumo()
    }
    else if(tipoRegistro === 2){
      console.log('\nEstos son los productos registrados:\n', productos, '\n');
      registroValido = await registrarProducto()
    }

    if (registroValido.valido){
      if (tipoRegistro === 1){
        insumos.push(registroValido.insumo);
      }
      else if(tipoRegistro === 2){
        productos.push(registroValido.producto);
      }
      const continuar = await rl.question('¿Desea continuar registrando?: ');
      if(continuar === 'N')  {
        if (tipoRegistro === 1){
          await guardarInsumos('../mi-desayunito-project/web/json/insumos.json', `${JSON.stringify(insumos)}`);
        }
        else if(tipoRegistro === 2){
          await guardarMenu('../mi-desayunito-project/web/json/menu.json', `${JSON.stringify(productos)}`);
        }
        break;
      }
    }
  }
}
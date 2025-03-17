import rl from './readline-interface.mjs'
import { writeFile } from 'node:fs/promises';
import Producto from './model/Producto.mjs'

export async function registrarProducto(){
  const producto = new Producto();
  producto.nombre = await rl.question('Escriba el nombre del producto: ');
  producto.precio = parseFloat(await rl.question('Escriba el precio del producto: '));
  producto.categoria = await rl.question('Escriba la categoria: ');

  return validarRegistro(producto)
}

export async function validarRegistro(producto){
  console.log('\nEstos son los datos del producto', producto);

  const objetoProducto = {
    producto: producto
  }

  while (true){
    const pregunta = await rl.question('\n¿Desea registrar el siguiente producto? (S/N): ');

    if (pregunta === 'N'){
      objetoProducto.valido = false;
      break;
    }
    else if (pregunta === 'S'){
      objetoProducto.valido = true;
      break;
    }
    else{
      console.log('Ingrese una respuesta como S o N.')
    }
  }

  return objetoProducto;
}

export async function guardarMenu(){
  const archivo = await writeFile(rutra, data);
  console.log('El archivo se ha guardado con exito');
  rl.close()
}
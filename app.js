import readline from 'node:readline/promises';

let insumos = []

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('close', () => {
  process.exit(0);
})

while(true){
  const nombre = await rl.question('Escribe el nombre del insumo: ')
  const precio = await rl.question('Escribe el precio del insumo: ')
  const proveedor = await rl.question('Escribe el proveedor del insumo: ')
  const tipoDeInsumo = await rl.question('Escribe el tipo de insumo: ')
  const continuar = await rl.question('Deseas agregar otro insumo? (S/N): ')

  if(continuar === 'N') break

  insumos.push({
    nombre,
    precio,
    proveedor,
    tipoDeInsumo
  })

  rl.close()
}

console.log(insumos)
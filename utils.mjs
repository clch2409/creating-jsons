import rl from "./readline-interface.mjs";

export const PROVEEDORES = [
  "Verduleros Mercado",
  "Venezolanos",
  "Molino",
  "Descartables Mercado",
  "Mass",
  "Carneros Mercado",
  "Pollero Mercado",
  "Abarrotes Mercado",
  "Panaderia",
];

export const TIPOS_VENTA = ["unidad", "kg", "bolsita", "soles"];

export const TIPOS_INSUMO = [
  "verduras",
  "embutidos",
  "panes",
  "descartables",
  "aceite",
  "carnes",
  "salsas",
  "condimentos",
  "cereales",
  "harinas",
  "lacteos",
  "bebidas",
];

export async function mostrarMenuSeleccion(titulo, opciones) {
  const anchoTotal = 60;
  const separador = "═".repeat(anchoTotal);

  console.log("\n╔" + separador + "╗");
  const tituloConEspacios = titulo
    .padStart((anchoTotal + titulo.length) / 2)
    .padEnd(anchoTotal);
  console.log("║" + tituloConEspacios + "║");
  console.log("╠" + separador + "╣");

  opciones.forEach((opcion, index) => {
    const numero = `[${index + 1}]`.padEnd(6);
    const textoOpcion = opcion.padEnd(anchoTotal - 6);
    console.log(`║ ${numero}${textoOpcion}║`);
  });

  console.log("╚" + separador + "╝");

  while (true) {
    const seleccion = parseInt(
      await rl.question("\n👉 Selecciona una opción (número): "),
    );

    if (!isNaN(seleccion) && seleccion >= 1 && seleccion <= opciones.length) {
      console.log(`✅ Seleccionado: ${opciones[seleccion - 1]}\n`);
      return opciones[seleccion - 1];
    } else {
      console.log(
        `❌ Opción inválida. Por favor ingresa un número entre 1 y ${opciones.length}`,
      );
    }
  }
}

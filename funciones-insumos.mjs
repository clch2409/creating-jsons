import rl from "./readline-interface.mjs";
import { writeFile } from "node:fs/promises";

import Insumo from "./model/Insumo.mjs";
import {
  PROVEEDORES,
  TIPOS_VENTA,
  TIPOS_INSUMO,
  mostrarMenuSeleccion,
} from "./utils.mjs";

const insumos = dataInsumos.length > 0 ? dataInsumos : [];

export async function registrarInsumo() {
  const insumo = new Insumo();

  console.log("\n" + "━".repeat(70));
  console.log("🆕  REGISTRAR NUEVO INSUMO");
  console.log("━".repeat(70));

  insumo.id = insumos.length > 0 ? insumos[insumos.length - 1].id + 1 : 1;

  insumo.nombre = await rl.question("\n📝 Escribe el nombre del insumo: ");

  insumo.proveedor = await mostrarMenuSeleccion(
    "🏪 SELECCIONA EL PROVEEDOR",
    PROVEEDORES,
  );

  insumo.tipoInsumo = await mostrarMenuSeleccion(
    "📦 SELECCIONA EL TIPO DE INSUMO",
    TIPOS_INSUMO,
  );

  insumo.tipoDeVenta = await mostrarMenuSeleccion(
    "⚖️  SELECCIONA EL TIPO DE VENTA",
    TIPOS_VENTA,
  );

  insumo.precio = parseFloat(await rl.question("\n💰 Escribe el precio: S/. "));

  return validarRegistroInsumo(insumo);
}

export function mostrarTablaInsumos() {
  if (insumos.length === 0) {
    console.log("\n📦 No hay insumos registrados aún.\n");
    return;
  }

  console.log(
    "\n╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗",
  );
  console.log(
    "║                                                    📦 INSUMOS REGISTRADOS 📦                                                    ║",
  );
  console.log(
    "╠════╦══════════════════════╦══════════════════════╦══════════════════════╦══════════════════════╦══════════════════════════════╣",
  );
  console.log(
    "║ #  ║ NOMBRE               ║ PROVEEDOR            ║ TIPO                 ║ TIPO DE VENTA        ║ PRECIO                       ║",
  );
  console.log(
    "╠════╬══════════════════════╬══════════════════════╬══════════════════════╬══════════════════════╬══════════════════════════════╣",
  );
  insumos.sort((a, b) => a.proveedor.localeCompare(b.proveedor));
  insumos.forEach((insumo, index) => {
    const num = String(index + 1).padEnd(2);
    const nombre = String(insumo.nombre || "N/A")
      .padEnd(20)
      .substring(0, 20);
    const proveedor = String(insumo.proveedor || "N/A")
      .padEnd(20)
      .substring(0, 20);
    const tipo = String(insumo.tipoInsumo || "N/A")
      .padEnd(20)
      .substring(0, 20);
    const tipoVenta = String(insumo.tipoDeVenta || "N/A")
      .padEnd(20)
      .substring(0, 20);
    const precio =
      insumo.precio !== undefined
        ? `S/.${insumo.precio.toFixed(2)}`.padEnd(30).substring(0, 30)
        : "N/A".padEnd(30);

    console.log(
      `║ ${num} ║ ${nombre} ║ ${proveedor} ║ ${tipo} ║ ${tipoVenta} ║  ${precio} ║`,
    );
  });

  console.log(
    "╚════╩══════════════════════╩══════════════════════╩══════════════════════╩══════════════════════╩══════════════════════════════╝\n",
  );
}

export async function validarRegistroInsumo(insumo) {
  console.log("\n✅ Insumo a registrar:");
  console.log(`   • Nombre: ${insumo.nombre}`);
  console.log(`   • Proveedor: ${insumo.proveedor}`);
  console.log(`   • Tipo: ${insumo.tipoInsumo}`);
  console.log(`   • Tipo de venta: ${insumo.tipoDeVenta}`);
  console.log(`   • Precio: S/.${insumo.precio}\n`);

  const objetoRespuesta = {
    insumo: insumo,
  };

  while (true) {
    const respuesta = await rl.question(
      "¿Estás de acuerdo son la información a registrar? (S/N): ",
    );
    if (respuesta.toLocaleLowerCase() === "n") {
      objetoRespuesta.valido = false;
      break;
    } else if (respuesta.toLocaleLowerCase() === "s") {
      objetoRespuesta.valido = true;
      break;
    } else {
      console.log("Ingrese una respuesta como S o N.");
    }
  }

  return objetoRespuesta;
}

export async function guardarInsumos(ruta, data) {
  const archivo = await writeFile(ruta, data);
  console.log("El archivo se ha guardado con exito");
  rl.close();
}

import rl from "./readline-interface.mjs";
import dataInsumos from "../mi-desayunito-project/web/json/insumos.json" with { type: "json" };
import dataMenu from "../mi-desayunito-project/web/json/menu.json" with { type: "json" };
import {
  registrarInsumo,
  guardarInsumos,
  mostrarTablaInsumos,
} from "./funciones-insumos.mjs";
import { registrarProducto, guardarMenu } from "./funciones-menu.mjs";

const insumos = dataInsumos.length > 0 ? dataInsumos : [];
const productos = dataMenu.length > 0 ? dataMenu : [];

while (true) {
  const queRegistrar = parseInt(
    await rl.question(
      "¿Qué desea registrar?: \n -Insumos (1) \n -Productos del menú (2)\n -Salir (3)\n",
    ),
  );

  switch (queRegistrar) {
    case 1:
      await registro(1);
      break;
    case 2:
      await registro(2);
      break;
    case 3:
      rl.close();
      break;
    default:
      console.log("Por favor, ingrese los números solicitados");
  }
}

async function registro(tipoRegistro) {
  while (true) {
    let registroValido = null;
    if (tipoRegistro === 1) {
      mostrarTablaInsumos();
      registroValido = await registrarInsumo();
    } else if (tipoRegistro === 2) {
      console.log("\n=== PRODUCTOS REGISTRADOS ===");
      if (productos.length > 0) {
        productos.forEach((producto) => {
          console.log(`${producto.nombre} - Precio: $${producto.precio}`);
        });
      } else {
        console.log("No hay productos registrados aún.");
      }
      console.log("");
      registroValido = await registrarProducto();
    }

    if (registroValido.valido) {
      if (tipoRegistro === 1) {
        insumos.push(registroValido.insumo);
      } else if (tipoRegistro === 2) {
        productos.push(registroValido.producto);
      }
      const continuar = await rl.question("¿Desea continuar registrando?: ");
      if (continuar === "N") {
        if (tipoRegistro === 1) {
          await guardarInsumos(
            "../mi-desayunito-project/web/json/insumos.json",
            `${JSON.stringify(insumos)}`,
          );
        } else if (tipoRegistro === 2) {
          await guardarMenu(
            "../mi-desayunito-project/web/json/menu.json",
            `${JSON.stringify(productos)}`,
          );
        }
        break;
      }
    }
  }
}

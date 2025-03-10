/* eslint-disable no-unused-vars */
import "./index.css";
import { useEffect, useState } from "react";
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "./api";

function App() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
  });

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const data = await obtenerProductos();
    setProductos(data);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const manejarCrear = async () => {
    await crearProducto(nuevoProducto);
    setNuevoProducto({ nombre: "", precio: "" });
    cargarProductos();
  };

  const manejarActualizar = async (id) => {
    const producto = productos.find((prod) => prod.id === id);
    const actualizado = {
      ...producto,
      nombre: prompt("Nuevo nombre:", producto.nombre),
      precio: prompt("Nuevo precio:", producto.precio),
    };
    await actualizarProducto(id, actualizado);
    cargarProductos();
  };

  const manejarEliminar = async (id) => {
    await eliminarProducto(id);
    cargarProductos();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        Gestión de Productos
      </h1>
      {/* Formulario para agregar productos */}
      <div className="mb-6">
        <input
          type="text"
          name="nombre"
          value={nuevoProducto.nombre}
          placeholder="Nombre del producto"
          onChange={manejarCambio}
          className="border p-2 rounded mr-2"
        />
        <input
          type="number"
          name="precio"
          value={nuevoProducto.precio}
          placeholder="Precio del producto"
          onChange={manejarCambio}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={manejarCrear}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Crear Producto
        </button>
      </div>

      {/* Tabla para mostrar productos */}
      <table className="w-full bg-white rounded shadow-md">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-4">ID</th>
            <th className="p-4">Nombre</th>
            <th className="p-4">Precio</th>
            <th className="p-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="border-b hover:bg-gray-100">
              <td className="p-4">{producto.id}</td>
              <td className="p-4">{producto.nombre}</td>
              <td className="p-4">${producto.precio}</td>
              <td className="p-4">
                <button
                  onClick={() => manejarActualizar(producto.id)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => manejarEliminar(producto.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

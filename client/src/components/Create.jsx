import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Create.css"; // Importa el archivo CSS para el estilo personalizado

function Create() {
  const [values, setValues] = useState({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
    sexo: "",
    chip: "",
  });

  const navigate = useNavigate();

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado con los siguientes valores:", values);
    try {
      const res = await axios.post("/add_mascota", values);
      console.log("Respuesta del servidor:", res);
      if (res.data.success) {
        alert(
          "Mascota creada exitosamente!"
        );        
        navigate("/");
      } else {
        alert(
          "Hubo un error al guardar la mascota. Por favor, inténtalo de nuevo."
        );
      }
    } catch (err) {
      console.error("Error:", err);
      alert(
        "Hubo un error al guardar la mascota. Por favor, inténtalo de nuevo."
      );
    }
  };

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="container-fluid bg-facebook d-flex align-items-center justify-content-center vh-100">
      <div className="col-md-6 bg-light p-5 rounded">
        <h3 className="text-center text-dark mb-4">Agregar Mascota</h3>
        <div className="d-flex justify-content-end">
          <Link to="/" className="btn btn-success">
            Inicio
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-group">
            <label htmlFor="nombre" className="text-white">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              onChange={handleChange}
              value={values.nombre}
              placeholder="Ingresa el nombre"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="especie" className="text-white">
              Especie
            </label>
            <input
              type="text"
              name="especie"
              className="form-control"
              onChange={handleChange}
              value={values.especie}
              placeholder="Especie"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="raza" className="text-white">
              Raza
            </label>
            <input
              type="text"
              name="raza"
              className="form-control"
              onChange={handleChange}
              value={values.raza}
              placeholder="Raza"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edad" className="text-white">
              Edad
            </label>
            <input
              type="number"
              name="edad"
              className="form-control"
              onChange={handleChange}
              value={values.edad}
              placeholder="Edad"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="sexo" className="text-white">
              Sexo
            </label>
            <input
              type="text"
              name="sexo"
              className="form-control"
              onChange={handleChange}
              value={values.sexo}
              placeholder="Sexo"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="chip" className="text-white">
              Chip
            </label>
            <input
              type="text"
              name="chip"
              className="form-control"
              onChange={handleChange}
              value={values.chip}
              placeholder="Chip"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;

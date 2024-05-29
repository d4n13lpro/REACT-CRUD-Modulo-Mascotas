import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

function Edit() {
  const [values, setValues] = useState({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
    sexo: "",
    chip: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/get_mascota/${id}`)
      .then((res) => {
        setValues(res.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/update_mascota/${id}`, values);
      if (res.data.success) {        
        alert('Mascota actualizada exitosamente');
        navigate('/');

      } else {
        alert('Hubo un error al actualizar la mascota. Por favor, inténtalo de nuevo.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Hubo un error al actualizar la mascota. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="container-fluid bg-facebook d-flex align-items-center justify-content-center vh-100">
      <div className="col-md-6 bg-light p-5 rounded">
        <h3 className="text-center text-dark mb-4">Editar Mascota</h3>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/" className="btn btn-success">Inicio</Link>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre" className="text-white">Nombre</label>
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
            <label htmlFor="especie" className="text-white">Especie</label>
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
            <label htmlFor="raza" className="text-white">Raza</label>
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
            <label htmlFor="edad" className="text-white">Edad</label>
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
            <label htmlFor="sexo" className="text-white">Sexo</label>
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
            <label htmlFor="chip" className="text-white">Chip</label>
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
          <button type="submit" className="btn btn-primary mt-3">Actualizar</button>
        </form>
      </div>
    </div>
  );
}

export default Edit;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // Importa el archivo CSS para el estilo personalizado

function Home() {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    axios.get('/mascotas')
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta mascota?');
    if (confirmDelete) {
      try {
        await axios.delete(`/delete_mascota/${id}`);
        setData(data.filter(mascota => mascota.id !== id));
        alert('Mascota eliminada exitosamente');
      } catch (err) {
        console.error('Error al eliminar Mascota:', err);
        alert('Hubo un error al eliminar Mascota. Por favor, inténtalo de nuevo.');
      }
    }
  };

  return (
    <div className="container-fluid bg-facebook d-flex align-items-center justify-content-center vh-100">
      <div className="col-md-8 bg-light p-5 rounded">
        <h3 className="text-center text-dark mb-4">Lista de Mascotas</h3>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/create" className="btn btn-success">Agregar Mascota</Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Especie</th>
              <th>Raza</th>
              <th>Edad</th>
              <th>Sexo</th>
              <th>Chip</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((mascota) => (
              <tr key={mascota.id}>
                <td>{mascota.id}</td>
                <td>{mascota.nombre}</td>
                <td>{mascota.especie}</td>
                <td>{mascota.raza}</td>
                <td>{mascota.edad}</td>
                <td>{mascota.sexo}</td>
                <td>{mascota.chip}</td>
                <td>
                  <Link to={`/read/${mascota.id}`} className="btn btn-info btn-sm me-2">Leer</Link>
                  <Link to={`/edit/${mascota.id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(mascota.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;

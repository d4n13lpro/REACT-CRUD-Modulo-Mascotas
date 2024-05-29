import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function Read() {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/get_mascota/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div className="container-fluid bg-facebook d-flex align-items-center justify-content-center vh-100">
  <div className="col-md-6 bg-light p-5 rounded text-dark">
    <h3 className="text-center text-dark mb-4">Detalles de la Mascota</h3>
    <div className="d-flex justify-content-end mb-3">
      <Link to="/" className="btn btn-success">Inicio</Link>
    </div>

    <div className="form-group">
      <label className="text-secondary">Nombre:</label>
      <p className="font-weight-bold ml-2">{data.nombre}</p>
    </div>
    <div className="form-group">
      <label className="text-secondary">Especie:</label>
      <p className="font-weight-bold">{data.especie}</p>
    </div>
    <div className="form-group">
      <label className="text-secondary">Raza:</label>
      <p className="font-weight-bold">{data.raza}</p>
    </div>
    <div className="form-group">
      <label className="text-secondary">Edad:</label>
      <p className="font-weight-bold">{data.edad}</p>
    </div>
    <div className="form-group">
      <label className="text-secondary">Sexo:</label>
      <p className="font-weight-bold">{data.sexo}</p>
    </div>
    <div className="form-group">
      <label className="text-secondary">Chip:</label>
      <p className="font-weight-bold">{data.chip}</p>
    </div>
  </div>
</div>

  );
}

export default Read;

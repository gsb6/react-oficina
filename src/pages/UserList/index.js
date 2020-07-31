import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../services/users";
import teste from "../../assets/teste.png";
import "./styles.css";

function UserList() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const getRows = (user) => (
    <div className="contentRow" key={user.id}>
      <img className="imageProfile" src={teste} alt="imagem do usuário" />
      <div>
        <h3>{user.name}</h3>
        <p>{user.register}</p>
      </div>
    </div>
  );

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <div className="contentFilters">
        <div>
          <h2>Filtrar Por</h2>
        </div>
        <input type="text" placeholder="Busca por nome"></input>

        <select>
          <option value="">Selecione...</option>
        </select>
      </div>

      <div>{users.map((user) => getRows(user))}</div>
    </div>
  );
}

export default UserList;

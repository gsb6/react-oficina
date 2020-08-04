/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../../services/users';
import teste from '../../assets/teste.png';
import './styles.css';
import EditIcon from '../../assets/icons/EditButton.svg';
import DeleteIcon from '../../assets/icons/DeleteButton.svg';
import { toast } from 'react-toastify';
import FormField from '../../components/FormField';
import Select from '../../components/Select';
import Loader from '../../components/Loader';

function UserList({ history }) {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchActive, setSearchActive] = useState('');
  const [searchCourse, setSearchCourse] = useState('');
  const [loading, setLoading] = useState(true);

  const getUsers = async (query) => {
    setLoading(true);
    const data = await getAllUsers(query);
    setUsers(data);
    setLoading(false);
  };

  const deleteUserRow = async (userId) => {
    await deleteUser(userId);
    toast(`Usuário ${userId} excluído com sucesso!`);
    getUsers();
  };

  const getRows = (user) => (
    <tr key={user.id}>
      <td>
        <img className="imageProfile" src={teste} alt="imagem do usuário" />
      </td>
      <td>{user.name}</td>
      <td>{user.register} </td>
      <td>{user.course}</td>
      <td>
        {user.status ? (
          <span className="badge active-badge">Ativo</span>
        ) : (
          <span className="badge inactive-badge">Inativo</span>
        )}
      </td>
      <td>
        <td>
          <img
            onClick={() => history.push(`user/${user.id}`)}
            src={EditIcon}
            alt="Editar usuário"
          />
        </td>
        <td>
          <img
            onClick={() => deleteUserRow(user.id)}
            src={DeleteIcon}
            alt="Excluir usuário"
          />
        </td>
      </td>
    </tr>
  );

  useEffect(() => {
    const searching = setTimeout(() => {
      getUsers(
        `?name_like=${searchName || ''}&status_like=${
          searchActive || ''
        }&course_like=${searchCourse || ''}`
      );
    }, 500);
    return () => {
      clearTimeout(searching);
    };
  }, [searchName, searchActive, searchCourse]);

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Filtros</h2>
        </div>
        <div className="form-row">
          <FormField
            type="text"
            label="Pesquisar"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            name="search"
            placeholder="Pesquisar"
          />
          <Select
            name="course"
            placeholder="Curso"
            value={searchCourse}
            label="Curso"
            onChange={(e) => setSearchCourse(e.target.value)}
            options={[
              { label: 'React', value: 'React' },
              { label: 'Node', value: 'Node' },
            ]}
          />
          <Select
            name="status"
            placeholder="Status"
            value={searchActive}
            label="Status"
            onChange={(e) => setSearchActive(e.target.value)}
            options={[
              { label: 'Ativo', value: true },
              { label: 'Inativo', value: false },
            ]}
          />
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h2>Alunos cadastrados</h2>
          <button
            onClick={() => history.push('register/user')}
            className="primary-button"
          >
            Cadastrar
          </button>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <table>
            <thead>
              <th></th>
              <th>Nome</th>
              <th>Matricula</th>
              <th>Curso</th>
              <th>Status</th>
              <th>Ações</th>
            </thead>
            <tbody>{users.map((user) => getRows(user))}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UserList;

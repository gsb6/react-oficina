/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../../services/users";
import teste from "../../assets/teste.png";
import "./styles.css";
import EditIcon from "../../assets/icons/EditButton.svg";
import DeleteIcon from "../../assets/icons/DeleteButton.svg";
import FormField from '../../components/FormField';
import Select from '../../components/Select';
import Loader from '../../components/Loader';

function UserList({ history}) {
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
    window.alert(`Usuário ${userId} excluído com sucesso!`);
    getUsers();
  };

  const getRows = (user) => (
    <tr className="trStyled" key={user.id}>
      <td style={{textAlign: 'center'}}>
        <img className="imageProfile" src={teste} alt="imagem do usuário" />
      </td>
      <td>
        <p>{user.name}</p>
      </td>
      <td>
        <p>{user.register}</p>
      </td>
      <td>
        <p>{user.course}</p>
      </td>
      <td>
        {user.status ? 
          <td style={{background: '#C9F7F5'}} className='badge'>
            <p style={{color: '#1BC5BD'}}>Ativo</p>
          </td> : 
          <td style={{background: '#FFE2E5'}} className='badge'>
            <p color={{color: '#F64E60'}}>Inativo</p>
          </td>
        }   
      </td>
      <td>
        <td style={{cursor: 'pointer'}}>
          <img onClick={() => history.push(`user/${user.id}`)} src={EditIcon} alt="Editar usuário"/>
        </td>
        <td style={{cursor: 'pointer'}}>
          <img onClick={() => deleteUserRow(user.id)} src={DeleteIcon} alt="Excluir usuário"/>
        </td>
      </td>
    </tr>
  );

  useEffect(() => {
    const searching = setTimeout(() => {
      getUsers(`?name_like=${searchName || ''}&status_like=${searchActive || ''}&course_like=${searchCourse || ''}`);
    }, 500);
    return () => {
      clearTimeout(searching);
    };
  }, [searchName, searchActive, searchCourse]);

  return (
    <div className="container">
      <div className="wrapperFilters">
        <div>
          <h2 className="title">Filtros</h2>
        </div>
        <span className="line"/>
        <div className="rowFilters">
          <FormField type='text' width='30%' value={searchName} onChange={(e) => setSearchName(e.target.value)} name='search' placeholder="Pesquisar"/>
          <Select name='course' placeholder='Curso' value={searchCourse} 
            onChange={(e) => setSearchCourse(e.target.value)}
            width='30%' 
            options={[{label:"React", value:"React"}, {label:"Node", value:"Node"}]}
          />
          <Select name='status' placeholder='Status' value={searchActive} 
            onChange={(e) => setSearchActive(e.target.value)} 
            width='30%' 
            options={[{label:"Ativo", value:true}, {label:"Inativo", value:false}]}
          /> 
        </div>
      </div>
      
      <table className="table-users">
        <tr style={{marginTop: '40px'}}>
          <th></th>
          <th>Nome</th>
          <th>Matricula</th>
          <th>Curso</th>
          <th>Status</th>
          <th style={{textAlign: 'center'}}>Ações</th>
        </tr>
        <tbody>
          { loading ? <Loader/> : users.map((user) => getRows(user))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;

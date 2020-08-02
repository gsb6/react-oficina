import React, { useEffect, useState } from "react";
import FormUser from '../../components/FormUser';
import { getUserById } from '../../services/users';
import Loader from '../../components/Loader';

function UserEdit({ match }) {
  const [userValues, setUserValues] = useState({});
  const [ loading, setLoading] = useState(true);
  
  useEffect( () => {
    const getUser = async () => {
      const user = await getUserById(match.params.id);
      setUserValues(user);
      setLoading(false);
    };

    getUser();
  }, [match.params.id])

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('eee', e.target.name.value);
  }

  return (
    loading ? 
      <Loader /> : 
      <FormUser initialValues={userValues} onSubmit={onSubmit} buttonText='Alterar'/>
  );
}

export default UserEdit;

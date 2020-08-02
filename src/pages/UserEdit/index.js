import React, { useEffect, useState } from "react";
import FormUser from "../../components/FormUser";
import { getUserById } from "../../services/users";
import Loader from "../../components/Loader";
import "./styles.css";

function UserEdit({ match, history }) {
  const [userValues, setUserValues] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserById(match.params.id);
      setUserValues(user);
      setLoading(false);
    };

    getUser();
  }, [match.params.id]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("eee", e.target.name.value);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="wrapperEdit">
      <div>
        <h2 className="title">Editar Aluno</h2>
      </div>
      <span className="line" />
      <FormUser
        goBack={() => history.push("/")}
        initialValues={userValues}
        onSubmit={onSubmit}
        buttonCancelText="Cancelar"
        buttonSubmitText="Alterar"
      />
    </div>
  );
}

export default UserEdit;

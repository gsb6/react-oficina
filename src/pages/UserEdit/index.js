import React, { useEffect, useState } from "react";
import FormUser from "../../components/FormUser";
import { getUserById, updateUser } from "../../services/users";
import Loader from "../../components/Loader";
import "./styles.css";

function UserEdit({ match, history }) {
  const [userValues, setUserValues] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserById(match.params.id);

      if (user.birthDate) {
        const dates = user.birthDate.split("-");
        user.year = dates[0];
        user.month = dates[1];
        user.day = dates[2];
      }

      setUserValues(user);
      setLoading(false);
    };

    getUser();
  }, [match.params.id]);

  const onSubmit = async (values) => {
    const data = await updateUser(match.params.id, values);
    if (data) {
      alert("Registro alterado com sucesso!");
      history.push("/");
    }
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

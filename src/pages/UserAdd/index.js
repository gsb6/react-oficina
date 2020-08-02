import React, { useEffect, useState } from "react";
import { createUser } from "../../services/users";
import FormUser from "../../components/FormUser";
import "./styles.css";

function UserAdd({ history }) {
  const onSubmit = async (values) => {
    const data = await createUser(values);
    if (data) {
      alert("Registro criado com sucesso!");
      history.push("/");
    }
  };

  return (
    <div className="wrapperAdd">
      <div>
        <h2 className="title">Cadastro de Aluno</h2>
      </div>
      <span className="line" />
      <FormUser
        initialValues={{}}
        goBack={() => history.push("/")}
        onSubmit={onSubmit}
        buttonCancelText="Cancelar"
        buttonSubmitText="Cadastrar"
      />
    </div>
  );
}

export default UserAdd;

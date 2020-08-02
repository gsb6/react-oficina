import React, { useEffect, useState } from "react";
import FormUser from "../../components/FormUser";
import "./styles.css";

function UserAdd({ history }) {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("eee", e.target.name.value);
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
        buttonSubmitText="Alterar"
      />
    </div>
  );
}

export default UserAdd;

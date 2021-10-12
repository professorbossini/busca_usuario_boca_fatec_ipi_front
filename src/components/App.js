import React, { useState } from "react";

import axios from "axios";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";

const App = () => {
  const [termoDeBusca, setTermoDeBusca] = useState("");
  const [resultados, setResultados] = useState([]);
  const url = `https://boca-fatec-ipi-backend.herokuapp.com/dados`;

  const getLoginData = async (termoDeBusca) => {
    const result = await axios.get(`${url}/${termoDeBusca}`);
    // console.log(result);
    setResultados([result.data]);
  };
  return (
    <div className="grid mt-4 justify-content-center">
      <div className="col-12 md:col-8 lg:col-6 border-400">
        <Card
          title="Fatecs Ipiranga & Carapicuiba - Treinamento para o Interfatecs"
          subTitle="Encontre seu usuário/senha"
        >
          <div className="p-float-label border border-1 border-400">
            <InputText
              id="nome"
              className="text-center w-full"
              value={termoDeBusca}
              onChange={(event) => setTermoDeBusca(event.target.value)}
            />
            <label htmlFor="nome">Digite o cpf de um dos integrantes</label>
          </div>
          <Button
            label="OK"
            className="p-button-outlined w-full my-2"
            onClick={() => {
              getLoginData(termoDeBusca);
              setTermoDeBusca("");
            }}
          />
          {resultados.length > 0 ? (
            <Button
              label="Limpar"
              className="p-button-outlined p-button-danger w-full my-2"
              onClick={() => {
                setResultados([]);
                setTermoDeBusca("");
              }}
            />
          ) : null}

          {resultados.length > 0 ? <p>Veja os resultados.</p> : null}
          <DataTable value={resultados} emptyMessage="Nada a exibir">
            <Column field="time" header="Time"></Column>
            <Column field="integrantes" header="Integrantes"></Column>
            <Column field="login" header="Login"></Column>
            <Column field="senha" header="Senha"></Column>
          </DataTable>
        </Card>
      </div>
    </div>
  );
};

export default App;

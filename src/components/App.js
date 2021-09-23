import React, { useState } from 'react'

import axios from 'axios'

import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'

const App = () => {
    const [termoDeBusca, setTermoDeBusca] = useState('')
    const [resultados, setResultados] = useState([])
    const url = `https://boiling-ocean-63801.herokuapp.com/dados_para_maratona`

    const getLoginData = async (termoDeBusca) => {
        const result = await axios.get(url, {params: {termoDeBusca}})
        console.log(result)
        setResultados(result.data)
    }
    return (
        <div className="grid mt-4 justify-content-center">
            <div className="col-12 md:col-8 lg:col-6 border-400">
                <Card 
                    title="Mauá - Mini Maratona de Programação com Python 3"
                    subTitle="Encontre seu usuário/senha">
                    <div className="p-float-label border border-1 border-400">
                        <InputText
                            id="nome"
                            className="text-center w-full"
                            value={termoDeBusca}
                            onChange={(event) => setTermoDeBusca(event.target.value) }
                        />
                        <label htmlFor="nome">Digite parte de seu nome</label>
                    </div>  
                    <Button
                        label="OK"
                        className="p-button-outlined w-full my-2"
                        onClick={() => {
                            getLoginData(termoDeBusca)
                            setTermoDeBusca('')
                        }}
                    />
                    {
                        resultados.length > 0 ?
                            <Button
                                label="Limpar"
                                className="p-button-outlined p-button-danger w-full my-2"
                                onClick={() => {
                                    setResultados([])
                                    setTermoDeBusca('')
                                }}
                            />
                        :
                        null
                    }
                    {resultados.length > 0 ? <p>Veja os resultados. Pegue apenas o seu. :)</p>: null}
                    <DataTable value={resultados} emptyMessage="Nada a exibir">
                        <Column field="userfullname" header="Nome completo"></Column>
                        <Column field="username" header="Login"></Column>
                        <Column field="userpassword" header="Senha"></Column>
                    </DataTable>
                </Card>
            </div>
        </div>
    )
}

export default App

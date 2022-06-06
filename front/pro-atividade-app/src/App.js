import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, Modal } from 'react-bootstrap';

import AtividadeForm from './components/AtividadeForm';
import AtividadeLista from './components/AtividadeLista';
import api from './api/atividade';


function App() {

  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({ id: 0 });

  // -------------------
  // MODAL
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const toogleAtividadeModal = () => setShowAtividadeModal(!showAtividadeModal);

  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);


  const toogleConfirmModal = (id) => {
    if (id !== 0 && id !== undefined) {
      const atividade = atividades.filter(atividade => atividade.id === id);
      setAtividade(atividade[0]);
    } else {
      setAtividade({ id: 0 });
    }
    setSmShowConfirmModal(!smShowConfirmModal);
  };
  // -------------------


  useEffect(() => {
    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades();
      if (todasAtividades) setAtividades(todasAtividades);
    };
    getAtividades();
  }, []);



  const pegaTodasAtividades = async () => {
    const response = await api.get('atividade');
    return response.data;
  };



  const addAtividade = async (ativ) => {
    toogleAtividadeModal();
    const response = await api.post('atividade', ativ);
    setAtividades([...atividades, response.data]);
  }



  const atualizarAtividade = async (ativ) => {
    toogleAtividadeModal();
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    const { id } = response.data;
    setAtividades(atividades.map((item) => (item.id === id ? response.data : item)));
    setAtividade({ id: 0 });
  }



  const deletarAtividade = async (id) => {
    toogleConfirmModal(0);
    if (await api.delete(`atividade/${id}`)) {
      const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id);
      setAtividades([...atividadesFiltradas]);
    }
  }



  const novaAtividade = () => {
    setAtividade({ id: 0 });
    toogleAtividadeModal();
  }

  const cancelarAtividade = () => {
    setAtividade({ id: 0 });
    toogleAtividadeModal();
  }

  const pegarAtividade = (id) => {
    const atividade = atividades.filter(atividade => atividade.id === id);
    setAtividade(atividade[0]);
    toogleAtividadeModal();
  }



  return (
    <>
      <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
        <h1 className='m-0 p-0'>Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>

        <Button variant="outline-secondary" onClick={novaAtividade}>
          <i className="fas fa-plus"></i>
        </Button>
      </div>

      <AtividadeLista
        atividades={atividades}
        pegarAtividade={pegarAtividade}
        toogleConfirmModal={toogleConfirmModal}
      />


      <Modal show={showAtividadeModal} onHide={toogleAtividadeModal}>

        <Modal.Header closeButton>
          <Modal.Title>
            Atividade {atividade.id !== 0 ? atividade.id : ''}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AtividadeForm
            addAtividade={addAtividade}
            cancelarAtividade={cancelarAtividade}
            atualizarAtividade={atualizarAtividade}
            ativSelecionada={atividade}
            atividades={atividades}
          />
        </Modal.Body>

      </Modal>


      <Modal sise='sm' show={smShowConfirmModal}
        onHide={toogleConfirmModal}
      >

        <Modal.Header closeButton>
          <Modal.Title>
            Excluindo Atividade {atividade.id !== 0 ? atividade.id : ''}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Tem certeza que deseja excluir a Atividade {atividade.id}?
        </Modal.Body>

        <Modal.Footer className='d-flex justify-content-between'>
          <button className="btn btn-outline-success me-2"
            onClick={() => deletarAtividade(atividade.id)}
          >
            <i className="fas fa-check me-2" />
            Sim
          </button>
          <button className="btn btn-danger me-2"
            onClick={() => toogleConfirmModal(0)}
          >
            <i className="fas fa-times me-2" />
            Não
          </button>
        </Modal.Footer>

      </Modal>



    </>
  );

}

export default App;


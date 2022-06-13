import React from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard';
import Atividade from './pages/atividades/Atividade';
import Cliente from './pages/clientes/Cliente';
import ClienteForm from './pages/clientes/ClienteForm';
import PageNotFound from './pages/PageNotFound';


export default function App() {
  return (
    <Switch>
        <Route path='/' exact component={Dashboard} />
        <Route path='/atividade/lista' component={Atividade} />
        <Route path='/cliente/lista' component={Cliente} />
        <Route path='/cliente/:id/atividade' component={Atividade} />
        <Route path='/cliente/detalhe/:id?' component={ClienteForm} />
        <Route component={PageNotFound} />
    </Switch>
  );
}


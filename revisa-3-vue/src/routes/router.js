import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages-professores/Home'),
  },
  {
    path: '/simulados-atividades-escolares-professores',
    name: 'SimuladosAtividadesInicio',
    component: () => import('../pages-professores/simulado-ativiades-escolares/SimuladosAtividadesInicio'),
  },
  {
    path: '/simulado-responder-professores',
    name: 'QuestoesSimuladosAtividades',
    component: () => import('../components-professores/QuestoesSimuladosAtividades'),
  },
  {
    path: '/simulado-escolar-desempenho-professores',
    name: 'DesempenhoSimulado',
    component: () => import('../pages-professores/simulado-ativiades-escolares/DesempenhoSimulado'),
  },
  {
    path: '/redacoes-professores',
    name: 'RedacaoInicio',
    component: () => import('../pages-professores/redacao/RedacaoInicio'),
  },
  {
    path: '/redacao-corrigida-professores',
    name: 'RedacaoCorrigida',
    component: () => import('../pages-professores/redacao/RedacaoCorrigida'),
  },
  {
    path: '/redacao-enviar-professores',
    name: 'RedacaoEnviar',
    component: () => import('../pages-professores/redacao/RedacaoEnviar'),
  },
  {
    path: '/ranking-professores',
    name: 'Ranking',
    component: () => import('../pages-professores/Ranking'),
  },
  {
    path: '/desempenho-geral-professores',
    name: 'DesempenhoGeral',
    component: () => import('../pages-professores/DesempenhoGeral'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

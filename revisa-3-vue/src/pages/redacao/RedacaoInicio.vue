<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>
          Redações
        </h1>
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12">
        <header-secao>
          Redações para fazer
        </header-secao>
      </v-col>

      <!-- card das redacoes para fazer -->
      <v-col
          cols="12" sm="6"
          md="4"
          v-for="redacao in redacoesFazer" :key="redacao.nome"
      >
        <v-card
            class="destaque__redacao transition rounded__normal cursor__pointer btn__shadow" to="/redacao-enviar"
        >
          <v-card-text>
            <article class="d-flex align-end justify-space-between">
              <!-- descricoes da redacao -->
              <v-card-title class="pa-0 d-inline-block grey--text text--darken-3">
                {{ redacao.nome }}
              </v-card-title>

              <p class="caption font-weight-bold">
                sua nota <span class="font-weight-bold"> -- </span>
              </p>
            </article>

            <p class="grey--text text--darken-3">
              {{ redacao.tema }}
            </p>

            <article class="mt-4 relative">
              <p class="font-weight-bold grey--text text--darken-3">
                {{ `Acessar a sua ${redacao.nome}` }}
              </p>

              <!-- icone para acessar -->
              <v-icon
                  v-text="'mdi-location-enter'" class="w__icons__28 absolute bottom-0 right-0"
              />
            </article>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- card das redacoes corrigidas -->
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Redações corrigidas e em correção
        </header-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4"
          v-for="redacaoCorrigida in redacoesCorrigidas" :key="redacaoCorrigida.nome"
      >
        <v-card
            class="destaque__redacao__corrgidas transition rounded__normal cursor__pointer btn__shadow" to="/redacao-corrigida"
        >
          <v-card-text>
            <article class="d-flex align-end justify-space-between relative z-1">
              <!-- descricoes da redacao -->
              <v-card-title class="pa-0 grey--text text--darken-3">
                {{ redacaoCorrigida.nome }}
              </v-card-title>

              <p class="caption font-weight-bold grey--text text--darken-3">
                sua nota
                <span class="text-h4 font-weight-bold  grey--text text--darken-3">
                {{ redacaoCorrigida.nota }}
              </span>
              </p>

              <div class="bolinha__notificacao absolute top-0 right-0 z--1" />
            </article>

            <p class="grey--text text--darken-3">
              {{ redacaoCorrigida.tema }}
            </p>

            <article class="mt-4 relative">
              <p class="font-weight-bold grey--text text--darken-3">
                {{ `Ver correção da ${redacaoCorrigida.nome}` }}
              </p>

              <!-- icone para acessar -->
              <v-icon
                  v-text="'mdi-location-enter'" class="w__icons__28 absolute bottom-0 right-0"
              />
            </article>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- desempenho das redacoes -->
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Meu desempenho nas redaçãoes
        </header-secao>
      </v-col>

      <v-col
          cols="12"
          md="8"
      >
        <div class="random">
          <trend-chart
              :datasets="datasets" :grid="grid"
              :labels="labels" :min="0"
              :interactive="true" @mouse-move="onMouseMove"
              class="random-chart"
          />

          <div
              id="pop" role="tooltip"
              ref="tooltip" class="tooltip"
              :class="{'is-active': tooltipData}"
          >
            <div
                class="tooltip-container" v-if="tooltipData"
            >
              <strong>{{labels.xLabels[tooltipData.index]}}</strong>
              <section class="tooltip-data">
                <div class="tooltip-data-item tooltip-data-item--2">
                  <article>
                    {{ tooltipData.data[1] }}

                    <p class="caption">
                      Meu desempenho
                    </p>
                  </article>
                </div>
                <div class="tooltip-data-item tooltip-data-item--3">
                  <article>
                    {{ tooltipData.data[2] }}

                    <p class="caption">
                      Desempenho da turma
                    </p>
                  </article>
                </div>
              </section>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import '../../sass/chart.css';

import Vue from 'vue';
import TrendChart from 'vue-trend-chart';
import Popper from 'popper.js';

Vue.use(TrendChart);

export default {

  name: 'RedacaoInicio',

  data () {
    return {
      redacoesFazer: [
        {
          nome: 'Redação 3',
          entrega: '18/08',
          tema: 'Tema da redação é o seguinte assim e assado, mas que isso é aquilo',
        },
      ],

      // chart
      datasets: [
        {
          // o primeiro objeto serve apenas para definir o ponto máximo do gráfico
          data: [1000],
          className: 'curve1',
        },
        {
          // meu desempenho
          data: [400, 800, 840, 920],
          smooth: true,
          showPoints: true,
          className: 'curve2',
        },
        {
          // desempenho da turma
          data: [600, 720, 640, 1000],
          smooth: true,
          showPoints: true,
          className: 'curve3',
        },

      ],
      grid: {
        verticalLines: true,
        horizontalLines: true,
      },
      labels: {
        xLabels: ['Redação 1', 'Redação 2', 'Redação 3', 'Redação 4'],
        yLabels: 6,
        yLabelsTextFormatter: (val) => val,
      },
      tooltipData: null,
      popper: null,
      popperIsActive: false,
      // fim do chart

      redacoesCorrigidas: [
        {
          nome: 'Redação 1',
          enviada: '01/08',
          tema: 'Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae',
          nota: 800,
        },
        {
          nome: 'Redação 2',
          enviada: '13/08',
          tema: 'Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Leite de capivaris, leite de mula manquis sem cabeça.',
          nota: 700,
        },
      ],
    };
  },

  methods: {
    initPopper () {
      const chart = document.querySelector('.random-chart');
      const ref = chart.querySelector('.active-line');
      const { tooltip } = this.$refs;
      this.popper = new Popper(ref, tooltip, {
        placement: 'right',
        modifiers: {
          offset: { offset: '0,10' },
          preventOverflow: {
            boundariesElement: chart,
          },
        },
      });
    },
    onMouseMove (params) {
      this.popperIsActive = !!params;
      this.popper.scheduleUpdate();
      this.tooltipData = params || null;
    },
  },
  mounted () {
    this.initPopper();
  },

};
</script>

<style scoped>

</style>

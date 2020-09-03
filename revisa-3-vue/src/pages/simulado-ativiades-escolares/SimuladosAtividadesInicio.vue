<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>
          Simulados disponíveis
        </h1>

        <h3>
          Todas as disciplinas
        </h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <header-secao>
          Novos Simulados e Atividades escolares
        </header-secao>
      </v-col>
    </v-row>

    <v-row
        cols="12" :class="[ area.notificacao ? '' : 'd-none']"
        v-for="(area, areaNome, i) in areas" :key="areaNome"
    >
      <v-col
          cols="12" :class="i !== 0 ? 'mt-8' : i"
      >
        <subheader-secao>
          {{ `${areaNome.charAt(0).toUpperCase()}${areaNome.slice(1)}` }}
        </subheader-secao>
      </v-col>

      <!-- card da disciplina com nova atividade ou simulado-->
      <v-col
          cols="12" sm="6"
          md="4" lg="3"
          v-for="(disciplina, i) in area.disciplinas" :key="disciplina"
      >
        <v-card
            class="transition rounded__normal cursor__pointer btn__shadow" :class="`destaque__escolares__${areaNome}`"
            to="/simulado-responder"
        >
          <v-card-text>
            <article class="d-flex align-center relative z-1">
              <v-img
                  :src="require(`@/assets/icon/disciplinas/${disciplina}.png`)" width="30"
                  class="flex-grow-0"
              />

              <p class="ml-2 text-h6 leading__tight grey--text text--darken-3">
                {{ area.ttl[i] }}
              </p>

              <!-- sino de notificacao -->
              <div
                  class="bolinha__notificacao d-flex align-center justify-center absolute top--2 right--2 font-weight-bold
                  grey--text text--darken-3 z--1"
              >
                {{ area.quantidadeNotificacao}}
              </div>
              <v-icon
                  v-text="'mdi-bell'" class="w__icons__28 icone__backdrop absolute top-0 right-0 z-10"
              />
            </article>

            <!-- quantas notificacoes são -->
            <p class="mt-2 black--text">
              {{ area.textoNotificacao }}
            </p>

            <!-- texto para acessar as atividades novas-->
            <article class="mt-8 relative">
              <p class="font-weight-bold grey--text text--darken-3">
                {{ `Fazer ${area.textoNotificacao.split(' ')[4]} de  ${disciplina}` }}
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

    <!-- seção para selecionar um professor e ver as atividades e simulados dele-->
    <v-row class="mt-12">
      <v-col cols="12">
        <header-secao>
          Selecione um professor para ver suas atividades
        </header-secao>
      </v-col>

      <v-col
          class="d-flex"
          cols="12" sm="6"
          md="4" lg="3"
      >
        <v-select
            :items="professores" color="azul"
            filled label="Selecione o(a) professor(a)"
            v-model="professorSelecionado" hide-details
        />
      </v-col>
    </v-row>

    <!-- seção de simulados específicos por professor/disciplina -->
    <v-row
        v-if="professorSelecionado != null" class="mt-4"
    >
      <v-col cols="12">
        <subheader-secao>
          Simulados e Atividades escolares para entregar de {{ professorSelecionado }}
        </subheader-secao>
      </v-col>

      <!-- seção de tarefas para entregar-->
      <v-col
          cols="12" sm="6"
          md="4"
          v-for="atividade in atividadesEntregar" :key="atividade.nome"
      >
        <v-card
            class="btn__shadow transition cursor__pointer" to="/simulado-responder"
        >
          <v-card-text>
            <article class="d-flex align-start relative z-1">
              <v-icon v-text="'format-list-checkbox'" />
              <div>
                <v-card-title class="pa-0 grey--text text--darken-3">
                  <p class="mr-4 d-flex align-start leading__tight text-break">
                    <v-icon
                        v-text="'mdi-format-list-checkbox'" class="mr-1 hidden-sm-and-down d-md-inline-block grey--text text--darken-3"
                        color="black"
                    />

                    {{ atividade.nome }}
                  </p>
                </v-card-title>

                <p class="mt-2 red--text">
                  {{ atividade.entrega}}
                </p>
              </div>

              <v-img
                  :src="require(`@/assets/icon/disciplinas/${atividade.icon}.png`)" class="w-40 flex-grow-0 absolute top-0 right-0"
              />
              <div
                  :class="`bolinha__${atividade.area}`" class="absolute top-0 right-0 z--1"
              />
            </article>

            <p class="mt-4 font-weight-bold grey--text text--darken-3">
              {{ `Total de questões: ${atividade.questoesFeitas}/${atividade.quantidadeQuestoes}` }}
            </p>

            <!-- barra de progesso -->
            <article class="mt-4 w-3/4">
              <p class="caption font-weight-bold">
                {{ `${atividade.porcentagem} respondido`  }}
              </p>
              <v-progress-linear
                  :color="atividade.area" rounded
                  v-model="atividade.porcentagem" class="w-full"
              />
            </article>

            <article class="mt-4 relative">
              <p class="font-weight-bold grey--text text--darken-3">
                {{ `Fazer ${atividade.nome}` }}
              </p>

              <!-- icone para acessar -->
              <v-icon
                  v-text="'mdi-location-enter'" class="w__icons__28 absolute bottom-0 right-0"
              />
            </article>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- seção de tarefas já finalizadas-->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Simulados e Atividades finalizados
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4"
          v-for="atividadeFinalizada in atividadesFinalizadas" :key="`${atividadeFinalizada.nome} finalizado`"
      >
        <v-card class="btn__shadow transition cursor__pointer">
          <v-card-text>
            <article class="d-flex align-start relative z-1">
              <div>
                <v-card-title class="pa-0 grey--text text--darken-3">
                  <p class="mr-4 d-flex align-start leading__tight text-break">
                    <v-icon
                        v-text="'mdi-format-list-checkbox'" class="mr-1 hidden-sm-and-down d-md-inline-block"
                        color="black"
                    />

                    {{ atividadeFinalizada.nome }}
                  </p>
                </v-card-title>

                <p class="mt-2 d-inline-block relative grey--text text--darken-3 font-weight-medium grey--text text--darken-3 z-1">
                  {{ `Resultado: ${atividadeFinalizada.resultado}/${atividadeFinalizada.quantidadeQuestoes} acertos` }}

                  <v-icon
                      v-text="'mdi-checkbox-marked-circle-outline'" small
                      color="black"
                  />

                  <span class="bolinha__acertos absolute top-0 right--1 z--1" />
                </p>

                <p class="grey--text text--darken-3 font-weight-medium">
                  Finalizado em {{ atividadeFinalizada.finalizado }}
                </p>
              </div>

              <v-img
                  :src="require(`@/assets/icon/disciplinas/${atividadeFinalizada.icon}.png`)"
                  class="w-40 flex-grow-0 absolute top-0 right-0"
              />
              <div
                  :class="`bolinha__finalizado`" class="absolute top-0 right-0 z--1"
              />
            </article>

            <!-- barra de progesso -->
            <article class="mt-8 w-3/4">
              <p class="caption font-weight-bold">
                {{ `${atividadeFinalizada.porcentagemAcerto} de acerto`  }}
              </p>
              <v-progress-linear
                  color="desempenhoOtimo" rounded
                  v-model="atividadeFinalizada.porcentagemAcerto" class="w-full"
              />
            </article>

            <article class="mt-4 relative">
              <p class="font-weight-bold grey--text text--darken-3">
               Acessar o meu desempeho
              </p>

              <!-- icone para acessar -->
              <v-icon
                  v-text="'mdi-location-enter'" class="w__icons__28 absolute bottom-0 right-0"
              />
            </article>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- seção de tarefas já expiradas-->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Simulados e Atividades expirados
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4"
          v-for="atividadeExpirada in atividadesExpiradas" :key="`${atividadeExpirada.nome} expirada`"
      >
        <v-card flat>
          <v-card-text>
            <article class="d-flex align-start relative z-1">
              <div>
                <v-card-title class="pa-0 grey--text text--darken-2">
                  <p class="mr-4 d-flex align-start leading__tight text-break grey--text text--darken-3">
                    {{ atividadeExpirada.nome }}
                  </p>
                </v-card-title>

                <p class="mt-2 w-3/4 d-inline-block relative grey--text text--darken-3 font-weight-medium z-1">
                  Caramba... Você não entregou este simulado
                </p>
              </div>

              <v-img
                  :src="require(`@/assets/icon/disciplinas/${atividadeExpirada.icon}.png`)"
                  class="w-40 flex-grow-0 absolute top-0 right-0"
              />
              <div
                  :class="`bolinha__expirou`" class="absolute top-0 right-0 z--1"
              />
            </article>

            <!-- barra de progesso -->
            <article class="mt-8 w-3/4">
              <p class="caption font-weight-bold red--text">
                {{ `0/${atividadeExpirada.quantidadeQuestoes}`  }}
              </p>
              <v-progress-linear
                  color="desempenhoMuitoRuim" rounded
                  v-model="atividadeExpirada.completa" class="w-full"
              />
            </article>

            <article class="mt-4 relative">
              <p class="font-weight-bold red--text text--darken-3">
                Expirado em {{ atividadeExpirada.expirado }}
              </p>
            </article>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SimuladosAtividadesInicio',

  data () {
    return {
      professorSelecionado: null,

      areas: {
        linguagens: {
          notificacao: true,
          get quantidadeNotificacao () {
            return this.notificacao ? 1 : 0;
          },
          get textoNotificacao () {
            return this.notificacao ? `Você tem ${this.quantidadeNotificacao} novo simulado` : '';
          },
          disciplinas: ['portugues'],
          ttl: ['Português'],
        },
        humanas: {
          notificacao: true,
          get quantidadeNotificacao () {
            return this.notificacao ? 1 : 0;
          },
          get textoNotificacao () {
            return this.notificacao ? `Você tem ${this.quantidadeNotificacao} nova atividade` : '';
          },
          disciplinas: ['geografia'],
          ttl: ['Geografia'],
        },
        natureza: {
          notificacao: false,
          get quantidadeNotificacao () {
            return this.notificacao ? 3 : 0;
          },
          get textoNotificacao () {
            return this.notificacao ? `Você tem ${this.quantidadeNotificacao} novas atividades` : '';
          },
          disciplinas: [],
          ttl: [],
        },
        matematica: {
          notificacao: false,
          get quantidadeNotificacao () {
            return this.notificacao ? 3 : 0;
          },
          get textoNotificacao () {
            return this.notificacao ? `Você tem ${this.quantidadeNotificacao} novas atividades` : '';
          },
          disciplinas: [],
          ttl: [],
        },
      },

      professores: ['Carlos - Matemática', 'Maria - Português', 'Fernanda - Química', 'Bernardo - Biologia', 'João de Deus - Física', 'Mário - Sociologia', 'Jesus - Filosofia', 'História - Saldanha', 'Geografia - Paulo'],

      atividadesEntregar: [
        {
          nome: 'Simulado de português',
          area: 'linguagens',
          icon: 'portugues',
          disciplina: 'Português',
          entrega: 'Data de entrega: 18 de março',
          quantidadeQuestoes: 24,
          questoesFeitas: 4,
          get porcentagem () {
            return `${Math.round((this.questoesFeitas / this.quantidadeQuestoes) * 100)}%`;
          },
        },
        {
          nome: 'Atividade de português',
          area: 'linguagens',
          icon: 'portugues',
          disciplina: 'Português',
          entrega: 'Data de entrega: 30 de março',
          quantidadeQuestoes: 12,
          questoesFeitas: 8,
          get porcentagem () {
            return `${Math.round((this.questoesFeitas / this.quantidadeQuestoes) * 100)}%`;
          },
        },
      ],

      atividadesFinalizadas: [
        {
          nome: 'Simulado de português',
          area: 'linguagens',
          icon: 'portugues',
          disciplina: 'Português',
          resultado: 18,
          quantidadeQuestoes: 24,
          get porcentagemAcerto () {
            return `${Math.round((this.resultado / this.quantidadeQuestoes) * 100)}%`;
          },
          finalizado: '02 de abril',
        },
      ],

      atividadesExpiradas: [
        {
          nome: 'Simulado de português',
          area: 'linguagens',
          icon: 'portugues',
          disciplina: 'Português',
          quantidadeQuestoes: 24,
          expirado: '29 de março',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>

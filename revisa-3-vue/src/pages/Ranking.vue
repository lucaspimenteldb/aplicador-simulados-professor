<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>
          Ranking Geral
        </h1>

        <h3>
          Ranking de Escolas e Estados
        </h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col
          cols="12" class="mt-8"
      >
        <header-secao>
          Sua colocação nos rankings
        </header-secao>
      </v-col>

      <v-col
          cols="6" sm="5"
          md="3"
          v-for="ranking in rankings" :key="ranking.tipo"
      >
        <subheader-secao>
          {{ `Ranking ${ranking.tipo}` }}
        </subheader-secao>

        <v-card class="mt-2 shadow">
          <v-card-text>
            <p class="h-34 relative font-weight-bold grey--text text--darken-3">
              <span class="bolinha__linguagens absolute left--1 top-0" />
              <v-icon
                  v-text="'mdi-podium'" color="black"
                  class="text-h6"
              />

              {{ `${ranking.colocacao}º lugar` }}
            </p>

            <p class="h-34 relative font-weight-bold grey--text text--darken-3">
              <span class="bolinha__humanas absolute left--1 top-0" />
              <v-icon
                  v-text="'mdi-numeric-10-box-multiple-outline'" color="black"
                  class="text-h6"
              />

              {{ `${ranking.pontos} pontos` }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- escolher qual ranking quer ver -->
    <v-row>
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Rankings
        </header-secao>
      </v-col>

      <SelecionarRanking />

      <!-- mês do ranking -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Você quer ver o ranking de qual mês?
        </subheader-secao>

        <v-btn class="mt-2 azul white--text font-weight-medium text-capitalize btn__shadow rounded__normal">
          Mês atual
        </v-btn>

        <v-btn
            class="mt-2 ml-4 border-3 border__azul azul--text font-weight-medium text-capitalize rounded__normal"
        >
          Julho
        </v-btn>

        <v-btn
            class="mt-2 ml-4 border-3 border__azul azul--text font-weight-medium text-capitalize rounded__normal"
        >
          Junho
        </v-btn>
      </v-col>

      <!-- os 3 melhores do ranking -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Os melhores dos melhores - Ranking Estadual
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4"
          v-for="melhor in melhores" :key="melhor.nome"
      >
        <v-card>
          <v-card-text>
            <!-- fotos e informacoes de posicao-->
            <section class="d-flex align-center">
              <v-avatar
                  class="d-inline-block"
                  width="60" height="60"
              >
                <v-img
                    src="@/assets/img/ranking/imagem-ranking.png"
                />
              </v-avatar>

              <div class="ml-4 d-flex align-center justify-center relative">
                <div class="ml-8 bolinha__ranking" />

                <v-icon
                    v-text="melhor.podio" color="black"
                    large class=""
                />
              </div>

              <p class="ml-6 text-h5 font-weight-medium grey--text text--darken-3">
                {{ `${melhor.colocacao} lugar` }}
              </p>
            </section>

            <!-- nome do aluno -->
            <p class="mt-4 body-1 font-weight-bold grey--text text--darken-3">
              {{ melhor.nome }}
            </p>

            <p class="h-30 relative font-weight-medium grey--text text--darken-3">
              <span class="bolinha__melhores absolute left-0 top-1" />
              <v-icon
                  v-text="'mdi-numeric-10-box-multiple-outline'" color="black"
                  class="text-h6"
              />

              {{ melhor.pontos }} pontos
            </p>
            <p class="h-30 relative font-weight-medium grey--text text--darken-3">
              <span class="bolinha__melhores absolute left-0 top-1" />
              <v-icon
                  v-text="'mdi-trophy-award'" color="black"
                  class="text-h6"
              />

              {{ melhor.conquistas }} conquistas
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- posicao do aluno e dos 20 melhores -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Os 20 melhores - Ranking Estadual
        </subheader-secao>
      </v-col>

      <v-col cols="12">
        <v-avatar>
          <v-img src="@/assets/img/ranking/meu-ranking.png" />
        </v-avatar>

        <section class="pa-2 px-4 ml-4 d-inline-block border__bottom__azul">
          <p class="d-inline-block font-weight-bold grey--text text--darken-3">
            Minha posição
          </p>

          <p class="ml-6 d-inline-block font-weight-medium grey--text text--darken-3">
            <v-icon
                v-text="'mdi-podium-gold'" small
                color="black" class="mb-1"
            />
            #10
          </p>

          <p class="ml-6 d-inline-block font-weight-medium grey--text text--darken-3">
            <v-icon
                v-text="'mdi-trophy-award'" small
                color="black"
            />
            28 conquistas
          </p>

          <p class="ml-6 d-inline-block font-weight-medium grey--text text--darken-3">
            <v-icon
                v-text="'mdi-numeric-10-box-multiple-outline'" small
                color="black"
            />
            840 pontos
          </p>
        </section>
      </v-col>

      <v-col cols="12">
        <v-data-table
            :headers="headerRanking" :items="colocacoes"
            fixed-header
        >
          <template v-slot:item.posicao="{ item }">
            <p class="font-weight-bold">
              <v-icon
                  v-text="item.icon" color="black"
                  small
              />
              {{ item.posicao }}
            </p>
          </template>

          <template v-slot:item.urlPerfil="{ item }">
            <v-menu
                bottom offset-y
                origin="top left"
                transition="scale-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    :to="item.urlPerfil" class="azul white--text rounded__normal text-capitalize"
                    v-bind="attrs" v-on="on"
                >
                  Ver perfil
                </v-btn>
              </template>

              <!-- card para visualização do perfil após clique-->
              <v-list class="pa-0 max-w-240">
                <v-list-item class="pa-0 flex-column">
                  <v-list-item-title class="pa-4 pb-2">
                    <div class="d-flex align-center">
                      <v-avatar size="40px">
                        <v-img :src="require(`@/assets/img/ranking/imagem-ranking.png`)" />
                      </v-avatar>

                      <!-- nome da escola e nível-->
                      <article class="ml-4">
                        <h4 class="body-1 font-weight-bold leading__supertight">
                          Lucas
                        </h4>

                        <p class="caption">
                          Escola Manuel da Fônseca
                        </p>
                      </article>
                    </div>
                  </v-list-item-title>

                  <!-- desempenho do simulado e redação-->
                  <v-list-item-content class="pt-0 px-4 d-flex flex-row w-full">
                    <article class="mt-4 mr-8 d-inline-block max-w-68">
                      <h6 class="mb-2 body-2 font-weight-bold">
                        Redações
                      </h6>

                      <v-progress-circular
                          :size="66" :width="3"
                          :value="nivel" color="azul"
                      >
                        {{ nivel+'%' }}
                      </v-progress-circular>
                    </article>

                    <article class="mt-4 d-inline-block max-w-68">
                      <h6 class="mb-2 body-2 font-weight-bold">
                        Simulados
                      </h6>

                      <v-progress-circular
                          :size="66" :width="3"
                          :value="nivel" color="azul"
                      >
                        {{ nivel+'%' }}
                      </v-progress-circular>
                    </article>

                    <section class="mt-4">
                      <h6 class="mb-2 body-2 font-weight-bold leading__supertight">
                        <v-icon
                            v-text="'mdi-trophy-award'" color="black"
                            small class="mb-1"
                        />

                        32 Conquistas
                      </h6>

                      <v-btn
                          fab depressed
                          small dark
                          class="mr-1 azul"
                      >
                        <v-icon v-text="'mdi-alien-outline'" />
                      </v-btn>
                      <v-btn
                          fab depressed
                          small dark
                          class="mr-1 azul"
                      >
                        <v-icon v-text="'mdi-bicycle'" />
                      </v-btn>
                      <v-btn
                          fab depressed
                          small dark
                          class="mr-1 azul"
                      >
                        <v-icon v-text="'mdi-skull-outline'" />
                      </v-btn>
                    </section>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import SelecionarRanking from '../components/SelecionarRanking.vue';

export default {
  name: 'Ranking',
  components: { SelecionarRanking },

  data () {
    return {
      nivel: 90,

      rankings: [
        {
          tipo: 'Estadual',
          colocacao: 10,
          pontos: 740,
        },
        {
          tipo: 'Escolar',
          colocacao: 16,
          pontos: 740,
        },
      ],

      melhores: [
        {
          img: 'imagem-ranking',
          colocacao: '1º',
          podio: 'mdi-podium-gold',
          nome: 'Santaninha Maria',
          pontos: 9012,
          conquistas: 32,
        },
        {
          img: 'imagem-ranking',
          colocacao: '2º',
          podio: 'mdi-podium-silver',
          nome: 'Avexadinho Pelanquis',
          pontos: 7812,
          conquistas: 26,
        },
        {
          img: 'imagem-ranking',
          colocacao: '3º',
          podio: 'mdi-podium-bronze',
          nome: 'Projetado Deum',
          pontos: 6062,
          conquistas: 24,
        },
      ],

      colocacoes: [
        {
          icon: 'mdi-podium-gold',
          posicao: '#1',
          nome: 'Sanitizado Philips',
          conquistas: '30 conq.',
          pontuacao: '950 pts.',
          urlPerfil: '',
        },
        {
          icon: 'mdi-podium-silver',
          posicao: '#2',
          nome: 'Sanitizado Philips',
          conquistas: '30 conq.',
          pontuacao: '950 pts.',
          urlPerfil: '',
        },
        {
          icon: 'mdi-podium-bronze',
          posicao: '#3',
          nome: 'Sanitizado Philips',
          conquistas: '30 conq.',
          pontuacao: '950 pts.',
          urlPerfil: '',
        },
        {
          icon: 'mdi-seal-variant',
          posicao: '#4',
          nome: 'Sanitizado Philips',
          conquistas: '30 conq.',
          pontuacao: '950 pts.',
          urlPerfil: '',
        },
        {
          icon: 'mdi-seal-variant',
          posicao: '#5',
          nome: 'Sanitizado Philips',
          conquistas: '30 conq.',
          pontuacao: '950 pts.',
          urlPerfil: '',
        },
        {
          icon: 'mdi-seal-variant',
          posicao: '#6',
          nome: 'Sanitizado Philips',
          conquistas: '30 conq.',
          pontuacao: '950 pts.',
          urlPerfil: '',
        },
        {
          icon: 'mdi-seal-variant',
          posicao: '#7',
          nome: 'Sanitizado Philips',
          conquistas: '30 conq.',
          pontuacao: '950 pts.',
          urlPerfil: '',
        },
        {
          icon: 'mdi-seal-variant',
          posicao: '#8',
          nome: 'Sanitizado Philips',
          conquistas: '30 conq.',
          pontuacao: '950 pts.',
          urlPerfil: '',
        },
        {
          icon: 'mdi-seal-variant',
          posicao: '#9',
          nome: 'Sanitizado Philips',
          conquistas: '30 conq.',
          pontuacao: '950 pts.',
          urlPerfil: '',
        },
      ],
      headerRanking: [
        {
          text: 'Ranking',
          align: 'start',
          sortable: false,
          value: 'posicao',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Nome',
          sortable: false,
          value: 'nome',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Conquistas',
          sortable: false,
          value: 'conquistas',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Pontuação',
          sortable: false,
          value: 'pontuacao',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Ver pefil',
          sortable: false,
          value: 'urlPerfil',
          class: 'body-2 font-weight-bold',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>

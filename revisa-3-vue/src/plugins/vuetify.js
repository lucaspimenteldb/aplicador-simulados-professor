import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const theme = {
  // cores principais
  azul: '#00B8ED',
  azulEscuro: '#146f8a',
  amarelo: '#FFCB05',

  // cores das áreas
  linguagens: '#FAB145',
  matematica: '#9BF79F',
  natureza: '#EAA0F7',
  humanas: '#90CAF9',

  // cores dos desempenhos
  desempenhoExcelente: '#49D1F2',
  desempenhoOtimo: '#55D550',
  desempenhoBom: '#D5B650',
  desempenhoRuim: '#e1921c',
  desempenhoMuitoRuim: '#D55050',

  // cores das dificuldades
  facil: '#49D1F2',
  normal: '#55D550',
  dificil: '#D5B650',
  muitoDificil: '#D55050',

  // acertos e erros
  errou: '#D55050',
  acertou: '#3eac3a',
};

export default new Vuetify({
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  },
});

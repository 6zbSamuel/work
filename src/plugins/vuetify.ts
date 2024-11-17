import { createVuetify } from 'vuetify';
import 'vuetify/styles';

// Import Vuetify components and directives
import { VApp, VAppBar, VMain, VContainer } from 'vuetify/components';
import { Ripple } from 'vuetify/directives';

const vuetify = createVuetify({
  components: {
    VApp,
    VAppBar,
    VMain,
    VContainer,
  },
  directives: {
    Ripple,
  },
});

export default vuetify; 
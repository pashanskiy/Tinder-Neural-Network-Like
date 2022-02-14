import { override, addLessLoader } from 'customize-cra';

export default override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@base-color': '#f44336' }
  })
);
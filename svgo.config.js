export default {
  multipass: true,
  plugins: [
    // Turn off default cleanup
    // and only remove minimal non-visual things
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupAttrs: false,
          removeDoctype: false,
          removeXMLProcInst: false,
          removeComments: true,
          removeMetadata: true,
          removeTitle: true,
          removeDesc: true,
          removeUselessDefs: false,
          removeEditorsNSData: true,
          cleanupNumericValues: false,
          convertColors: false,
          convertPathData: false,
          removeUnknownsAndDefaults: false,
          collapseGroups: false,
        },
      },
    },
    // Do NOT include any other plugins
  ],
};

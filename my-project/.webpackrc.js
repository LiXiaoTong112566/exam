const path=require("path");
export default{
    alias:{
        '@':path.resolve(__dirname,'src')
    },
   
          "extraBabelPlugins": [
           ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
          ],
          ignoreMomentLocale: true,
          commons: [
            {
              name: 'vendor',
              minChunks: function (module) {
                if(module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
                  return false;
                }
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.includes('node_modules');
              }
            },
          ]
        
}

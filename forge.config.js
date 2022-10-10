const CopyPlugin = require("copy-webpack-plugin");

var fs = require("fs-extra");
console.log('SHIT')
module.exports = {
    hooks: {
        postStart: async (extractPath, electronVersion, platform, arch, done) => {
            fs.copy('src/py', '.webpack/py', function (err) {
                if (err){
                    console.log('An error occured while copying the folder.')
                    return console.error(err)
                }
                console.log('Copy completed!')
            });    
        },
        readPackageJson: async (forgeConfig, platform, arch) => {
          console.log('\ngenerateAssets');
          setTimeout(() => {
            fs.copy('src/py', '.webpack/spy', function (err) {
              if (err){
                  console.log('An error occured while copying the folder.')
                  return console.error(err)
              }
              console.log('Copy completed!')
            });  
          }, 1000)
        },      
    },
    markers: [
        {
            "name": "@electron-forge/maker-squirrel",
            "config": {
              "name": "my_new_app"
            }
          },
          {
            "name": "@electron-forge/maker-zip",
            "platforms": [
              "darwin"
            ]
          },
          {
            "name": "@electron-forge/maker-deb",
            "config": {}
          },
          {
            "name": "@electron-forge/maker-rpm",
            "config": {}
          }
    ],
    plugins: [
        [
          "@electron-forge/plugin-webpack",
          {
            "mainConfig": "./webpack.main.config.js",
            "renderer": {
              "config": "./webpack.renderer.config.js",
              "entryPoints": [
                {
                  "html": "./src/index.html",
                  "js": "./src/renderer.js",
                  "name": "main_window",
                  "preload": {
                    "js": "./src/preload.js"
                  }
                }
              ]
            }
          }
        ]
      ]
  };

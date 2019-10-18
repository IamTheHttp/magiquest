class Loader {
  constructor() {
    this.cache = {};
  }
  
  load(assets = [], onReady) {
    let requests = [];
    
    for (let i = 0; i < assets.length; i++) {
      requests.push(new Promise((resolve) => {
        let asset = assets[i];
        
        if (asset.type === 'image') {
          let img = new Image();
          img.src = asset.url;
          
          this.cache[asset.name] = img;
          
          img.onload = () => {
            resolve();
          };
        }
      }));
    }
    
    Promise.all(requests).then(() => {
      onReady();
    });
  }
  
  getAsset(name) {
    return this.cache[name];
  }
}

let loader = new Loader();
export default Loader;
export {loader};

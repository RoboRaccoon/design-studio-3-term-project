window.gameState = window.gameState || {
    RIAdone: false,
    blizzardDone: false,
    portalSpawned: false
  };
  
  AFRAME.registerComponent('final-room-manager', {
    init: function () {
      const sceneEl = this.el.sceneEl;
      this.cabin = document.querySelector("#Cabin");
      this.environment = document.querySelector('#environment');
      this.finalPaint = document.querySelector("#finalPaint")
      
      // function to create and spawn the final room portal.
      this.spawnFinalRoomPortal = function () {
        let painting = document.createElement('a-entity');
        painting.setAttribute('position', '-0.91794 0 -3.29468');
        painting.setAttribute('scale', '20 20 20');
        painting.setAttribute('rotation', '0 -90 0');
        painting.setAttribute('id', 'paintingFinal');
        painting.setAttribute('gltf-model', '#finalPainting_gltf');
        
        let portal = document.createElement('a-box');
        portal.setAttribute('id', 'finalRoom_portal');
        portal.setAttribute('position', '-0.91803 1.25061 -3.31844');
        portal.setAttribute('scale', '1 1.3 0.071');
        portal.setAttribute('rotation', '-15 0 0');
        portal.setAttribute('color', '#940000');
        portal.setAttribute('class', 'interactive');
        portal.setAttribute('circles-interactive-object', 'type:highlight');
        portal.setAttribute(
          'material',
          'side: double; transparent: true; blending: additive; color: #000000; emissive: #fbff00; emissiveIntensity: 0;'
        );

        portal.setAttribute('painting-highlight');
        
        portal.setAttribute('circles-sendpoint', 'target:#finalRoom_checkpoint;');
  
        portal.addEventListener('click', () => {
            let newEnv = document.createElement('a-entity');
            newEnv.setAttribute('id', 'newEnvironment');
            newEnv.setAttribute('environment', {
                preset: 'checkerboard',
                seed: 123,
                fog: 0.06,
                lightPosition: '-4.160 1 0',
                skyType: 'gradient',
                skyColor: '#0f0c14',
                horizonColor: '#000000',
                lighting: 'none',
                dressing: 'none'
            });
            
           
            const sceneEl = document.querySelector('a-scene');
            sceneEl.appendChild(newEnv);
          
           
            this.cabin.setAttribute('visible', 'false');
            this.finalRoom = document.querySelector('#finalRoom');
            this.finalRoomPortal = document.querySelector('#finalRoom_portal');
            this.infoPanel = document.querySelector('#infoPanel');
            this.painting = document.querySelector('#paintingFinal');

            if (this.finalRoom) {
              this.finalRoom.setAttribute('visible', 'true');
            }
            if (this.infoPanel) {
              this.infoPanel.setAttribute('visible', 'false');
            }
            if (this.finalRoomPortal) {
                this.finalRoomPortal.setAttribute('visible', 'false');
            }
            if (this.painting) {
                this.painting.setAttribute('visible', 'false');
            }
         
            console.log("New environment created and cabin/infoPanel hidden.");
          });

          this.finalPaint.setAttribute("animation__animup", "property: position.y; from: 3.288; to: 4.757; dur: 16000; easing: linear; autoplay: true; loop: true;");
          

        
        sceneEl.appendChild(portal);
        sceneEl.appendChild(painting);
        console.log("Final room portal spawned.");
      };
  
      // check if both tasks are complete and if the portal hasn't  spawned.
      this.checkAndSpawnPortal = () => {
        if (gameState.RIAdone && gameState.blizzardDone && !gameState.portalSpawned) {
          gameState.portalSpawned = true;
          this.spawnFinalRoomPortal();
        }
      };
  
      // Listen for the RIA task event.
      this.el.addEventListener('ria-return-clicked', () => {
        gameState.RIAdone = true;
        console.log("RIA task completed and returned to studio.");
        this.checkAndSpawnPortal();
      });
  
      // Listen for the Blizzard task event.
      this.el.addEventListener('blz-return-clicked', () => {
        gameState.blizzardDone = true;
        console.log("Blizzard task completed and returned to studio.");
        this.checkAndSpawnPortal();
      });
    }
  });
  
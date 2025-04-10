AFRAME.registerComponent('blz-manager', {
    init: function () {
        this.sledParts = [];
        this.logs = [];
        this.sledPartsPlaced = 0;
        this.scene = this.el.sceneEl;
        this.pedestal = null;
        this.navmesh = document.querySelector("#nav-mesh");

        this.cabin = document.querySelector("#Cabin");

        //track task completion
        this.taksCompleted = 0;
        this.totalTasks = 2;


        // Wait for the green painting click event
        this.el.addEventListener('blz-painting-clicked', () => {
            console.log("BLZ painting click heard");
            this.startSledTask();
            this.blzWorld = document.querySelector('#blzWorld');
            this.blzWorld.setAttribute('visible', 'true');
            this.greenPaint = document.querySelector('#greenPaint');
            this.greenPaint.setAttribute('material', 'src:#blizzard');
        });

        this.el.addEventListener('blz-complete', () =>{
          gameState.blizzardDone = true;
          this.taksCompleted++;  
          gameState.blizzardDone = true;
          console.log("summoning portal: " + this.taksCompleted);
          //makesure we complete all the task fist before spawining portal
          if(this.totalTasks === this.taksCompleted) {
            this.spawnPortal();
            //rest tasks completed to 0 so portal summons again when we re-enter
            this.taksCompleted = 0;
            //update the checklist
            let checklist = document.querySelector('#painting2_blizzardTask');
            checklist.setAttribute('text', {
              value: '- Blizzard: Painting Restored!',
              color: 'green'
            });
          }
        });

        this.el.addEventListener('return-clicked', () => {
            this.blzWorld = document.querySelector('blzWorld');
            this.environment = document.querySelector('#environment');
           
            // Hide Blz world, show cabin 
            blzWorld.setAttribute('visible', 'false');
            this.cabin.setAttribute('visible', 'true');
            this.environment.setAttribute('position', '0 -2.265 0');
            this.environment.setAttribute('environment', {
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

            // Remove all sled parts from the scene
            this.sledParts.forEach(sledPart => {
              if (sledPart.parentNode) {
                sledPart.parentNode.removeChild(sledPart);
              }
            });
            this.sledParts = []; // Clear the logs array
            
            // Remove all logs from the scene
            this.logs.forEach(log => {
              if (log.parentNode) {
                  log.parentNode.removeChild(log);
              }
            });
            this.logs = []; // Clear the logs array

            // Remove pedestal and sled
            const pedestal = document.querySelector('#sledPedestal');
            if (pedestal && pedestal.parentNode) {
                pedestal.parentNode.removeChild(pedestal);
            }

            const sled = document.querySelector('#sled');
            if (sled && sled.parentNode) {
              sled.parentNode.removeChild(sled);
            }

            // Remove portal elements
            ['greenPaint_return', 'painting1_return', 'voteCounter_greenPaint_return'].forEach(id => {
            const element = document.querySelector(`#${id}`);
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
            });

            //remove the axe from the scene
            const axe = document.querySelector('#axe');
            if(axe && axe.parentNode) {
              axe.parentNode.removeChild(axe);
            }

            //remove the axe label
            const axe_label = document.querySelector('#axe_label');
            if(axe_label && axe_label.parentNode) {
              axe_label.parentNode.removeChild(axe_label);
            }
            //remove axe description
            const axe_description = document.querySelector('#axe_description');
            if(axe_description && axe_description.parentNode) {
              axe_description.parentNode.removeChild(axe_description);
            }
            
            //remove the axe target from the scene
            const axeTarget = document.querySelector('#axeTarget');
            if(axeTarget && axeTarget.parentNode) {
              axeTarget.parentNode.removeChild(axeTarget);
            }

            this.navmesh.setAttribute('visible', 'false');
            this.navmesh.setAttribute('id', 'nav-mesh');
            this.navmesh.setAttribute('geometry', 'primitive: box');
            this.navmesh.setAttribute('scale', '11 0.05 14.6');
            this.navmesh.setAttribute('position', '0 0.04 0');
            this.navmesh.removeAttribute('rotation'); // if it had a rotation previously
            this.navmesh.removeAttribute('nav-mesh');
            this.navmesh.setAttribute('nav-mesh', '');
            

            console.log("All spawned objects removed. Environment reset.");
        });
    },

    startSledTask: function () {
        console.log('Blizzard task');
        this.spawnParts();
        this.spawnLogs();
        this.spawnPedestal();
        this.spawnAxe();
        this.spawnAxeTarget();
        this.cabin.setAttribute('visible', 'false');
        this.navmesh.setAttribute('position', '-48.467 -2.164 -1.994');
        this.navmesh.setAttribute('rotation', '2.860 0.260 3.320');
        this.navmesh.setAttribute('scale', '64.230 0.087 25.960');
        this.navmesh.removeAttribute('nav-mesh');
        this.navmesh.setAttribute('nav-mesh', '');
        this.riaWorld.setAttribute('visible', 'false');
    },
   
    spawnParts: function () {
        const blzWorld = document.querySelector('#blzWorld');
        const positions = [
            { x: -41.63873, y: -1.15221, z: -3.30849 },
            { x: -42.30105, y: -1.76438, z: 1.44141 },
            { x: -46.25722, y: -1.14618, z: -2.52772 },
            { x: -45.87625, y: -1.66984, z: 0.92314 }
        ];

        const rotations = [
            { x: 3.660054395295699, y: -45.116988619781544, z: -3.66807580442753 },
            { x: -0.5133701844372176, y: 46.957329057741745, z: 7.557313317775558 },
            { x: -5.512999904748782, y: 51.41780549283521, z: 4.383127132750798 },
            { x: 6.0647582614597635, y: -36.55871803391244, z: -4.479957000127906 }
        ];

        positions.forEach((pos, index) => {
            let sledPart = document.createElement('a-entity');
            sledPart.setAttribute('position', `${pos.x} ${pos.y} ${pos.z}`);
            // sledPart.setAttribute('geometry', 'primitive: cylinder; height: 1; radius: 0.2'); // Fixed typo
            sledPart.setAttribute('id', `sledPart${index}`);
            sledPart.setAttribute('gltf-model', `#logModel`);
            sledPart.setAttribute('material', 'color: brown'); // Material needs to be separate
            //sledPart.setAttribute('class', 'interactable-log');
            sledPart.setAttribute('part-highlight', '');
            sledPart.classList.add('interactive', 'sledPartToRemove');
            //sledPart.setAttribute('circles-interactive-object', '');
            //sledPart.setAttribute('circles-pickup-networked', '');
            //sledPart.setAttribute('static-body', '');

            sledPart.addEventListener('partSelected', () => {
                console.log("removed part");
                //moved into the network so parts get removed for all players
                //sledPart.parentNode.remove(sledPart);
            });
            
            sledPart.setAttribute('scale', '0.3 1 1'); // Scale down by half in all directions
            const rot = rotations[index];
            sledPart.setAttribute('rotation', `${rot.x} ${rot.y} ${rot.z}`);

            blzWorld.appendChild(sledPart);
            this.sledParts.push(sledPart);
        });

    },

    spawnLogs: function () {
      const blzWorld = document.querySelector('#blzWorld');
      const positions = [
          { x: -50.45323, y: -1.79637, z: 0.84713 },
          { x: -51.107, y: -1.75269, z: 0.65344 },
          { x: -50.42501, y: -1.09841, z: 1.1003 },
          { x: -50.00895, y: -0.9721, z: 0.83795 }
      ];

      const rotations = [
          { x: 0.0492743703812508, y: 89.43584703094585, z: 11.17095813166566 },
          { x: 0, y: 64.06642177814327, z: 16.983042005472733 },
          { x: 0.3139808717316911, y: 98.94981121909318, z: -1.9956120004406572 },
          { x: 0.39190313186948306, y: 104.2628488533413, z: -1.5418294266970454 }
      ];

      positions.forEach((pos, index) => {
          let log = document.createElement('a-entity');
          log.setAttribute('position', `${pos.x} ${pos.y} ${pos.z}`);
          // sledPart.setAttribute('geometry', 'primitive: cylinder; height: 1; radius: 0.2'); // Fixed typo
          log.setAttribute('id', `log${index}`);
          log.setAttribute('gltf-model', `#logModel`);
          log.setAttribute('material', 'color: brown'); // Material needs to be separate
          log.setAttribute('class', 'can-be-chopped');
          //log.setAttribute('part-highlight', '');
          //log.setAttribute('class', 'interactive');
          //sledPart.setAttribute('circles-interactive-object', '');
          //sledPart.setAttribute('circles-pickup-networked', '');
          log.setAttribute('dynamic-body', 'mass: 0');

          //chopping check
          this.chopAllowed = false;
          this.chopCounter = 0;
          //since the target was touched, we can now chop the log
          log.addEventListener('choppingPrepared', () => {
            this.chopAllowed = true;
            console.log("before collide with log: " + this.chopAllowed);
          });

          //check if chopping finished
          this.checkChoppingFinished = () =>  {
            //for some reason the array didn't srink in size as the logs got removed,
            //so we have a coutner to count up to the origianl lenght of the array
            //console.log("array length: " + this.logs.length);
            if(this.logs.length === this.chopCounter) {
              const gameManager = document.querySelector('#GameManager');
              // check if all logs have been chopped
              console.log("all chopped! blz-complete was called");
              if (gameManager) {
                gameManager.emit('blz-complete');
              }
            }
          }

          //remove a log
          this.chopLog = (logId) => {
            console.log("log chopped!");
            let logToChop = document.querySelector(`#${logId}`);
            logToChop.removeAttribute('static-body');
            
            //wait for physics to get removed first before removing the element
            setTimeout(() => {
              if (logToChop.parentNode) {
                  logToChop.parentNode.removeChild(logToChop);
                }
              }, 0);
          }

          //reset the target color
          this.restTargetColor = () => {
            //color swaping target
            let axeTarget = document.querySelector('#axeTarget');
            axeTarget.setAttribute('material', 'color: red');
          }
          //get the target's current color
          this.getColor = () => {
            //color swaping target
            let axeTarget = document.querySelector('#axeTarget');
            let currentColor = axeTarget.getAttribute('material');
            axeTarget.setAttribute('material', {currentColor})
          }

      // Ensure CONTEXT_AF exists
      window.CONTEXT_AF = window.CONTEXT_AF || {};
      CONTEXT_AF.chopEventName = "chop_event";
      CONTEXT_AF.socket = null;

      // Create the networking system using CONTEXT_AF
      CONTEXT_AF.createNetworkingSystem = () => {
        CONTEXT_AF.socket = CIRCLES.getCirclesWebsocket();
        console.warn(
          "Networking system ready. Socket ID: " +
            CONTEXT_AF.socket.id +
            " in room: " +
            CIRCLES.getCirclesGroupName() +
            " in world: " +
            CIRCLES.getCirclesWorldName()
        );

       //if we collied with the log and we're in the choping state, remove the log
       log.addEventListener('collide', (event) => {
        //console.log("After collied with log: " + this.chopAllowed);
        //console.log("Axe collided with log!", event.detail.body.el);

        const axe = event.detail.body.el;
        if (!axe || axe.id !== 'axe') return;

        if (this.chopAllowed === true) {
          this.chopLog(log.id);
            
          //reset the chopping state
          this.chopAllowed = false;
          
          //increment counter
          this.chopCounter++;
          console.log('chop counter: ' + this.chopCounter);
          
          //reset target color to red
          this.restTargetColor();

          //check if the choppign is done
          this.checkChoppingFinished();
          
          // Emit the updated count globally
          CONTEXT_AF.socket.emit(CONTEXT_AF.chopEventName, {
            room: CIRCLES.getCirclesGroupName(),
            world: CIRCLES.getCirclesWorldName(),
            logRemoved: log.id,
            chopCounter: this.chopCounter
          });

        } else {
          console.log("you're not allowed to chop");
        } 

      });
      
        
        // Listen for the global raft update events
        CONTEXT_AF.socket.on(CONTEXT_AF.chopEventName, (data) => {
          if (
            data.world === CIRCLES.getCirclesWorldName() &&
            data.room === CIRCLES.getCirclesGroupName()
          ) {
            // Only update if the incoming count is greater than the local value
            if (data.chopCounter > this.chopCounter) {
              this.chopCounter = data.chopCounter;
              this.chopLog(data.logRemoved);
              this.checkChoppingFinished();
              this.restTargetColor();
            }
            console.log("Global chop counter: " + data.chopCounter);
          }
        });
  
        // Request data sync after a random delay (for late joiners)
        setTimeout(() => {
          CONTEXT_AF.socket.emit(CIRCLES.EVENTS.REQUEST_DATA_SYNC, {
            room: CIRCLES.getCirclesGroupName(),
            world: CIRCLES.getCirclesWorldName()
          });
        },1200);
  
        // When another client requests sync data, send your current logsPlaced value
        CONTEXT_AF.socket.on(CIRCLES.EVENTS.REQUEST_DATA_SYNC, (data) => {
          if (data.world === CIRCLES.getCirclesWorldName()) {
            CONTEXT_AF.socket.emit(CIRCLES.EVENTS.SEND_DATA_SYNC, {
              room: CIRCLES.getCirclesGroupName(),
              world: CIRCLES.getCirclesWorldName(),
              chopCounter: this.chopCounter
            });
          }
        });

         // Receive sync data from others
         CONTEXT_AF.socket.on(CIRCLES.EVENTS.RECEIVE_DATA_SYNC, (data) => {
          if (data.world === CIRCLES.getCirclesWorldName()) {
            if (data.chopCounter > this.chopCounter) {
              this.chopCounter = data.chopCounter;
              this.checkChoppingFinished();
              this.restTargetColor();
            }
          }
        });
      };

      // If the Circles websocket is ready, set up networking immediately; otherwise, wait for WS_CONNECTED event
      if (CIRCLES.isCirclesWebsocketReady()) {
        CONTEXT_AF.createNetworkingSystem();
      } else {
        let wsReadyFunc = () => {
          CONTEXT_AF.createNetworkingSystem();
          this.el.sceneEl.removeEventListener(
            CIRCLES.EVENTS.WS_CONNECTED,
            wsReadyFunc
          );
        };
        this.el.sceneEl.addEventListener(CIRCLES.EVENTS.WS_CONNECTED, wsReadyFunc);
      }
          
          log.setAttribute('scale', '1 1 1'); // Scale down by half in all directions
          const rot = rotations[index];
          log.setAttribute('rotation', `${rot.x} ${rot.y} ${rot.z}`);

          blzWorld.appendChild(log);
          this.logs.push(log);
      });

  },

    spawnAxe: function () {
      console.log("Axe Spawned");
      const blzWorld = document.querySelector('#blzWorld');
      this.axe = document.createElement('a-entity');
      this.axe.setAttribute('id', 'axe');
      this.axe.setAttribute('gltf-model', `#axe_gltf`);
      this.axe.setAttribute('scale', {x:20, y:20, z:20});
      this.axe.setAttribute('class', 'interactable-axe');
      this.axe.setAttribute('circles-pickup-networked', '');
      this.axe.setAttribute('circles-artefact', {
        inspectPosition:      '0.0 0.0 0.0',
        inspectScale:         '40 40 40',
        inspectRotation:      '0 -70 30',
        textRotationY:        '90',
        descrption_offset:    '0 1 0',
        description_on:       true,
        desc_arrow_position:  'down',
        label_text:           'Axe',
        label_offset:         '0 1 0',
        label_on:             true,
        label_arrow_position: 'down',
        title:                '1800s Single Bit Axe',
        description:          'These axes where meant for felling and slitting wood - use this axe to clear the way',
        title_back:           'Some Title',
        description_back:     'Some description text.',
        //audio:                #some-snd; 
        //volume:               0.4
      });
      this.axe.setAttribute('position', '-48.9296 -1.96162 2.65773');
      //for collision
      this.axe.setAttribute('static-body', '');
      //we're trying raycaster to detct collision - cuz 
      blzWorld.appendChild(this.axe);
    },

    spawnAxeTarget: function () {
      const blzWorld = document.querySelector('#blzWorld');
      this.axeTarget = document.createElement('a-entity');
      this.axeTarget.setAttribute('id', 'axeTarget');
      this.axeTarget.setAttribute('geometry', 'primitive: sphere; radius: 0.25');
      this.axeTarget.setAttribute('material', 'opacity: 0.5; transparent: true; color: #ff0000;');
      this.axeTarget.setAttribute('position', '-50.18852 0.182 -0.359');
      //for collision detection with axe
      this.axeTarget.setAttribute('axe-target-trigger', '');
      //be user to have mass = 0 so it doesn't fly away - by default it's 5
      this.axeTarget.setAttribute('dynamic-body', 'mass: 0');

      //if the target was touched send message to logs they can be chopped
      this.axeTarget.addEventListener('targetTouched', () =>  {
        
        // Select all elements with the class 'can-be-chopped'
        const canBeChopped = document.querySelectorAll('.can-be-chopped');

        // Loop through each element and perform an action
        canBeChopped.forEach((element) => {
          console.log(element); // Logs each element with the class
          console.log("choppingPrepared got emitted");
          element.emit('choppingPrepared'); //let logs know they can be chopped
        });
      });

      blzWorld.appendChild(this.axeTarget);
    },

    spawnPedestal: function () {
        const blzWorld = document.querySelector('#blzWorld');
        //this.pedestal = document.createElement('a-box');
        //try a-entiy instead of a-box
        this.pedestal = document.createElement('a-entity'); 
        this.pedestal.setAttribute('id', 'sledPedestal');
        this.pedestal.setAttribute('geometry', {primitive: 'box', width: 3, height: 0.3, depth: 3});
        this.pedestal.setAttribute('position', '-43.66553 -1.51262 -0.69148');
        this.pedestal.setAttribute('rotation', '8.90892075648917 0 0');
        // this.pedestal.setAttribute('width', '3');
        // this.pedestal.setAttribute('height', '0.3');
        // this.pedestal.setAttribute('depth', '3');
        this.pedestal.setAttribute('material', 'color: red');
        this.pedestal.setAttribute('sled-pedestal-trigger', '');
    
        let sled = document.createElement('a-entity');
        sled.setAttribute('position', `-43.58566 -1.57118 -0.72125`);

        sled.setAttribute('id', `sled`);
        sled.setAttribute('visible', 'true');
        sled.setAttribute('gltf-model', `#Sled4`);
        sled.setAttribute('material', 'color: brown'); // Material needs to be separate
        
        sled.setAttribute('scale', '0.5 0.5 0.5'); // Scale down by half in all directions
        sled.setAttribute('rotation', '10.304645945427856 0 2.0890041210469814');
        
        // Make it a physics trigger
        this.pedestal.setAttribute('dynamic-body', 'mass: 0;'); // A-Frame physics component
    
        blzWorld.appendChild(this.pedestal);
        blzWorld.appendChild(sled);

    },
    
    spawnPortal: function () {
        // Create the a-box element
        const blzWorld = document.querySelector('#blzWorld');
        let greenPaint = document.createElement('a-box');
        greenPaint.setAttribute('position', '-52.56613 -0.54364 -0.20671');
        greenPaint.setAttribute('scale', '1 1.3 0.071');
        greenPaint.setAttribute('rotation', '-14.349155021256337 85.58213290089593 8.614993407587058');
        greenPaint.setAttribute('color', '#940000');
        greenPaint.setAttribute('id', 'greenPaint_return');
        greenPaint.setAttribute('class', 'interactive');
        greenPaint.setAttribute('circles-interactive-object', 'type:highlight');
        greenPaint.setAttribute('environmentProp', 'preset: checkerboard; seed: 123; fog: 0.06; lightPosition: -4.160 1 0; skyType: gradient; skyColor: #0f0c14; horizonColor: #000000 lighting: distant; dressing: none;');
        greenPaint.setAttribute('painting-highlight', '');
        greenPaint.setAttribute('material', 'color:#ffffff; src: #blizzard; shader: standard; transparent: true; emissive: #ffffff; emissiveIntensity: 0;');

       
        // Create the a-entity element
        let painting1 = document.createElement('a-entity');
       
        painting1.setAttribute('id', 'painting1_return');
        painting1.setAttribute('scale', '20 20 20');
        painting1.setAttribute('gltf-model', '#painting_gltf');
        painting1.setAttribute('position', '-52.56613 -1.85032 -0.35905');
        painting1.setAttribute('rotation', '7.198641738023663 0 0');

        
        let blizzPainting = document.querySelector('#greenPaint');
        blizzPainting.setAttribute('material', 'color:#ffffff; src: #blizzard; shader: standard; transparent: true; emissive: #ffffff; emissiveIntensity: 0;')

        let voteCounter = document.createElement('a-entity');
        voteCounter.setAttribute('id', 'voteCounter_greenPaint_return');
        voteCounter.setAttribute('position', '-52.56613 -1.85032 -0.35905');
        voteCounter.setAttribute('rotation', '0 0 0');
        voteCounter.setAttribute('text', 'value: Votes: 0; align: center; color: white; width: 4');
    

        // Append elements to the scene
        blzWorld.appendChild(greenPaint);
        blzWorld.appendChild(painting1);
    }
    
});

AFRAME.registerComponent('sled-pedestal-trigger', {
    init: function () {
      this.sledPartsPlaced = 0;
      this.maxParts = 4;
  
      // Ensure that the elements are available
      this.el = document.querySelector("#sledPedestal");
      this.sled = document.querySelector('#sled');
      const gameManager = document.querySelector('#GameManager');
  
      // Debug: Check if the elements are found
      //console.log("sledPedestal found:", this.el);
      //console.log("sled found:", this.sled);

      // if (!this.el || !this.sled) {
      //   console.log("sledPedestal or sled element not found!");
      //   return; // Exit if the required elements are not found
      // } else {
      //   console.log("sledPedestal and sled element ARE found!");
      // }

      
      // Helper function to update the raft model based on logsPlaced
      this.updateSledModel = () => {
        // Update the sled visibility and model
        this.sled.setAttribute('visible', 'true');
        //the parts start at 0, but the raft starts a 1
        this.sled.setAttribute('gltf-model', `#Sled${this.sledPartsPlaced}`);
        this.sled.setAttribute('scale', {x:50, y:50, z:50});
        this.sled.setAttribute('position', {x:-43.58566 , y:-1.42022, z:-0.72125});
        this.sled.setAttribute('rotation', {x:10.304645945427856 , y:0, z:2.0890041210469814});
       console.log("Local parts placed: " + this.sledPartsPlaced);
      };
      
      // Check if all parts are placed
      this.checkSledFinished = () => {
        if (this.sledPartsPlaced === this.maxParts) {
          console.log("Sled is complete!");
          this.el.setAttribute('material', 'color: green');
          if (gameManager) {
            console.log("blz-complete was sent");
            gameManager.emit('blz-complete');
          }
        }
      }
      
      console.log("WE registered sled-pedestal-trigger component!!!");
      
      // Ensure CONTEXT_AF exists
      window.CONTEXT_AF = window.CONTEXT_AF || {};
      CONTEXT_AF.sledEventName = "addPart_event";
      CONTEXT_AF.socket = null;
      // Create the networking system using CONTEXT_AF
      CONTEXT_AF.createNetworkingSystem = () => {
        CONTEXT_AF.socket = CIRCLES.getCirclesWebsocket();
        console.warn(
          "Networking system ready. Socket ID: " +
            CONTEXT_AF.socket.id +
            " in room: " +
            CIRCLES.getCirclesGroupName() +
            " in world: " +
            CIRCLES.getCirclesWorldName()
        );

        // This is the code that checks if one of the parts was cliked
        // Listen for the 'partSelected' event
        this.el.addEventListener('partSelected', (event) => {
          //add the amount of parts placed
          this.sledPartsPlaced++;
          console.log("part was added " + this.sledPartsPlaced);

          //remove part that was clicked
          const part = document.querySelector(`#${event.detail.id}`);
          console.log("Part getting removed: " + JSON.stringify(event.detail.id, null, 2));
          if(part.parentNode) {
            part.parentNode.removeChild(part);
          }

          //update sled
          this.updateSledModel();

          //see if sled is finised
          this.checkSledFinished();

          // Emit the updated count globally
          CONTEXT_AF.socket.emit(CONTEXT_AF.sledEventName, {
            sledPartsPlaced: this.sledPartsPlaced,
            room: CIRCLES.getCirclesGroupName(),
            world: CIRCLES.getCirclesWorldName(),
            partRemoved: event.detail.id
          });

          
        });
  
        // Listen for the global raft update events
        CONTEXT_AF.socket.on(CONTEXT_AF.sledEventName, (data) => {
          if (
            data.world === CIRCLES.getCirclesWorldName() &&
            data.room === CIRCLES.getCirclesGroupName()
          ) {
            // Only update if the incoming count is greater than the local value
            if (data.sledPartsPlaced > this.sledPartsPlaced) {
              this.sledPartsPlaced = data.sledPartsPlaced;
              this.updateSledModel();
              const partToRemove = document.querySelector(`#${data.partRemoved}`);
              if (partToRemove.parentNode) {
                partToRemove.parentNode.removeChild(partToRemove);
              }
              this.checkSledFinished();
            }
            console.log("Global parts placed: " + data.sledPartsPlaced);
          }
        });
  
        // Request data sync after a random delay (for late joiners)
        setTimeout(() => {
          CONTEXT_AF.socket.emit(CIRCLES.EVENTS.REQUEST_DATA_SYNC, {
            room: CIRCLES.getCirclesGroupName(),
            world: CIRCLES.getCirclesWorldName()
          });
        },1200);
  
        // When another client requests sync data, send your current logsPlaced value
        CONTEXT_AF.socket.on(CIRCLES.EVENTS.REQUEST_DATA_SYNC, (data) => {
          if (data.world === CIRCLES.getCirclesWorldName()) {
            CONTEXT_AF.socket.emit(CIRCLES.EVENTS.SEND_DATA_SYNC, {
              sledPartsPlaced: this.sledPartsPlaced,
              room: CIRCLES.getCirclesGroupName(),
              world: CIRCLES.getCirclesWorldName()
            });
          }
        });

         // Receive sync data from others
         CONTEXT_AF.socket.on(CIRCLES.EVENTS.RECEIVE_DATA_SYNC, (data) => {
          if (data.world === CIRCLES.getCirclesWorldName()) {
            if (data.sledPartsPlaced > this.sledPartsPlaced) {
              this.sledPartsPlaced = data.sledPartsPlaced;
              this.updateSledModel();
              this.checkSledFinished();
            }
          }
        });
      };

      // If the Circles websocket is ready, set up networking immediately; otherwise, wait for WS_CONNECTED event
      if (CIRCLES.isCirclesWebsocketReady()) {
        CONTEXT_AF.createNetworkingSystem();
      } else {
        let wsReadyFunc = () => {
          CONTEXT_AF.createNetworkingSystem();
          this.el.sceneEl.removeEventListener(
            CIRCLES.EVENTS.WS_CONNECTED,
            wsReadyFunc
          );
        };
        this.el.sceneEl.addEventListener(CIRCLES.EVENTS.WS_CONNECTED, wsReadyFunc);
      }
    }
  });

//check if the target was touched and change color
AFRAME.registerComponent('axe-target-trigger', {
    init: function () {
        this.axeTarget = document.querySelector("#axeTarget");
        //ignore the initial collision - physics detects collisions on start up
        this.initialCollisionSkipped = false; // Flag to track the first collision


        //function to change the target's color
        //used to indicate the target has been touched
        this.chageColor = () => {
          this.axeTarget.setAttribute('material', 'color: #00ff00');
        }

        this.getColor = () => {
          currentColor = this.axeTarget.getAttribute('material');
          this.axeTarget.setAttribute('material', {currentColor})
        }

        // Ensure CONTEXT_AF exists
      window.CONTEXT_AF = window.CONTEXT_AF || {};
      CONTEXT_AF.targetEventName = "target_event";
      CONTEXT_AF.socket = null;

      // Create the networking system using CONTEXT_AF
      CONTEXT_AF.createNetworkingSystem = () => {
        CONTEXT_AF.socket = CIRCLES.getCirclesWebsocket();
        console.warn(
          "Networking system ready. Socket ID: " +
            CONTEXT_AF.socket.id +
            " in room: " +
            CIRCLES.getCirclesGroupName() +
            " in world: " +
            CIRCLES.getCirclesWorldName()
        );

       // This is the code that checks if one of the parts was cliked
        // Listen for the 'collision' event
        this.axeTarget.addEventListener('collide', (event) => {
           // Skip first collision on startup
          if (!this.initialCollisionSkipped) {
            this.initialCollisionSkipped = true;
            return;
          }
          
          console.log("Collision detected!", event.detail.body.el);
          const axe = event.detail.body.el;
          if (!axe || !axe.classList.contains('interactable-axe')) return;
          
          this.axeTarget.emit('targetTouched');
          this.chageColor();

          // Emit the updated count globally
          CONTEXT_AF.socket.emit(CONTEXT_AF.targetEventName, {
            room: CIRCLES.getCirclesGroupName(),
            world: CIRCLES.getCirclesWorldName(),
          });
          
        });
        
        // Listen for the global raft update events
        CONTEXT_AF.socket.on(CONTEXT_AF.targetEventName, (data) => {
          if (
            data.world === CIRCLES.getCirclesWorldName() &&
            data.room === CIRCLES.getCirclesGroupName()
          ) {
            //if we touched the target with the axe, change it's color to green
            console.log("Everyone knows the target was hit");
            this.chageColor();
          }
        });
  
        // Request data sync after a random delay (for late joiners)
        setTimeout(() => {
          CONTEXT_AF.socket.emit(CIRCLES.EVENTS.REQUEST_DATA_SYNC, {
            room: CIRCLES.getCirclesGroupName(),
            world: CIRCLES.getCirclesWorldName()
          });
        },1200);
  
        // When another client requests sync data, send your current logsPlaced value
        CONTEXT_AF.socket.on(CIRCLES.EVENTS.REQUEST_DATA_SYNC, (data) => {
          if (data.world === CIRCLES.getCirclesWorldName()) {
            CONTEXT_AF.socket.emit(CIRCLES.EVENTS.SEND_DATA_SYNC, {
              room: CIRCLES.getCirclesGroupName(),
              world: CIRCLES.getCirclesWorldName()
            });
          }
        });

         // Receive sync data from others
         CONTEXT_AF.socket.on(CIRCLES.EVENTS.RECEIVE_DATA_SYNC, (data) => {
          if (data.world === CIRCLES.getCirclesWorldName()) {
            //this.chageColor();
          }
        });
      };

      // If the Circles websocket is ready, set up networking immediately; otherwise, wait for WS_CONNECTED event
      if (CIRCLES.isCirclesWebsocketReady()) {
        CONTEXT_AF.createNetworkingSystem();
      } else {
        let wsReadyFunc = () => {
          CONTEXT_AF.createNetworkingSystem();
          this.el.sceneEl.removeEventListener(
            CIRCLES.EVENTS.WS_CONNECTED,
            wsReadyFunc
          );
        };
        this.el.sceneEl.addEventListener(CIRCLES.EVENTS.WS_CONNECTED, wsReadyFunc);
      }
        
    }
});

//load the Blizard Enviroment model
AFRAME.registerComponent('blz-lazy-load-environment', {
    init: function () {
      const scene = document.querySelector('a-scene');
      
      const blzWorld = document.querySelector('#blzWorld');
      scene.addEventListener('loaded', () => {
      const gameManager = document.querySelector('#GameManager');
      if (gameManager) {
        gameManager.addEventListener('blz-painting-clicked', () => {   
        //Blizzard set up
        const blzEnv = document.createElement('a-entity');
        //adding cylinder for testing - replace with gltf
        //blzEnv.setAttribute('geometry', 'primitive: cylinder; height: 1; radius: 0.2');
        //add the snow
        
        blzEnv.setAttribute('gltf-model', '#blz_environment');
        blzEnv.setAttribute('position', '-42 -8 -10.743');
        blzEnv.setAttribute('scale', '8 8 8')
        blzEnv.setAttribute('visible', 'true');
        blzEnv.setAttribute('id', 'blzEnv');

        const blzSnow = document.createElement('a-entity');
        blzSnow.setAttribute('particle-system', {
          preset: 'snow', 
          particleCount: 100000,
          accelerationValue: '0 0 0',
          accelerationSpread: '0.2 0 0.2',
          velocityValue: '0 100 0',
          velocitySpread: '2 0 2', 
          color: '#FFFFFF'
        })
        blzSnow.setAttribute('position', '-85.41785 27.11393 0');
        blzSnow.setAttribute('id', 'snow_particles');


        blzWorld.appendChild(blzEnv);
        if (blzSnow !== undefined) {
          blzWorld.appendChild(blzSnow);
          console.log("snow is defined!");
        }
        else {
          console.log("snow object: " + blzSnow);
        }

      const blz_Env = document.querySelector('#blz_environment');
      if (blz_Env) {
        blz_Env.setAttribute('visible', 'true');
        }
        })
      }
    });
    }
  });

  AFRAME.registerComponent('part-highlight', {
    init: function () {
      let el = this.el;
      let sledPedestal = document.querySelector('#sledPedestal');
  
      // Set a material on the GLTF model
      el.setAttribute('material', '#ffffff');
  
      // Highlight the model on mouseenter and restore on mouseleave
      el.addEventListener('mouseenter', function () {
        el.setAttribute('circles-material-extend-fresnel', 'fresnelColor: #ffffff');
      });
      el.addEventListener('mouseleave', function () {
        el.setAttribute('circles-material-extend-fresnel', 'fresnelColor: #000000');
      });
  
      // Emit the 'partSelected' event on click
      el.addEventListener('click', () => {
        console.log(`Emitting partSelected for: ${el.id}`); // Log the emission
        el.emit('partSelected', { id: el.id });
        sledPedestal.emit('partSelected', {id: el.id});
      });
    }
  });
  
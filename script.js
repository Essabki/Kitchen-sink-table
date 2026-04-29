import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x001122);

// Camera
const camera = new THREE.PerspectiveCamera(25, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(15, 10, 15);

// Renderer
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;  
renderer.toneMappingExposure = 1.2;                  
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.zoomToCursor = true;
controls.enablePan = true;
controls.screenSpacePanning = true;
controls.minDistance = 2;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 2;
controls.target.set(0, 3, 0);
controls.update();

// 💡 LIGHTS
scene.add(new THREE.AmbientLight(0xffffff, 3));
const mainLight = new THREE.DirectionalLight(0xffffff, 1.8);
mainLight.position.set(3, 10, 5);
scene.add(mainLight);

// =========================
// 🟤 FLOOR + BACK WALL
// =========================

// =========================
// 🟤 DESK (COMPLETE)
// =========================
const desk = new THREE.Group();

// 1. DESK RIGHT SIDE + DOOR + HANDLE
const geometry_right_side = new THREE.BoxGeometry(3,2,2);
const materials_right_side = [
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({color:0x777777, transparent:true, opacity:0}),
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide})
];
const desk_right_side = new THREE.Mesh(geometry_right_side, materials_right_side);

// RIGHT DOOR PIVOT
const doorPivotright = new THREE.Object3D();
doorPivotright.position.set(0, -1, 1);
const kitchen_desk_right_side_Door = new THREE.Mesh(
    new THREE.BoxGeometry(3,2,0.1),
    new THREE.MeshStandardMaterial({color:0xaaaaaa, transparent:true, opacity:0.4})
);
kitchen_desk_right_side_Door.position.set(0, 1, 0);
doorPivotright.add(kitchen_desk_right_side_Door);

const handleright = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.9, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x777777 })
);
handleright.position.set(0, 0.8,0.08);
handleright.rotation.z = Math.PI / 2;
kitchen_desk_right_side_Door.add(handleright);
desk_right_side.add(doorPivotright);
desk_right_side.position.set(-2.7,-1.5,0);
desk_right_side.rotation.z = Math.PI/-2;
desk.add(desk_right_side);

// 2. DESK LEFT SIDE + DOOR + HANDLE
const geometry_left_side = new THREE.BoxGeometry(3,2,2);
const materials_left_side = [
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({color:0x777777, transparent:true, opacity:0}),
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide})
];
const desk_left_side = new THREE.Mesh(geometry_left_side, materials_left_side);

const doorPivotleft = new THREE.Object3D();
doorPivotleft.position.set(0, -1, 1);
const kitchen_desk_left_side_Door = new THREE.Mesh(
    new THREE.BoxGeometry(3,2,0.1),
    new THREE.MeshStandardMaterial({color:0xaaaaaa, transparent:true, opacity:0.4})
);
kitchen_desk_left_side_Door.position.set(0, 1, 0);
doorPivotleft.add(kitchen_desk_left_side_Door);

const handleleft = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.9, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x777777 })
);
handleleft.position.set(0, 0.8,0.08);
handleleft.rotation.z = Math.PI / 2;
kitchen_desk_left_side_Door.add(handleleft);
desk_left_side.add(doorPivotleft);
desk_left_side.position.set(2.7,-1.5,0);
desk_left_side.rotation.z = Math.PI/2;
desk.add(desk_left_side);

// 3. WATER TAP + FLOOR PIECES
const Water_tap_geometry = new THREE.BoxGeometry(2.5,1.5,1.2);
const Water_tap_materials = [
    new THREE.MeshStandardMaterial({color:0x777777}),
    new THREE.MeshStandardMaterial({color:0x777777}),
    new THREE.MeshStandardMaterial({color:0x777777}),
    new THREE.MeshStandardMaterial({color:0x777777}),
    new THREE.MeshStandardMaterial({color:0x000000, transparent:true, opacity:0.4}),
    new THREE.MeshStandardMaterial({color:0x777777})
];
const Water_tap = new THREE.Mesh(Water_tap_geometry, Water_tap_materials);
Water_tap.position.set(0,-0.6,0);
Water_tap.rotation.x = Math.PI / -2;
desk.add(Water_tap);

// Water tap floor pieces
const Water_tap_floor_left_geometry = new THREE.BoxGeometry(2.50,0.02,2);
const Water_tap_floor_left_material = new THREE.MeshStandardMaterial({color:0x777777});
const Water_tap_floor_left = new THREE.Mesh(Water_tap_floor_left_geometry, Water_tap_floor_left_material);
Water_tap_floor_left.position.set(2.45,0,0);
desk.add(Water_tap_floor_left);

const Water_tap_floor_right_geometry = new THREE.BoxGeometry(2.50,0.02,2);
const Water_tap_floor_right_material = new THREE.MeshStandardMaterial({color:0x777777});
const Water_tap_floor_right = new THREE.Mesh(Water_tap_floor_right_geometry, Water_tap_floor_right_material);
Water_tap_floor_right.position.set(-2.45,0,0);
desk.add(Water_tap_floor_right);

const Water_tap_floor_front_geometry = new THREE.BoxGeometry(2.4,0.02,0.40);
const Water_tap_floor_front_material = new THREE.MeshStandardMaterial({color:0x777777});
const Water_tap_floor_front = new THREE.Mesh(Water_tap_floor_front_geometry, Water_tap_floor_front_material);
Water_tap_floor_front.position.set(0,0,0.8);
desk.add(Water_tap_floor_front);

const Water_tap_floor_back_geometry = new THREE.BoxGeometry(2.4,0.02,0.40);
const Water_tap_floor_back_material = new THREE.MeshStandardMaterial({color:0x777777});
const Water_tap_floor_back = new THREE.Mesh(Water_tap_floor_back_geometry, Water_tap_floor_back_material);
Water_tap_floor_back.position.set(0,0,-0.8);
desk.add(Water_tap_floor_back);

// 🦶 DESK FEET
const deskGroup = new THREE.Group();
const deskfootGeometry = new THREE.CylinderGeometry(0.10, 0.13, 0.23, 8);
const deskfootMaterial = new THREE.MeshStandardMaterial({color: 0x444444});

const deskfoot1 = new THREE.Mesh(deskfootGeometry, deskfootMaterial);
deskfoot1.position.set(-3.55, -3.12, -0.8);
deskfoot1.rotation.x = Math.PI;
deskGroup.add(deskfoot1);

const deskfoot2 = new THREE.Mesh(deskfootGeometry, deskfootMaterial);
deskfoot2.position.set(3.5, -3.12, -0.85);
deskfoot2.rotation.x = Math.PI;
deskGroup.add(deskfoot2);

const deskfoot3 = new THREE.Mesh(deskfootGeometry, deskfootMaterial);
deskfoot3.position.set(-3.55, -3.12, 0.85);
deskfoot3.rotation.x = Math.PI;
deskGroup.add(deskfoot3);

const deskfoot4 = new THREE.Mesh(deskfootGeometry, deskfootMaterial);
deskfoot4.position.set(3.5, -3.12, 0.85);
deskfoot4.rotation.x = Math.PI;
deskGroup.add(deskfoot4);

desk.add(deskGroup);
scene.add(desk);
desk.position.set(0,2, 0);


// 🔥 TREASURY SYSTEM - FULLY INTEGRATED!
const allTreasuries = [];

function createTreasury(x, z, treasuriesArray = allTreasuries) {
    const group = new THREE.Group();

    // BODY
    const geometry = new THREE.BoxGeometry(3,2,2);
    const materials = [
        new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
        new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
        new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
        new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
        new THREE.MeshStandardMaterial({color:0x000000, transparent:true, opacity:0}),
        new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide})
    ];
    const body = new THREE.Mesh(geometry, materials);
    group.add(body);

    // PIVOT
    const pivot = new THREE.Object3D();
    pivot.position.set(0, -1, 1);

    // DOOR
    const door = new THREE.Mesh(
        new THREE.BoxGeometry(3,2,0.1),
        new THREE.MeshStandardMaterial({
            color:0xaaaaaa,
            transparent:true,
            opacity:0.4
        })
    );
    door.position.set(0,1,0);

    // HANDLE
    const handle = new THREE.Mesh(
        new THREE.BoxGeometry(1,0.1,0.1),
        new THREE.MeshStandardMaterial({color:0x777777})
    );
    handle.position.set(0,0.8,0.09);
    door.add(handle);

    pivot.add(door);
    group.add(pivot);

    // POSITION
    group.position.set(x,0,z);
    group.scale.set(0.5,0.5,0.5);
    group.rotation.z = Math.PI / -2;

    // SAVE STATE
    treasuriesArray.push({
        door,
        pivot,
        open:false
    });

    return group;
}

// CREATE TREASURY GROUPS
const treasuryGroupleft = new THREE.Group();
treasuryGroupleft.position.set(1.01, 0, 0);

const treasuryGroupright = new THREE.Group();
treasuryGroupright.position.set(-1.01, 0, 0);

const treasuryfullGroup = new THREE.Group();
treasuryfullGroup.scale.set(1,0.5,0.5);
scene.add(treasuryfullGroup);

// Add treasuries to LEFT group
const treasury1_left = createTreasury(-0.5, 0);
treasury1_left.rotation.z = Math.PI / -2;
treasuryGroupleft.add(treasury1_left);

const treasury2_left = createTreasury(0.5, 0);
treasury2_left.rotation.z = Math.PI / 2;
treasuryGroupleft.add(treasury2_left);

// Add treasuries to RIGHT group
const treasury1_right = createTreasury(-0.5, 0);
treasury1_right.rotation.z = Math.PI / -2;
treasuryGroupright.add(treasury1_right);

const treasury2_right = createTreasury(0.5, 0);
treasury2_right.rotation.z = Math.PI / 2;
treasuryGroupright.add(treasury2_right);

// Add both groups to full group
treasuryfullGroup.add(treasuryGroupleft);
treasuryfullGroup.add(treasuryGroupright);

// POSITION TREASURY IN KITCHEN
treasuryfullGroup.position.set(0, 4.5, 0);
//scale TREASURY IN KITCHEN
treasuryfullGroup.scale.set(1.5,1,1);

// =========================
// 🎮 STATE VARIABLES
// =========================
let rightDoorOpen = false;
let leftDoorOpen = false;
let freezerOpen = false;
let mainFridgeOpen = false;
let shelfOpen = false;
let ovenOpen = false;
let burner1On = false;
let burner2On = false;

//GLB LOADER
// SKIN
const loaderskin = new GLTFLoader();

loaderskin.load('https://raw.githubusercontent.com/Essabki/3D_Kitchen/main/models/kitchen_sink.glb', (gltf) => {
    const skin = gltf.scene;
    // Scale skin (adjust as needed)
    skin.scale.set(3, 3, 2.6);

    // Put skin ON TOP of desk
    skin.position.set(0, 2.02, 0);
 
    scene.add(skin);
});


// =========================
// 🖱️ CLICK SYSTEM - FULL (TREASURY + KITCHEN)
// =========================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (e) => {
    mouse.x = (e.clientX / window.innerWidth)*2 - 1;
    mouse.y = -(e.clientY / window.innerHeight)*2 + 1;
    raycaster.setFromCamera(mouse, camera);
    
    // 🔥 TREASURY SYSTEM - NEW!
    const treasuryHits = raycaster.intersectObject(treasuryfullGroup, true);
    if (treasuryHits.length > 0) {
        const hitObject = treasuryHits[0].object;
        const target = allTreasuries.find(t => 
            t.door === hitObject || 
            t.door.children.includes(hitObject)
        );
        if (target) {
            target.open = !target.open;
        }
    }

    // 🟤 DESK
    if (raycaster.intersectObject(kitchen_desk_right_side_Door).length > 0) {
        rightDoorOpen = !rightDoorOpen;
    }
    if (raycaster.intersectObject(kitchen_desk_left_side_Door).length > 0) {
        leftDoorOpen = !leftDoorOpen;
    }

   
});



// 🔥 ANIMATION LOOP - FULL
function animate() {
    requestAnimationFrame(animate);
    controls.update();
     // 🔥 TREASURY ANIMATION - NEW!
    allTreasuries.forEach(t => {
        const target = t.open ? Math.PI/2 : 0;
        t.pivot.rotation.x += (target - t.pivot.rotation.x) * 0.1;
    });
    // 🟤 DESK
    doorPivotright.rotation.x += ((rightDoorOpen ? Math.PI/2 : 0) - doorPivotright.rotation.x) * 0.1;
    doorPivotleft.rotation.x += ((leftDoorOpen ? Math.PI/2 : 0) - doorPivotleft.rotation.x) * 0.1;

    
    renderer.render(scene, camera);
}
animate();

// RESIZE
window.addEventListener("resize",()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});
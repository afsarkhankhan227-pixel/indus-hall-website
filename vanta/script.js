/* =========================================
   MOBILE MENU
========================================= */

const menuBtn =
    document.getElementById("menuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");


menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

        });

    });



/* =========================================
   CONTACT FORM
========================================= */

const form =
    document.getElementById("contactForm");


form.addEventListener("submit", (event) => {

    event.preventDefault();

    alert(
        "Thank you! Your enquiry has been received."
    );

    form.reset();

});



/* =========================================
   THREE.JS
========================================= */

const container =
    document.getElementById(
        "three-container"
    );


const scene =
    new THREE.Scene();


const camera =
    new THREE.PerspectiveCamera(
        45,
        window.innerWidth /
        window.innerHeight,
        0.1,
        100
    );


camera.position.z = 7;


const renderer =
    new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });


renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


container.appendChild(
    renderer.domElement
);



/* =========================================
   LIGHTING
========================================= */

const ambient =
    new THREE.AmbientLight(
        0xffffff,
        1.2
    );

scene.add(ambient);


const goldLight =
    new THREE.PointLight(
        0xd4af37,
        5,
        20
    );


goldLight.position.set(
    3,
    2,
    5
);

scene.add(goldLight);


const warmLight =
    new THREE.PointLight(
        0xffe4a0,
        3,
        15
    );


warmLight.position.set(
    -4,
    1,
    3
);

scene.add(warmLight);



/* =========================================
   MAIN 3D STRUCTURE
========================================= */

const group =
    new THREE.Group();

scene.add(group);



/* CENTRAL DOME */

const domeGeometry =
    new THREE.SphereGeometry(
        2.2,
        48,
        32,
        0,
        Math.PI * 2,
        0,
        Math.PI / 2
    );


const domeMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x17140e,
        roughness: .35,
        metalness: .4,
        transparent: true,
        opacity: .9
    });


const dome =
    new THREE.Mesh(
        domeGeometry,
        domeMaterial
    );


dome.position.y = -1.1;

group.add(dome);



/* GOLD DOME RING */

const ringGeometry =
    new THREE.TorusGeometry(
        2.2,
        .025,
        16,
        100
    );


const ringMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xd4af37,
        transparent: true,
        opacity: .75
    });


const ring =
    new THREE.Mesh(
        ringGeometry,
        ringMaterial
    );


ring.rotation.x =
    Math.PI / 2;


ring.position.y =
    -1.05;


group.add(ring);



/* =========================================
   PILLARS
========================================= */

for (let i = 0; i < 8; i++) {

    const angle =
        (i / 8) *
        Math.PI *
        2;


    const radius = 3;


    const pillarGeometry =
        new THREE.CylinderGeometry(
            .09,
            .12,
            2.8,
            16
        );


    const pillarMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x302a1c,
            roughness: .3,
            metalness: .6
        });


    const pillar =
        new THREE.Mesh(
            pillarGeometry,
            pillarMaterial
        );


    pillar.position.set(
        Math.cos(angle) * radius,
        -.4,
        Math.sin(angle) * radius
    );


    group.add(pillar);

}



/* =========================================
   FLOATING GOLD PARTICLES
========================================= */

const particleGeometry =
    new THREE.BufferGeometry();


const particleCount = 300;


const positions =
    new Float32Array(
        particleCount * 3
    );


for (let i = 0; i < particleCount; i++) {

    positions[i * 3] =
        (Math.random() - .5) * 14;

    positions[i * 3 + 1] =
        (Math.random() - .5) * 8;

    positions[i * 3 + 2] =
        (Math.random() - .5) * 8;

}


particleGeometry.setAttribute(
    "position",

    new THREE.BufferAttribute(
        positions,
        3
    )
);


const particleMaterial =
    new THREE.PointsMaterial({

        color: 0xd4af37,

        size: .025,

        transparent: true,

        opacity: .65

    });


const particles =
    new THREE.Points(
        particleGeometry,
        particleMaterial
    );


scene.add(particles);



/* =========================================
   MOUSE PARALLAX
========================================= */

let mouseX = 0;
let mouseY = 0;


window.addEventListener(
    "mousemove",
    event => {

        mouseX =
            event.clientX /
            window.innerWidth -
            .5;


        mouseY =
            event.clientY /
            window.innerHeight -
            .5;

    }
);



/* =========================================
   ANIMATION
========================================= */

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    const time =
        clock.getElapsedTime();


    group.rotation.y +=
        (
            mouseX * .45 -
            group.rotation.y
        ) * .02;


    group.rotation.x +=
        (
            -mouseY * .15 -
            group.rotation.x
        ) * .02;


    group.position.y =
        Math.sin(
            time * .7
        ) * .08;


    particles.rotation.y =
        time * .025;


    renderer.render(
        scene,
        camera
    );

}


animate();



/* =========================================
   RESIZE
========================================= */

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);
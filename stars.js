document.addEventListener('DOMContentLoaded', function() {
    // Scene setup
    const container = document.getElementById('stars-canvas');
    if (!container) {
        console.error('Stars canvas container not found');
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    // Set renderer properties
    const containerRect = container.getBoundingClientRect();
    renderer.setSize(containerRect.width, containerRect.height);
    renderer.setClearColor(0xffffff, 0); // Transparent background
    container.appendChild(renderer.domElement);
    
    // Camera position
    camera.position.z = 20;
    
    // Create stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0x635bff,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });
    
    // Generate random star positions
    const starsCount = 3000;
    const positions = new Float32Array(starsCount * 3);
    const velocities = new Float32Array(starsCount);
    
    for (let i = 0; i < starsCount * 3; i += 3) {
        // Spread stars in a thin layer
        positions[i] = (Math.random() - 0.5) * 100;      // x
        positions[i + 1] = (Math.random() - 0.5) * 50;   // y
        positions[i + 2] = (Math.random() - 0.5) * 10;   // z
        
        // Random velocity for each star
        velocities[i / 3] = (Math.random() + 0.5) * 0.05;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        const positions = stars.geometry.attributes.position.array;
        
        for (let i = 0; i < starsCount * 3; i += 3) {
            // Move stars slowly to the right
            positions[i] += velocities[i / 3];
            
            // Reset position when star moves too far right
            if (positions[i] > 50) {
                positions[i] = -50;
            }
        }
        
        stars.geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    function onWindowResize() {
        const containerRect = container.getBoundingClientRect();
        camera.aspect = containerRect.width / containerRect.height;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRect.width, containerRect.height);
    }
    
    // Add resize observer for container size changes
    const resizeObserver = new ResizeObserver(onWindowResize);
    resizeObserver.observe(container);
    
    // Handle window resize as well
    window.addEventListener('resize', onWindowResize, false);
    
    // Start animation
    animate();
    
    // Mouse interaction
    const mouse = new THREE.Vector2();
    
    function onMouseMove(event) {
        const rect = container.getBoundingClientRect();
        // Calculate mouse position relative to container
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Subtle camera movement based on mouse position
        camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 2 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
    }
    
    // Add mouse movement only when mouse is over container
    container.addEventListener('mousemove', onMouseMove, false);
    
    // Cleanup function
    function cleanup() {
        resizeObserver.disconnect();
        window.removeEventListener('resize', onWindowResize);
        container.removeEventListener('mousemove', onMouseMove);
        renderer.dispose();
    }

    // Cleanup on page unload
    window.addEventListener('unload', cleanup);
});
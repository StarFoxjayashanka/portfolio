import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function AuraMantle({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Create an abstract "head" composition
  const headParts = useMemo(() => {
    return [
      { size: 1.5, type: 'Sphere', color: '#111', roughness: 0.1, position: [0, 0, 0] },
      { size: [0.8, 0.4, 0.4], type: 'Box', color: '#fff', roughness: 0, position: [0, 0, 1.2], emissive: '#fff' }, // Brow/Forehead shard
      { size: [0.4, 1.2, 0.2], type: 'Box', color: '#fff', roughness: 0, position: [0, -0.4, 1.3] }, // Nose shard
      { size: [0.3, 0.3, 0.3], type: 'Sphere', color: '#fff', roughness: 0, position: [0.6, 0.4, 1], emissive: '#fff', emissiveIntensity: 2 }, // Left Eye
      { size: [0.3, 0.3, 0.3], type: 'Sphere', color: '#fff', roughness: 0, position: [-0.6, 0.4, 1], emissive: '#fff', emissiveIntensity: 2 }, // Right Eye
    ];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth target rotation based on mouse
    const targetX = mouse.current[1] * -0.3;
    const targetY = mouse.current[0] * 0.3;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.1);
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.2}>
        {/* Core Head */}
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial
            color="#0a0a0a"
            roughness={0.1}
            metalness={1}
            distort={0.2}
            speed={2}
          />
        </mesh>
        
        {/* Face Features */}
        {headParts.map((part, i) => (
          <mesh 
            key={i} 
            position={part.position as [number, number, number]}
          >
            {part.type === 'Box' ? (
              <boxGeometry args={part.size as [number, number, number]} />
            ) : (
              <sphereGeometry args={[part.size as number, 32, 32]} />
            )}
            <meshStandardMaterial 
              color={part.color} 
              roughness={part.roughness} 
              emissive={part.emissive || '#000'}
              emissiveIntensity={part.emissiveIntensity || 1}
            />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

export default function Face3D() {
  const mouse = useRef<[number, number]>([0, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouse.current = [
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    ];
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full cursor-none z-10"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, stencil: false, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#fff" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <AuraMantle mouse={mouse} />
        
        <Environment preset="city" />
        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2.5} 
          far={4} 
        />
      </Canvas>
    </div>
  );
}

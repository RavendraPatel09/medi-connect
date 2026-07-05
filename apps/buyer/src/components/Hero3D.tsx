import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const Pill = ({ position, color, speed, offset }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed + offset;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5 + offset;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh ref={meshRef} castShadow>
        <capsuleGeometry args={[0.5, 1, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          transmission={0.9}
          opacity={1}
          metalness={0.1}
          roughness={0.1}
          ior={1.5}
          thickness={2}
        />
      </mesh>
    </Float>
  );
};

const Hero3D = () => {
  return (
    <div className="h-full w-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        {/* Blue Pill */}
        <Pill position={[-4, 2, -2]} color="#3B82F6" speed={0.2} offset={0} />
        
        {/* Green Pill */}
        <Pill position={[5, -1, -5]} color="#10B981" speed={0.15} offset={Math.PI / 2} />
        
        {/* Purple Pill */}
        <Pill position={[-5, -3, -4]} color="#8B5CF6" speed={0.3} offset={Math.PI} />

        {/* Orange Pill */}
        <Pill position={[3, 4, -8]} color="#F59E0B" speed={0.25} offset={Math.PI * 1.5} />

        <ContactShadows position={[0, -5, 0]} opacity={0.5} scale={20} blur={2} far={10} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default Hero3D;

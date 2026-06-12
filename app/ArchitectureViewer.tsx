import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Sky, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Preload the model so it loads into the browser cache instantly
useGLTF.preload('/Untitled.glb');

// --- MODEL COMPONENT ---
function HotelModel() {
  const { scene } = useGLTF('/Untitled.glb');
  
  // ==========================================
  // TEMPORARY FIX: Adjust the middle number (Y-axis) below to bring the building down.
  // If it's still too high, make it a larger negative number (e.g., -10, -15).
  // If it goes underground, make it closer to 0 (e.g., -2).
  // ==========================================
  return <primitive object={scene} position={[0, -5, 0]} />;
}

// --- FALLBACK PLACEHOLDER (Prevents crashes while loading) ---
function LoadingPlaceholder() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="red" wireframe />
    </mesh>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [timeOfDay, setTimeOfDay] = useState('daylight'); // 'daylight' | 'sunset'
  const [viewMode, setViewMode] = useState('detailed');   // 'massing' | 'detailed'

  return (
    <div className="relative w-full h-screen bg-neutral-900 overflow-hidden font-sans touch-none">
      
      {/* 3D CANVAS */}
      <Canvas shadows dpr={[1, 2]} camera={{ position: [-30, 20, 40], fov: 45 }}>
        <Suspense fallback={<LoadingPlaceholder />}>
          {/* Lighting Setup based on time of day */}
          {timeOfDay === 'daylight' ? (
            <>
              <Sky sunPosition={[100, 50, 100]} turbidity={0.1} rayleigh={0.5} />
              <ambientLight intensity={0.6} />
              <directionalLight 
                castShadow 
                position={[20, 30, 10]} 
                intensity={1.5} 
                shadow-mapSize={[2048, 2048]} 
              />
              <Environment preset="city" />
            </>
          ) : (
            <>
              <Sky sunPosition={[100, 2, -50]} turbidity={10} rayleigh={2} mieCoefficient={0.005} mieDirectionalG={0.8} />
              <ambientLight intensity={0.2} color="#ffbbaa" />
              <directionalLight 
                castShadow 
                position={[50, 5, -25]} 
                intensity={2} 
                color="#ff9955"
                shadow-mapSize={[2048, 2048]} 
              />
              <Environment preset="sunset" />
            </>
          )}

          {/* Load Your Actual Model with the Temp Y-Axis Fix */}
          <HotelModel />

          {/* Soft Ground Shadows - Positioned slightly below the temporary -5 offset */}
          <ContactShadows resolution={1024} scale={100} blur={2} opacity={0.5} far={20} color="#000000" position={[0, -5.1, 0]} />

          {/* Interactive Controls (Mobile Touch Optimized) */}
          <OrbitControls 
            makeDefault 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            enableDamping={true} 
            dampingFactor={0.05} 
            minDistance={10}
            maxDistance={150} 
            maxPolarAngle={Math.PI / 2 - 0.05} 
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>

      {/* LUXURY UI OVERLAY */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 md:bottom-10 md:left-10 md:translate-x-0 lg:bottom-12 lg:left-12 flex flex-col gap-4 w-[90%] md:w-auto max-w-sm md:max-w-md pointer-events-none z-10">
        
        {/* Title Card */}
        <div className="backdrop-blur-xl bg-black/40 border border-white/10 p-5 lg:p-6 rounded-2xl shadow-2xl pointer-events-auto transition-all">
          <h1 className="text-white text-xl lg:text-2xl font-light tracking-wide uppercase mb-1">
            1816 Maxwell Mtn
          </h1>
          <p className="text-neutral-400 text-xs lg:text-sm tracking-wider uppercase mb-6">
            Interactive Portal Preview
          </p>

          {/* Controls Container */}
          <div className="space-y-5 lg:space-y-6">
            
            {/* View Mode Toggle */}
            <div>
              <p className="text-white/60 text-[10px] lg:text-xs uppercase tracking-widest mb-2 font-medium">Render Mode</p>
              <div className="flex bg-black/50 p-1 rounded-lg border border-white/5">
                <button 
                  onClick={() => setViewMode('massing')}
                  className={`flex-1 text-xs lg:text-sm py-2 px-4 rounded-md transition-all duration-300 ${viewMode === 'massing' ? 'bg-white text-black font-medium shadow-md' : 'text-white/70 hover:text-white'}`}
                >
                  Massing
                </button>
                <button 
                  onClick={() => setViewMode('detailed')}
                  className={`flex-1 text-xs lg:text-sm py-2 px-4 rounded-md transition-all duration-300 ${viewMode === 'detailed' ? 'bg-white text-black font-medium shadow-md' : 'text-white/70 hover:text-white'}`}
                >
                  Detailed
                </button>
              </div>
            </div>

            {/* Time of Day Toggle */}
            <div>
              <p className="text-white/60 text-[10px] lg:text-xs uppercase tracking-widest mb-2 font-medium">Environment</p>
              <div className="flex bg-black/50 p-1 rounded-lg border border-white/5">
                <button 
                  onClick={() => setTimeOfDay('daylight')}
                  className={`flex-1 text-xs lg:text-sm py-2 px-4 rounded-md transition-all duration-300 ${timeOfDay === 'daylight' ? 'bg-amber-500 text-black font-medium shadow-md' : 'text-white/70 hover:text-white'}`}
                >
                  Daylight
                </button>
                <button 
                  onClick={() => setTimeOfDay('sunset')}
                  className={`flex-1 text-xs lg:text-sm py-2 px-4 rounded-md transition-all duration-300 ${timeOfDay === 'sunset' ? 'bg-orange-500 text-black font-medium shadow-md' : 'text-white/70 hover:text-white'}`}
                >
                  Sunset
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
      
    </div>
  );
}
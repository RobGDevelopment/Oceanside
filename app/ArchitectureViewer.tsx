import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Sky, useGLTF } from '@react-three/drei';

// --- REAL MODEL COMPONENT ---
const HotelModel = () => {
  // This hook automatically grabs the file from your public folder!
  // If you rename 'Untitled.glb' to something else later, just update this string.
  const { scene } = useGLTF('/Untitled.glb');

  return (
    // The primitive tag takes your entire 3D scene and renders it.
    // We adjust the position slightly so it sits nicely on the shadow plane.
    <primitive object={scene} position={[0, -2, 0]} castShadow receiveShadow />
  );
};

// Preload the model so it loads into the browser cache instantly
useGLTF.preload('/Untitled.glb');

// --- MAIN APP COMPONENT ---
export default function App() {
  const [timeOfDay, setTimeOfDay] = useState('daylight'); // 'daylight' | 'sunset'
  const [viewMode, setViewMode] = useState('detailed');   // 'massing' | 'detailed' (Ready for future material swaps)

  return (
    <div className="relative w-full h-screen bg-neutral-900 overflow-hidden font-sans">
      
      {/* 3D CANVAS */}
      <Canvas shadows camera={{ position: [-30, 20, 40], fov: 45 }}>
        <Suspense fallback={null}>
          {/* Lighting Setup based on time of day */}
          {timeOfDay === 'daylight' ? (
            <>
              <Sky sunPosition={[100, 50, 100]} turbidity={0.1} rayleigh={0.5} />
              <ambientLight intensity={0.6} />
              <directionalLight 
                castShadow 
                position={[50, 80, 30]} 
                intensity={1.5} 
                shadow-mapSize={[2048, 2048]} 
                shadow-camera-left={-50}
                shadow-camera-right={50}
                shadow-camera-top={50}
                shadow-camera-bottom={-50}
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

          {/* Load Your Actual Model */}
          <HotelModel />

          {/* Soft Ground Shadows */}
          <ContactShadows resolution={1024} scale={100} blur={2} opacity={0.5} far={20} color="#000000" position={[0, -2.1, 0]} />

          {/* Interactive Controls (Mobile Touch Optimized) */}
          <OrbitControls 
            makeDefault 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            minDistance={10}
            maxDistance={150} // Increased so you can zoom out and see the whole site
            maxPolarAngle={Math.PI / 2 - 0.05} // Prevent camera from going under the ground
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>

      {/* LUXURY UI OVERLAY */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 md:bottom-10 md:left-10 md:translate-x-0 flex flex-col gap-4 w-[90%] md:w-auto max-w-sm pointer-events-none">
        
        {/* Title Card */}
        <div className="backdrop-blur-xl bg-black/40 border border-white/10 p-5 rounded-2xl shadow-2xl pointer-events-auto transition-all">
          <h1 className="text-white text-xl font-light tracking-wide uppercase mb-1">
            1816 Maxwell Mtn
          </h1>
          <p className="text-neutral-400 text-xs tracking-wider uppercase mb-6">
            Interactive Portal Preview
          </p>

          {/* Controls Container */}
          <div className="space-y-5">
            
            {/* View Mode Toggle (Currently UI only, will wire up later) */}
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest mb-2 font-medium">Render Mode</p>
              <div className="flex bg-black/50 p-1 rounded-lg border border-white/5">
                <button 
                  onClick={() => setViewMode('massing')}
                  className={`flex-1 text-xs py-2 px-4 rounded-md transition-all duration-300 ${viewMode === 'massing' ? 'bg-white text-black font-medium shadow-md' : 'text-white/70 hover:text-white'}`}
                >
                  Massing
                </button>
                <button 
                  onClick={() => setViewMode('detailed')}
                  className={`flex-1 text-xs py-2 px-4 rounded-md transition-all duration-300 ${viewMode === 'detailed' ? 'bg-white text-black font-medium shadow-md' : 'text-white/70 hover:text-white'}`}
                >
                  Detailed
                </button>
              </div>
            </div>

            {/* Time of Day Toggle */}
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest mb-2 font-medium">Environment</p>
              <div className="flex bg-black/50 p-1 rounded-lg border border-white/5">
                <button 
                  onClick={() => setTimeOfDay('daylight')}
                  className={`flex-1 text-xs py-2 px-4 rounded-md transition-all duration-300 ${timeOfDay === 'daylight' ? 'bg-amber-500 text-black font-medium shadow-md' : 'text-white/70 hover:text-white'}`}
                >
                  Daylight
                </button>
                <button 
                  onClick={() => setTimeOfDay('sunset')}
                  className={`flex-1 text-xs py-2 px-4 rounded-md transition-all duration-300 ${timeOfDay === 'sunset' ? 'bg-orange-500 text-black font-medium shadow-md' : 'text-white/70 hover:text-white'}`}
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
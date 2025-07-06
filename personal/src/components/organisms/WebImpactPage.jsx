/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */
import React, { useState, useRef, useEffect, useMemo, Suspense } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
} from 'recharts';
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
  invalidate,
} from '@react-three/fiber';
import {
  OrbitControls,
  useGLTF,
  useFBX,
  useProgress,
  Html,
  Environment,
  ContactShadows,
} from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

// Componente 3D simplificado para React Logo
const ReactLogo = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative" style={{ transform: `rotate(${rotation}deg)` }}>
        <div className="w-32 h-32 rounded-full border-4 border-gray-400 relative">
          <div className="absolute inset-0 rounded-full border-4 border-gray-400 rotate-60"></div>
          <div className="absolute inset-0 rounded-full border-4 border-gray-400 rotate-120"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

// Componente ModelViewer mejorado
const isTouch =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);
const deg2rad = (d) => (d * Math.PI) / 180;
const DECIDE = 8;
const ROTATE_SPEED = 0.005;
const INERTIA = 0.925;
const PARALLAX_MAG = 0.05;
const PARALLAX_EASE = 0.12;
const HOVER_MAG = deg2rad(6);
const HOVER_EASE = 0.15;

const Loader = ({ placeholderSrc }) => {
  const { progress, active } = useProgress();
  if (!active && placeholderSrc) return null;
  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-400">Cargando modelo {Math.round(progress)}%</p>
      </div>
    </Html>
  );
};

const DesktopControls = ({ pivot, min, max, zoomEnabled }) => {
  const ref = useRef(null);
  const { camera } = useThree();
  
  useFrame(() => {
    if (ref.current) {
      ref.current.target.copy(pivot);
      camera.position.lerp(ref.current.object.position, 0.1);
      camera.quaternion.slerp(ref.current.object.quaternion, 0.1);
    }
  });

  return (
    <OrbitControls
      ref={ref}
      makeDefault
      enablePan={false}
      enableRotate={false}
      enableZoom={zoomEnabled}
      minDistance={min}
      maxDistance={max}
      dampingFactor={0.05}
      autoRotateSpeed={0.5}
      rotateSpeed={0.5}
      zoomSpeed={0.8}
    />
  );
};

const ModelInner = ({
  url,
  xOff,
  yOff,
  pivot,
  initYaw,
  initPitch,
  minZoom,
  maxZoom,
  enableMouseParallax,
  enableManualRotation,
  enableHoverRotation,
  enableManualZoom,
  autoFrame,
  fadeIn,
  autoRotate,
  autoRotateSpeed,
  onLoaded,
}) => {
  const outer = useRef(null);
  const inner = useRef(null);
  const { camera, gl } = useThree();

  const vel = useRef({ x: 0, y: 0 });
  const tPar = useRef({ x: 0, y: 0 });
  const cPar = useRef({ x: 0, y: 0 });
  const tHov = useRef({ x: 0, y: 0 });
  const cHov = useRef({ x: 0, y: 0 });

  const ext = useMemo(() => url.split('.').pop().toLowerCase(), [url]);
  const content = useMemo(() => {
    if (ext === 'glb' || ext === 'gltf') return useGLTF(url).scene.clone();
    if (ext === 'fbx') return useFBX(url).clone();
    if (ext === 'obj') return useLoader(OBJLoader, url).clone();
    console.error('Unsupported format:', ext);
    return null;
  }, [url, ext]);

  const pivotW = useRef(new THREE.Vector3());
  useEffect(() => {
    if (!content) return;
    const g = inner.current;
    g.updateWorldMatrix(true, true);

    const sphere = new THREE.Box3()
      .setFromObject(g)
      .getBoundingSphere(new THREE.Sphere());
    const s = 1 / (sphere.radius * 2);
    g.position.set(-sphere.center.x, -sphere.center.y, -sphere.center.z);
    g.scale.setScalar(s);

    g.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        if (fadeIn) {
          o.material.transparent = true;
          o.material.opacity = 0;
        }
      }
    });

    g.getWorldPosition(pivotW.current);
    pivot.copy(pivotW.current);
    outer.current.rotation.set(initPitch, initYaw, 0);

    if (autoFrame && camera.isPerspectiveCamera) {
      const persp = camera;
      const fitR = sphere.radius * s;
      const d = (fitR * 1.2) / Math.sin((persp.fov * Math.PI) / 180 / 2);
      persp.position.set(
        pivotW.current.x,
        pivotW.current.y,
        pivotW.current.z + d
      );
      persp.near = d / 10;
      persp.far = d * 10;
      persp.updateProjectionMatrix();
    }

    if (fadeIn) {
      let t = 0;
      const id = setInterval(() => {
        t += 0.05;
        const v = Math.min(t, 1);
        g.traverse((o) => {
          if (o.isMesh) o.material.opacity = v;
        });
        invalidate();
        if (v === 1) {
          clearInterval(id);
          onLoaded?.();
        }
      }, 16);
      return () => clearInterval(id);
    } else onLoaded?.();
  }, [content, camera, autoFrame, fadeIn, initPitch, initYaw, onLoaded, pivot]);

  useEffect(() => {
    if (!enableManualRotation || isTouch) return;
    const el = gl.domElement;
    let drag = false;
    let lx = 0,
      ly = 0;
    const down = (e) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      drag = true;
      lx = e.clientX;
      ly = e.clientY;
      window.addEventListener('pointerup', up);
    };
    const move = (e) => {
      if (!drag) return;
      const dx = e.clientX - lx;
      const dy = e.clientY - ly;
      lx = e.clientX;
      ly = e.clientY;
      outer.current.rotation.y += dx * ROTATE_SPEED;
      outer.current.rotation.x += dy * ROTATE_SPEED;
      vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };
      invalidate();
    };
    const up = () => (drag = false);
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [gl, enableManualRotation]);

  useEffect(() => {
    if (!isTouch) return;
    const el = gl.domElement;
    const pts = new Map();

    let mode = 'idle';
    let sx = 0,
      sy = 0,
      lx = 0,
      ly = 0,
      startDist = 0,
      startZ = 0;

    const down = (e) => {
      if (e.pointerType !== 'touch') return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 1) {
        mode = 'decide';
        sx = lx = e.clientX;
        sy = ly = e.clientY;
      } else if (pts.size === 2 && enableManualZoom) {
        mode = 'pinch';
        const [p1, p2] = [...pts.values()];
        startDist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        startZ = camera.position.z;
        e.preventDefault();
      }
      invalidate();
    };

    const move = (e) => {
      const p = pts.get(e.pointerId);
      if (!p) return;
      p.x = e.clientX;
      p.y = e.clientY;

      if (mode === 'decide') {
        const dx = e.clientX - sx;
        const dy = e.clientY - sy;
        if (Math.abs(dx) > DECIDE || Math.abs(dy) > DECIDE) {
          if (enableManualRotation && Math.abs(dx) > Math.abs(dy)) {
            mode = 'rotate';
            el.setPointerCapture(e.pointerId);
          } else {
            mode = 'idle';
            pts.clear();
          }
        }
      }

      if (mode === 'rotate') {
        e.preventDefault();
        const dx = e.clientX - lx;
        const dy = e.clientY - ly;
        lx = e.clientX;
        ly = e.clientY;
        outer.current.rotation.y += dx * ROTATE_SPEED;
        outer.current.rotation.x += dy * ROTATE_SPEED;
        vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };
        invalidate();
      } else if (mode === 'pinch' && pts.size === 2) {
        e.preventDefault();
        const [p1, p2] = [...pts.values()];
        const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        const ratio = startDist / d;
        camera.position.z = THREE.MathUtils.clamp(
          startZ * ratio,
          minZoom,
          maxZoom
        );
        invalidate();
      }
    };

    const up = (e) => {
      pts.delete(e.pointerId);
      if (mode === 'rotate' && pts.size === 0) mode = 'idle';
      if (mode === 'pinch' && pts.size < 2) mode = 'idle';
    };

    el.addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', up, { passive: true });
    window.addEventListener('pointercancel', up, { passive: true });
    return () => {
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, [gl, enableManualRotation, enableManualZoom, minZoom, maxZoom, camera]);

  useEffect(() => {
    if (isTouch) return;
    const mm = (e) => {
      if (e.pointerType !== 'mouse') return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      if (enableMouseParallax)
        tPar.current = { x: -nx * PARALLAX_MAG, y: -ny * PARALLAX_MAG };
      if (enableHoverRotation)
        tHov.current = { x: ny * HOVER_MAG, y: nx * HOVER_MAG };
      invalidate();
    };
    window.addEventListener('pointermove', mm);
    return () => window.removeEventListener('pointermove', mm);
  }, [enableMouseParallax, enableHoverRotation]);

  useFrame((_, dt) => {
    let need = false;
    cPar.current.x = THREE.MathUtils.lerp(cPar.current.x, tPar.current.x, PARALLAX_EASE);
    cPar.current.y = THREE.MathUtils.lerp(cPar.current.y, tPar.current.y, PARALLAX_EASE);
    const phx = cHov.current.x, phy = cHov.current.y;
    cHov.current.x = THREE.MathUtils.lerp(cHov.current.x, tHov.current.x, HOVER_EASE);
    cHov.current.y = THREE.MathUtils.lerp(cHov.current.y, tHov.current.y, HOVER_EASE);

    const ndc = pivotW.current.clone().project(camera);
    ndc.x += xOff + cPar.current.x;
    ndc.y += yOff + cPar.current.y;
    
    const worldPos = ndc.unproject(camera);
    outer.current.position.lerp(worldPos, 0.1);

    outer.current.rotation.x += (cHov.current.x - phx) * 0.1;
    outer.current.rotation.y += (cHov.current.y - phy) * 0.1;

    if (autoRotate) {
      outer.current.rotation.y += autoRotateSpeed * dt;
      need = true;
    }

    outer.current.rotation.y += vel.current.x;
    outer.current.rotation.x += vel.current.y;
    vel.current.x *= INERTIA;
    vel.current.y *= INERTIA;
    if (Math.abs(vel.current.x) > 1e-4 || Math.abs(vel.current.y) > 1e-4)
      need = true;

    if (need) invalidate();
  });

  if (!content) return null;
  return (
    <group ref={outer}>
      <group ref={inner}>
        <primitive 
          object={content} 
          dispose={null}
          onUpdate={(self) => {
            self.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material) {
                  child.material.needsUpdate = true;
                }
              }
            });
          }}
        />
      </group>
    </group>
  );
};

const ModelViewer = ({
  url,
  width = 600,
  height = 600,
  modelXOffset = 0,
  modelYOffset = 0,
  defaultRotationX = -30,
  defaultRotationY = 30,
  defaultZoom = 1.5,
  minZoomDistance = 0.5,
  maxZoomDistance = 10,
  enableMouseParallax = true,
  enableManualRotation = true,
  enableHoverRotation = true,
  enableManualZoom = true,
  ambientIntensity = 0.5,
  keyLightIntensity = 1.5,
  fillLightIntensity = 0.8,
  rimLightIntensity = 1.2,
  environmentPreset = 'studio',
  autoFrame = true,
  placeholderSrc,
  showScreenshotButton = true,
  fadeIn = true,
  autoRotate = true,
  autoRotateSpeed = 0.5,
  onModelLoaded,
}) => {
  useEffect(() => void useGLTF.preload(url), [url]);
  const pivot = useRef(new THREE.Vector3()).current;
  const contactRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  const initYaw = deg2rad(defaultRotationX);
  const initPitch = deg2rad(defaultRotationY);
  const camZ = Math.min(
    Math.max(defaultZoom, minZoomDistance),
    maxZoomDistance
  );

  const capture = () => {
    const g = rendererRef.current,
      s = sceneRef.current,
      c = cameraRef.current;
    if (!g || !s || !c) return;
    g.shadowMap.enabled = false;
    const tmp = [];
    s.traverse((o) => {
      if (o.isLight && 'castShadow' in o) {
        tmp.push({ l: o, cast: o.castShadow });
        o.castShadow = false;
      }
    });
    if (contactRef.current) contactRef.current.visible = false;
    g.render(s, c);
    const urlPNG = g.domElement.toDataURL('image/png');
    const a = document.createElement('a');
    a.download = 'model.png';
    a.href = urlPNG;
    a.click();
    g.shadowMap.enabled = true;
    tmp.forEach(({ l, cast }) => (l.castShadow = cast));
    if (contactRef.current) contactRef.current.visible = true;
    invalidate();
  };

  return (
    <div
      style={{
        width,
        height,
        touchAction: 'pan-y pinch-zoom',
        position: 'relative',
      }}
    >
      {showScreenshotButton && (
        <button
          onClick={capture}
          style={{
            position: 'absolute',
            border: '1px solid #fff',
            right: 16,
            top: 16,
            zIndex: 10,
            cursor: 'pointer',
            padding: '8px 16px',
            borderRadius: 10,
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
          }}
        >
          Take Screenshot
        </button>
      )}

      <Canvas
        shadows
        frameloop="demand"
        gl={{ 
          preserveDrawingBuffer: true,
          antialias: true,
          powerPreference: "high-performance" 
        }}
        onCreated={({ gl, scene, camera }) => {
          rendererRef.current = gl;
          sceneRef.current = scene;
          cameraRef.current = camera;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
        camera={{ fov: 45, position: [0, 0, camZ], near: 0.1, far: 1000 }}
        style={{ touchAction: 'pan-y pinch-zoom', background: 'transparent' }}
      >
        {environmentPreset !== 'none' && (
          <Environment 
            preset={environmentPreset} 
            background={false}
            blur={0.5}
          />
        )}

        <ambientLight intensity={ambientIntensity} color="#ffffff" />
        <directionalLight
          position={[10, 10, 5]}
          intensity={keyLightIntensity}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={500}
        />
        <directionalLight
          position={[-5, 5, 5]}
          intensity={fillLightIntensity}
          color="#aaaaaa"
        />
        <directionalLight 
          position={[0, 5, -10]} 
          intensity={rimLightIntensity} 
          color="#ffffff" 
        />
        <pointLight position={[0, 10, 0]} intensity={0.5} />

        <ContactShadows
          ref={contactRef}
          position={[0, -0.5, 0]}
          opacity={0.5}
          scale={20}
          blur={2.5}
          far={10}
          resolution={1024}
          color="#000000"
        />

        <Suspense fallback={<Loader placeholderSrc={placeholderSrc} />}>
          <ModelInner
            url={url}
            xOff={modelXOffset}
            yOff={modelYOffset}
            pivot={pivot}
            initYaw={initYaw}
            initPitch={initPitch}
            minZoom={minZoomDistance}
            maxZoom={maxZoomDistance}
            enableMouseParallax={enableMouseParallax}
            enableManualRotation={enableManualRotation}
            enableHoverRotation={enableHoverRotation}
            enableManualZoom={enableManualZoom}
            autoFrame={autoFrame}
            fadeIn={fadeIn}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            onLoaded={() => {
              onModelLoaded?.();
              invalidate();
            }}
          />
        </Suspense>

        {!isTouch && (
          <DesktopControls
            pivot={pivot}
            min={minZoomDistance}
            max={maxZoomDistance}
            zoomEnabled={enableManualZoom}
          />
        )}
      </Canvas>
    </div>
  );
};

// Funciones de datos
const generateScatterData = (conversionRate, monthlyVisitors) => {
  const data = [];
  for (let i = 0; i < 50; i++) {
    const visitors = Math.floor(monthlyVisitors * (0.5 + Math.random() * 1.5));
    const baseConversion = conversionRate / 100;
    const variation = (Math.random() - 0.5) * 0.02 + baseConversion;
    const sales = Math.floor(visitors * variation);
    const actualConversion = visitors > 0 ? (sales / visitors) * 100 : 0;

    data.push({
      x: visitors,
      y: sales,
      z: actualConversion,
      conversion: actualConversion.toFixed(2),
    });
  }
  return data.sort((a, b) => a.x - b.x);
};

const generateTrendData = (conversionRate, monthlyVisitors) => {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  return months.map((month, index) => ({
    month,
    ventas: Math.floor(
      monthlyVisitors * (conversionRate / 100) * (0.8 + Math.random() * 0.4)
    ),
    visitantes: Math.floor(monthlyVisitors * (0.9 + Math.random() * 0.2)),
    conversion: (conversionRate * (0.9 + Math.random() * 0.2)).toFixed(1),
  }));
};

// Componente principal WebImpactPage
const WebImpactPage = () => {
  const [conversionRate, setConversionRate] = useState(3.5);
  const [monthlyVisitors, setMonthlyVisitors] = useState(8000);
  const [scatterData, setScatterData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [showModel, setShowModel] = useState(true);
  const [activeModel, setActiveModel] = useState('custom');
  const [activeChart, setActiveChart] = useState('scatter');

  useEffect(() => {
    setScatterData(generateScatterData(conversionRate, monthlyVisitors));
    setTrendData(generateTrendData(conversionRate, monthlyVisitors));
  }, [conversionRate, monthlyVisitors]);

  const calculateProjectedRevenue = () => {
    const monthlySales = Math.floor(monthlyVisitors * (conversionRate / 100));
    const averageOrderValue = 150;
    return monthlySales * averageOrderValue;
  };

  const getConversionMessage = () => {
    if (conversionRate < 2)
      return {
        text: '🚨 Muy baja - Necesitas optimizar tu página',
        color: 'text-red-400',
      };
    if (conversionRate < 5)
      return {
        text: '⚠️ Promedio - Hay espacio para mejorar',
        color: 'text-yellow-400',
      };
    return { text: '🎉 Excelente - ¡Sigue así!', color: 'text-green-400' };
  };

  const message = getConversionMessage();

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Efecto de partículas en el fondo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-gray-600 to-gray-400 opacity-20 animate-pulse"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="text-center space-y-8">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 drop-shadow-lg">
              Ciencia de Conversiones
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-400 max-w-4xl mx-auto font-light leading-relaxed">
            La fórmula molecular para el{' '}
            <span className="text-gray-200 font-semibold">éxito</span> en tu
            presencia web
          </p>

          {/* Estadísticas destacadas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 hover:border-gray-500 transition-all duration-300">
              <div className="text-4xl font-bold text-gray-300">+400%</div>
              <div className="text-gray-400 mt-2">Aumento en conversiones</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 hover:border-gray-500 transition-all duration-300">
              <div className="text-4xl font-bold text-gray-300">24/7</div>
              <div className="text-gray-400 mt-2">Disponibilidad total</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 hover:border-gray-500 transition-all duration-300">
              <div className="text-4xl font-bold text-gray-300">85%</div>
              <div className="text-gray-400 mt-2">Investiga online</div>
            </div>
          </div>
        </div>
      </header>

      {/* Sección de Modelos 3D */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Información */}
          <div className="space-y-8">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 hover:border-gray-500 transition-all duration-300">
              <h2 className="text-4xl font-bold mb-6 text-gray-200">
                📈 Impacto Revolucionario
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-lg text-gray-300">
                    Landing pages aumentan conversiones hasta{' '}
                    <strong className="text-gray-100">400%</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-lg text-gray-300">
                    E-commerce generan{' '}
                    <strong className="text-gray-100">30-50%</strong> más
                    ingresos
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-lg text-gray-300">
                    <strong className="text-gray-100">85%</strong> de clientes
                    investiga online antes de comprar
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 hover:border-gray-500 transition-all duration-300">
              <h2 className="text-4xl font-bold mb-6 text-gray-200">
                💡 Beneficios Clave
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: 'Disponibilidad 24/7',
                    desc: 'Ventas automáticas',
                    color: 'gray',
                  },
                  {
                    title: 'Alcance Global',
                    desc: 'Clientes internacionales',
                    color: 'gray',
                  },
                  {
                    title: 'Reducción de Costos',
                    desc: 'Menos gastos fijos',
                    color: 'gray',
                  },
                  {
                    title: 'Datos Valiosos',
                    desc: 'Analítica avanzada',
                    color: 'gray',
                  },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 p-4 rounded-xl border border-gray-600 hover:border-gray-500 transition-all duration-300 hover:scale-105"
                  >
                    <h3 className="font-bold text-gray-200 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modelo 3D Mejorado */}
          <div className="h-[600px] bg-gray-900/30 backdrop-blur-xl rounded-3xl border border-gray-700 relative overflow-hidden">
            {showModel && (
              <div className="h-full p-8">
                {activeModel === 'react' ? (
                  <ReactLogo />
                ) : (
                  <ModelViewer
                    url="https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf"
                    width="100%"
                    height="100%"
                    modelXOffset={0}
                    modelYOffset={0.2}
                    defaultRotationX={-30}
                    defaultRotationY={30}
                    defaultZoom={1.2}
                    minZoomDistance={0.8}
                    maxZoomDistance={8}
                    ambientIntensity={0.6}
                    keyLightIntensity={1.8}
                    fillLightIntensity={1.0}
                    rimLightIntensity={1.5}
                    environmentPreset="studio"
                    autoFrame={true}
                    fadeIn={true}
                    autoRotate={true}
                    autoRotateSpeed={0.4}
                    showScreenshotButton={false}
                    onModelLoaded={() => console.log('Modelo 3D cargado')}
                  />
                )}
              </div>
            )}

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
              <div className="flex space-x-3">
                <button
                  onClick={() => setActiveModel('react')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeModel === 'react'
                      ? 'bg-gray-600 text-white shadow-lg'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  React
                </button>
                <button
                  onClick={() => setActiveModel('custom')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeModel === 'custom'
                      ? 'bg-gray-600 text-white shadow-lg'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  Modelo 3D
                </button>
              </div>
              <button
                onClick={() => setShowModel(!showModel)}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 transition-all"
              >
                {showModel ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Simulador de Ventas Mejorado */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700">
          <h2 className="text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-gray-300 to-gray-100 text-transparent bg-clip-text">
              🚀 Simulador de Ventas Inteligente
            </span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Controles */}
            <div className="space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-600">
                <label className="block text-gray-300 mb-4 text-xl font-semibold">
                  Tráfico Mensual:{' '}
                  <span className="text-gray-100 font-bold">
                    {monthlyVisitors.toLocaleString()}
                  </span>{' '}
                  visitantes
                </label>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={monthlyVisitors}
                  onChange={(e) => setMonthlyVisitors(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-700 rounded-full appearance-none cursor-pointer slider-thumb"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>1K</span>
                  <span>50K</span>
                  <span>100K</span>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-600">
                <label className="block text-gray-300 mb-4 text-xl font-semibold">
                  Tasa de Conversión:{' '}
                  <span className="text-gray-100 font-bold">
                    {conversionRate.toFixed(1)}%
                  </span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="15"
                  step="0.1"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(parseFloat(e.target.value))}
                  className="w-full h-3 bg-gray-700 rounded-full appearance-none cursor-pointer slider-thumb"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>0.5%</span>
                  <span>7.5%</span>
                  <span>15%</span>
                </div>
                <div className={`mt-3 text-base font-medium ${message.color}`}>
                  {message.text}
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800/70 to-gray-700/70 backdrop-blur-lg rounded-2xl p-6 border border-gray-600">
                <h3 className="text-2xl font-bold mb-6 text-gray-200">
                  📊 Proyección de Ventas
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-xl">
                    <span className="text-gray-300 text-lg">
                      Ventas mensuales:
                    </span>
                    <span className="font-bold text-2xl text-white">
                      {Math.floor(
                        monthlyVisitors * (conversionRate / 100)
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-xl">
                    <span className="text-gray-300 text-lg">
                      Ingresos estimados:
                    </span>
                    <span className="font-bold text-2xl text-green-400">
                      ${calculateProjectedRevenue().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-xl">
                    <span className="text-gray-300 text-lg">
                      Potencial anual:
                    </span>
                    <span className="font-bold text-2xl text-gray-200">
                      ${(calculateProjectedRevenue() * 12).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gráficos */}
            <div className="space-y-6">
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setActiveChart('scatter')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    activeChart === 'scatter'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  Dispersión
                </button>
                <button
                  onClick={() => setActiveChart('trend')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    activeChart === 'trend'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  Tendencia
                </button>
              </div>

              <div className="h-[400px] bg-gray-900/30 rounded-2xl border border-gray-700 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  {activeChart === 'scatter' ? (
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        type="number"
                        dataKey="x"
                        name="Visitantes"
                        stroke="#9CA3AF"
                        tick={{ fill: '#D1D5DB' }}
                      />
                      <YAxis
                        type="number"
                        dataKey="y"
                        name="Ventas"
                        stroke="#9CA3AF"
                        tick={{ fill: '#D1D5DB' }}
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(0, 0, 0, 0.9)',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff',
                        }}
                        formatter={(value, name) =>
                          [value, name === 'y' ? 'Ventas' : 'Visitantes']
                        }
                      />
                      <Scatter
                        name="Visitantes vs Ventas"
                        data={scatterData}
                        fill="#6B7280"
                        fillOpacity={0.8}
                      />
                    </ScatterChart>
                  ) : (
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="month"
                        stroke="#9CA3AF"
                        tick={{ fill: '#D1D5DB' }}
                      />
                      <YAxis stroke="#9CA3AF" tick={{ fill: '#D1D5DB' }} />
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(0, 0, 0, 0.9)',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="ventas"
                        stroke="#6B7280"
                        strokeWidth={3}
                        dot={{ fill: '#6B7280', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Casos de Éxito */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <h2 className="text-5xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-gray-300 to-gray-100 text-transparent bg-clip-text">
            💼 Casos de Éxito Real
          </span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Tienda de Ropa',
              improvement: '+320%',
              desc: 'Aumento en ventas con e-commerce optimizado',
              gradient: 'from-gray-600 to-gray-500',
              icon: '🛍️',
            },
            {
              name: 'Servicios Profesionales',
              improvement: '+450%',
              desc: 'Crecimiento en leads con landing page especializada',
              gradient: 'from-gray-500 to-gray-400',
              icon: '⚡',
            },
            {
              name: 'Producto Digital',
              improvement: '+280%',
              desc: 'Incremento en conversiones con funnel automatizado',
              gradient: 'from-gray-400 to-gray-300',
              icon: '📱',
            },
          ].map((caseStudy, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700 hover:border-gray-500 transition-all duration-300 hover:scale-105"
            >
              <div className="text-6xl mb-4">{caseStudy.icon}</div>
              <div
                className={`text-6xl font-black mb-4 bg-gradient-to-r ${caseStudy.gradient} text-transparent bg-clip-text`}
              >
                {caseStudy.improvement}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-200">
                {caseStudy.name}
              </h3>
              <p className="text-gray-400 text-lg">{caseStudy.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center relative z-10">
        <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-xl rounded-3xl p-12 border border-gray-700 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-gray-300 to-gray-100 text-transparent bg-clip-text">
              ¿Listo para Transformar tu Negocio?
            </h2>
            <p className="text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Nuestro equipo puede ayudarte a crear la solución perfecta para tus
              necesidades
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="group relative overflow-hidden bg-gradient-to-r from-gray-700 to-gray-600 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <span className="relative z-10">Hablar con un Experto</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="group relative overflow-hidden border-2 border-gray-500 text-gray-300 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:bg-gray-800/50 hover:text-white">
                <span className="relative z-10">Ver Demostración</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Estilos personalizados */}
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: linear-gradient(45deg, #6b7280, #9ca3af);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.3);
          transition: all 0.3s ease;
        }

        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 0 5px rgba(107, 114, 128, 0.5);
        }

        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: linear-gradient(45deg, #6b7280, #9ca3af);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.3);
        }
      `}</style>
    </div>
  );
};

export default WebImpactPage;
import { useEffect, useRef, useState } from 'react';
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";

const Aurora = ({ 
  colorStops = ["#3A29FF", "#FF94B4", "#FF3232"],
  blend = 0.5,
  amplitude = 1.5, // Adjusted amplitude for half size
  speed = 0.5,
  height = "h-[50vh]", // Half viewport height
  fadeDistance = 300,
  mobileHeight = "h-[30vh]", // Specific height for mobile
  mobileAmplitude = 1.0 // Reduced amplitude for mobile
}) => {
  const containerRef = useRef(null);
  const propsRef = useRef({ colorStops, blend, amplitude, speed });
  const [scrollY, setScrollY] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    propsRef.current = { colorStops, blend, amplitude, speed };
  }, [colorStops, blend, amplitude, speed]);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);
      
      // Calculate opacity based on scroll position
      const newOpacity = Math.max(0, 1 - (currentScroll / fadeDistance));
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fadeDistance]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Configuración del renderizador WebGL
    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    
    // Asegurar que el canvas ocupe todo el contenedor
    const canvas = gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.opacity = opacity;
    canvas.style.transition = 'opacity 0.3s ease-out';

    // Update canvas opacity when opacity state changes
    const updateOpacity = () => {
      canvas.style.opacity = opacity;
    };
    updateOpacity();

    // Función para manejar el redimensionamiento
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
        // Update amplitude based on mobile state
        program.uniforms.uAmplitude.value = isMobile ? mobileAmplitude : propsRef.current.amplitude;
      }
    };

    window.addEventListener('resize', handleResize);

    // Geometría y shaders
    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const vertexShader = `#version 300 es
    in vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }`;

    const fragmentShader = `#version 300 es
    precision highp float;
    
    uniform float uTime;
    uniform float uAmplitude;
    uniform vec3 uColorStops[3];
    uniform vec2 uResolution;
    uniform float uBlend;
    uniform float uOpacity;
    
    out vec4 fragColor;
    
    vec3 permute(vec3 x) {
      return mod(((x * 34.0) + 1.0) * x, 289.0);
    }
    
    float snoise(vec2 v){
      const vec4 C = vec4(
          0.211324865405187, 0.366025403784439,
          -0.577350269189626, 0.024390243902439
      );
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
    
      vec3 p = permute(
          permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0)
      );
    
      vec3 m = max(
          0.5 - vec3(
              dot(x0, x0),
              dot(x12.xy, x12.xy),
              dot(x12.zw, x12.zw)
          ), 
          0.0
      );
      m = m * m;
      m = m * m;
    
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }
    
    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution;
      
      // Mezcla de colores
      vec3 color;
      if (uv.x < 0.5) {
        color = mix(uColorStops[0], uColorStops[1], uv.x * 2.0);
      } else {
        color = mix(uColorStops[1], uColorStops[2], (uv.x - 0.5) * 2.0);
      }
      
      // Efecto aurora ajustado para tamaño reducido
      float noise = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
      float height = exp(noise);
      float intensity = 0.6 * (uv.y * 2.0 - height + 0.2);
      
      float midPoint = 0.20;
      float alpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
      
      // Apply scroll-based opacity
      alpha *= uOpacity;
      
      fragColor = vec4(color * intensity * alpha, alpha);
    }`;

    let program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: isMobile ? mobileAmplitude : amplitude },
        uColorStops: { value: colorStops.map(hex => {
          const c = new Color(hex);
          return [c.r, c.g, c.b];
        })},
        uResolution: { value: [container.clientWidth, container.clientHeight] },
        uBlend: { value: blend },
        uOpacity: { value: opacity }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(canvas);

    // Animación
    let animationId;
    const animate = (time) => {
      animationId = requestAnimationFrame(animate);
      program.uniforms.uTime.value = time * 0.001 * propsRef.current.speed;
      program.uniforms.uAmplitude.value = isMobile ? mobileAmplitude : propsRef.current.amplitude;
      program.uniforms.uBlend.value = propsRef.current.blend;
      program.uniforms.uOpacity.value = opacity;
      
      const stops = propsRef.current.colorStops;
      program.uniforms.uColorStops.value = stops.map(hex => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });
      
      renderer.render({ scene: mesh });
    };
    animationId = requestAnimationFrame(animate);

    // Configuración inicial
    handleResize();

    // Limpieza
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [opacity, isMobile]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full ${isMobile ? mobileHeight : height} overflow-hidden pointer-events-none`}
    />
  );
};

export default Aurora;
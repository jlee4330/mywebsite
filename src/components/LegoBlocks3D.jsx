import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';

// Single LEGO-style block component with label
function LegoBlock({ position, color, size = [1, 1, 1], label, description, rotationSpeed = 0.5, onHover, isHovered }) {
    const meshRef = useRef();
    const [width, height, depth] = size;

    // Create studs on top of the block
    const studs = useMemo(() => {
        const studPositions = [];
        const studRadius = 0.18;
        const studHeight = 0.14;

        for (let x = 0; x < width; x++) {
            for (let z = 0; z < depth; z++) {
                studPositions.push({
                    x: (x - (width - 1) / 2) * 0.5,
                    z: (z - (depth - 1) / 2) * 0.5,
                    radius: studRadius,
                    height: studHeight
                });
            }
        }
        return studPositions;
    }, [width, depth]);

    useFrame((state) => {
        if (meshRef.current) {
            const hoverScale = isHovered ? 1.08 : 1;
            meshRef.current.scale.lerp({ x: hoverScale, y: hoverScale, z: hoverScale }, 0.1);
        }
    });

    const blockHeight = height * 0.5;

    return (
        <group
            ref={meshRef}
            position={position}
            onPointerEnter={() => onHover(label)}
            onPointerLeave={() => onHover(null)}
        >
            {/* Main block body */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[width * 0.5, blockHeight, depth * 0.5]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.25}
                    metalness={0.1}
                    emissive={isHovered ? color : '#000000'}
                    emissiveIntensity={isHovered ? 0.15 : 0}
                />
            </mesh>

            {/* Studs on top */}
            {studs.map((stud, index) => (
                <mesh
                    key={index}
                    position={[stud.x, blockHeight / 2 + stud.height / 2, stud.z]}
                    castShadow
                >
                    <cylinderGeometry args={[stud.radius, stud.radius, stud.height, 16]} />
                    <meshStandardMaterial
                        color={color}
                        roughness={0.25}
                        metalness={0.1}
                        emissive={isHovered ? color : '#000000'}
                        emissiveIntensity={isHovered ? 0.15 : 0}
                    />
                </mesh>
            ))}

            {/* Label on hover */}
            {isHovered && (
                <Html
                    position={[width * 0.4, 0, 0]}
                    center
                    style={{
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <div className="block-label">
                        <span className="block-label-title">{label}</span>
                        <span className="block-label-desc">{description}</span>
                    </div>
                </Html>
            )}
        </group>
    );
}

// Interactive floating blocks stack representing AI + Design + HCI intersection
function BlocksStack({ mousePosition, hoveredBlock, setHoveredBlock }) {
    const groupRef = useRef();

    // Block configurations - Design (base) → HCI (middle) → AI (top) = HAI
    const blocks = useMemo(() => [
        {
            position: [0, -1.2, 0],
            color: '#a78bfa',
            size: [4, 1, 3],
            label: 'Design',
            description: '디자인 씽킹 & 창의적 문제해결'
        },
        {
            position: [0.1, -0.4, 0],
            color: '#60a5fa',
            size: [3, 1, 2],
            label: 'HCI',
            description: '인간-컴퓨터 상호작용'
        },
        {
            position: [-0.1, 0.4, 0.1],
            color: '#34d399',
            size: [2, 1, 2],
            label: 'AI',
            description: '인공지능 & 머신러닝'
        },
    ], []);

    useFrame(() => {
        if (groupRef.current && mousePosition.current) {
            // Smooth rotation based on mouse position
            const targetRotationY = mousePosition.current.x * 0.4;
            const targetRotationX = mousePosition.current.y * 0.2;

            groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05;
            groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05;
        }
    });

    return (
        <Float
            speed={1.5}
            rotationIntensity={0.15}
            floatIntensity={0.4}
        >
            <group ref={groupRef}>
                {blocks.map((block, index) => (
                    <LegoBlock
                        key={index}
                        position={block.position}
                        color={block.color}
                        size={block.size}
                        label={block.label}
                        description={block.description}
                        rotationSpeed={0.3 + index * 0.1}
                        onHover={setHoveredBlock}
                        isHovered={hoveredBlock === block.label}
                    />
                ))}
            </group>
        </Float>
    );
}

// Main component
export default function LegoBlocks3D() {
    const mousePosition = useRef({ x: 0, y: 0 });
    const containerRef = useRef();
    const [hoveredBlock, setHoveredBlock] = useState(null);

    const handleMouseMove = (event) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            mousePosition.current = {
                x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
                y: -((event.clientY - rect.top) / rect.height - 0.5) * 2
            };
        }
    };

    return (
        <div
            ref={containerRef}
            className="lego-canvas-container"
            onMouseMove={handleMouseMove}
        >
            <Canvas
                camera={{ position: [0, 0.5, 6], fov: 40 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.7} />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={0.9}
                    castShadow
                />
                <directionalLight
                    position={[-3, 3, -3]}
                    intensity={0.4}
                />
                <BlocksStack
                    mousePosition={mousePosition}
                    hoveredBlock={hoveredBlock}
                    setHoveredBlock={setHoveredBlock}
                />
            </Canvas>

            {/* Center indicator showing HAI intersection */}
            <div className="intersection-label">
                <span className="intersection-title">HAI Research</span>
                <span className="intersection-subtitle">Human-AI Interaction</span>
            </div>
        </div>
    );
}

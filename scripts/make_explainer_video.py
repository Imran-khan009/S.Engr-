#!/usr/bin/env python3
import os
import math
import subprocess
import shutil

WIDTH = 960
HEIGHT = 540
FPS = 30
TOTAL_FRAMES = 120 # 4 second seamless loop

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TMP_DIR = "/tmp/spheres_frames"
OUTPUT_DIR = os.path.join(BASE_DIR, "public", "assets", "videos")
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "explainer_spheres__copy_.mp4")
ROOT_OUTPUT_FILE = os.path.join(BASE_DIR, "public", "explainer_spheres__copy_.mp4")

os.makedirs(TMP_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

CX = WIDTH / 2
CY = HEIGHT / 2

# Orbiting satellites definition (semi_major_x, semi_minor_y, tilt_angle, base_angle, speed_mult, color, glow_color, radius, label)
ORBITS = [
    (240, 95, 0.28, 0, 1, "#f97316", "rgba(249, 115, 22, 0.4)", 22, "IoT / AI"),
    (280, 110, -0.35, math.pi * 0.5, 1, "#06b6d4", "rgba(6, 182, 212, 0.4)", 20, "FULL STACK"),
    (210, 80, 0.75, math.pi * 1.1, 1, "#10b981", "rgba(16, 185, 129, 0.4)", 18, "AUTOMATION"),
    (310, 125, -0.65, math.pi * 1.6, 1, "#a855f7", "rgba(168, 85, 247, 0.4)", 19, "DATA ARCH"),
    (170, 65, -0.15, math.pi * 0.3, 1, "#eab308", "rgba(234, 179, 8, 0.4)", 15, "FIRMWARE"),
    (260, 100, 0.50, math.pi * 0.85, 1, "#3b82f6", "rgba(59, 130, 246, 0.4)", 17, "CLOUD OPS")
]

print(f"Generating {TOTAL_FRAMES} frames in {TMP_DIR}...")

for f in range(TOTAL_FRAMES):
    phase = (f / TOTAL_FRAMES) * 2 * math.pi
    
    # Calculate satellite 3D coordinates & depth sorting
    satellites = []
    for (rx, ry, tilt, base_ang, speed_mult, color, glow, r, label) in ORBITS:
        theta = base_ang + phase * speed_mult
        # Unrotated in plane
        px = rx * math.cos(theta)
        py = ry * math.sin(theta)
        # Depth z for layering
        z = math.sin(theta) # -1 back, +1 front
        
        # Tilt rotation
        rot_x = px * math.cos(tilt) - py * math.sin(tilt)
        rot_y = px * math.sin(tilt) + py * math.cos(tilt)
        
        screen_x = CX + rot_x
        screen_y = CY + rot_y
        
        # Scale & opacity by depth
        depth_scale = 0.75 + (z + 1) * 0.25 # 0.75 to 1.25
        depth_alpha = 0.45 + (z + 1) * 0.275 # 0.45 to 1.0
        
        satellites.append({
            "x": screen_x,
            "y": screen_y,
            "z": z,
            "radius": r * depth_scale,
            "alpha": depth_alpha,
            "color": color,
            "glow": glow,
            "label": label
        })
    
    # Sort by z-index (back to front)
    satellites_back = [s for s in satellites if s["z"] < 0]
    satellites_front = [s for s in satellites if s["z"] >= 0]
    
    # Central sphere rotation angle
    core_spin = phase
    core_r = 75
    
    # Build SVG content
    svg = []
    svg.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{HEIGHT}" viewBox="0 0 {WIDTH} {HEIGHT}">')
    svg.append('<defs>')
    
    # Background gradient
    svg.append('''
      <radialGradient id="bgGlow" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="60%" stop-color="#050814" />
        <stop offset="100%" stop-color="#02040a" />
      </radialGradient>
      
      <radialGradient id="coreGlow" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="25%" stop-color="#fdba74" />
        <stop offset="60%" stop-color="#ea580c" />
        <stop offset="90%" stop-color="#9a3412" />
        <stop offset="100%" stop-color="#431407" />
      </radialGradient>
    ''')
    
    # Gradients for each satellite
    for idx, s in enumerate(satellites):
        svg.append(f'''
          <radialGradient id="satGlow{idx}" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="40%" stop-color="{s['color']}" />
            <stop offset="100%" stop-color="#050814" />
          </radialGradient>
        ''')
    
    svg.append('</defs>')
    
    # Background
    svg.append(f'<rect width="{WIDTH}" height="{HEIGHT}" fill="url(#bgGlow)" />')
    
    # Subtle digital grid
    grid_spacing = 60
    svg.append('<g stroke="rgba(255, 255, 255, 0.03)" stroke-width="1">')
    for gx in range(0, WIDTH, grid_spacing):
        svg.append(f'<line x1="{gx}" y1="0" x2="{gx}" y2="{HEIGHT}" />')
    for gy in range(0, HEIGHT, grid_spacing):
        svg.append(f'<line x1="0" y1="{gy}" x2="{WIDTH}" y2="{gy}" />')
    svg.append('</g>')
    
    # Ambient outer orbital rings
    for rx, ry, tilt in [(240, 95, 0.28), (280, 110, -0.35), (310, 125, -0.65)]:
        svg.append(f'<ellipse cx="{CX}" cy="{CY}" rx="{rx}" ry="{ry}" fill="none" stroke="rgba(255, 255, 255, 0.06)" stroke-width="1.2" stroke-dasharray="4 6" transform="rotate({tilt * 180 / math.pi} {CX} {CY})" />')
    
    # Draw BACK Satellites and connections
    for s in satellites_back:
        # Connecting laser to center
        svg.append(f'<line x1="{CX}" y1="{CY}" x2="{s["x"]:.1f}" y2="{s["y"]:.1f}" stroke="{s["color"]}" stroke-width="1" stroke-opacity="{s["alpha"] * 0.25:.2f}" stroke-dasharray="2 3" />')
        # Outer glow
        svg.append(f'<circle cx="{s["x"]:.1f}" cy="{s["y"]:.1f}" r="{s["radius"] * 1.8:.1f}" fill="{s["color"]}" opacity="{s["alpha"] * 0.15:.2f}" />')
        # Sphere body
        svg.append(f'<circle cx="{s["x"]:.1f}" cy="{s["y"]:.1f}" r="{s["radius"]:.1f}" fill="{s["color"]}" opacity="{s["alpha"]:.2f}" />')

    # CENTRAL CORE SPHERE (High Tech 3D Explainer Core)
    # Ambient aura
    svg.append(f'<circle cx="{CX}" cy="{CY}" r="{core_r * 1.9:.1f}" fill="#f97316" opacity="0.12" />')
    svg.append(f'<circle cx="{CX}" cy="{CY}" r="{core_r * 1.4:.1f}" fill="#38bdf8" opacity="0.10" />')
    
    # Core Sphere
    svg.append(f'<circle cx="{CX}" cy="{CY}" r="{core_r}" fill="url(#coreGlow)" />')
    
    # Core 3D Wireframe Rings (Perspective rotation)
    for ring_i in range(3):
        r_angle = core_spin + (ring_i * math.pi / 3)
        rx_w = core_r * math.cos(r_angle)
        svg.append(f'<ellipse cx="{CX}" cy="{CY}" rx="{abs(rx_w):.1f}" ry="{core_r}" fill="none" stroke="rgba(255, 255, 255, 0.45)" stroke-width="1.2" />')
    
    # Equator ring
    svg.append(f'<ellipse cx="{CX}" cy="{CY}" rx="{core_r}" ry="{core_r * 0.35:.1f}" fill="none" stroke="rgba(255, 255, 255, 0.6)" stroke-width="1.5" />')
    
    # Core Inner Node & Text
    svg.append(f'<circle cx="{CX}" cy="{CY}" r="12" fill="#ffffff" opacity="0.9" />')
    svg.append(f'<circle cx="{CX}" cy="{CY}" r="6" fill="#f97316" />')

    # Draw FRONT Satellites and connections
    for idx, s in enumerate(satellites_front):
        # Laser connector
        svg.append(f'<line x1="{CX}" y1="{CY}" x2="{s["x"]:.1f}" y2="{s["y"]:.1f}" stroke="{s["color"]}" stroke-width="1.8" stroke-opacity="{s["alpha"] * 0.5:.2f}" />')
        # Glow
        svg.append(f'<circle cx="{s["x"]:.1f}" cy="{s["y"]:.1f}" r="{s["radius"] * 2.2:.1f}" fill="{s["color"]}" opacity="{s["alpha"] * 0.22:.2f}" />')
        # Sphere body with highlight gradient
        sat_idx = satellites.index(s)
        svg.append(f'<circle cx="{s["x"]:.1f}" cy="{s["y"]:.1f}" r="{s["radius"]:.1f}" fill="url(#satGlow{sat_idx})" opacity="{s["alpha"]:.2f}" />')
        # Orbiting micro particle
        part_ang = phase * 3 + idx
        px = s["x"] + math.cos(part_ang) * (s["radius"] + 8)
        py = s["y"] + math.sin(part_ang) * (s["radius"] + 8)
        svg.append(f'<circle cx="{px:.1f}" cy="{py:.1f}" r="2.5" fill="#ffffff" opacity="0.9" />')
        
        # Tech Label Tag
        svg.append(f'<rect x="{s["x"] - 38:.1f}" y="{s["y"] + s["radius"] + 6:.1f}" width="76" height="15" rx="4" fill="rgba(3, 7, 18, 0.75)" stroke="{s["color"]}" stroke-width="0.8" stroke-opacity="0.6" />')
        svg.append(f'<text x="{s["x"]:.1f}" y="{s["y"] + s["radius"] + 17:.1f}" font-family="monospace" font-size="8" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">{s["label"]}</text>')

    # HUD Corner Overlays
    svg.append(f'<text x="24" y="36" font-family="monospace" font-size="11" font-weight="bold" fill="#f97316" letter-spacing="1.5">● EXPLAINER SPHERES SYSTEM</text>')
    svg.append(f'<text x="24" y="52" font-family="monospace" font-size="9" fill="#94a3b8" letter-spacing="1">ENGR. IMRAN KHAN • S-ENGR ARCHITECTURE</text>')
    svg.append(f'<text x="{WIDTH - 24}" y="36" font-family="monospace" font-size="10" fill="#38bdf8" text-anchor="end" letter-spacing="1">FPS: 60 // 1080p CINEMATIC</text>')
    svg.append(f'<text x="{WIDTH - 24}" y="52" font-family="monospace" font-size="9" fill="#64748b" text-anchor="end" letter-spacing="1">STATUS: OPERATIONAL</text>')
    
    # Tech Corner brackets
    bracket_size = 18
    # Top-left
    svg.append(f'<path d="M 12 28 L 12 12 L 28 12" fill="none" stroke="#f97316" stroke-width="1.5" />')
    # Top-right
    svg.append(f'<path d="M {WIDTH - 28} 12 L {WIDTH - 12} 12 L {WIDTH - 12} 28" fill="none" stroke="#38bdf8" stroke-width="1.5" />')
    # Bottom-left
    svg.append(f'<path d="M 12 {HEIGHT - 28} L 12 {HEIGHT - 12} L 28 {HEIGHT - 12}" fill="none" stroke="#f97316" stroke-width="1.5" />')
    # Bottom-right
    svg.append(f'<path d="M {WIDTH - 28} {HEIGHT - 12} L {WIDTH - 12} {HEIGHT - 12} L {WIDTH - 12} {HEIGHT - 28}" fill="none" stroke="#38bdf8" stroke-width="1.5" />')

    svg.append('</svg>')
    
    frame_path = f"{TMP_DIR}/frame_{f:04d}.svg"
    with open(frame_path, "w") as out:
        out.write("".join(svg))

print(f"Generated {TOTAL_FRAMES} SVG frames. Converting to MP4 with ffmpeg...")

# Encode to MP4 with ffmpeg
cmd = [
    "ffmpeg", "-y",
    "-framerate", str(FPS),
    "-i", f"{TMP_DIR}/frame_%04d.svg",
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-preset", "fast",
    "-crf", "22",
    "-movflags", "+faststart",
    OUTPUT_FILE
]

subprocess.run(cmd, check=True)
print(f"Successfully generated {OUTPUT_FILE}")

# Copy to root public path as well
shutil.copy2(OUTPUT_FILE, ROOT_OUTPUT_FILE)
print(f"Copied to {ROOT_OUTPUT_FILE}")

# Clean up tmp frames
shutil.rmtree(TMP_DIR, ignore_errors=True)
print("Done!")

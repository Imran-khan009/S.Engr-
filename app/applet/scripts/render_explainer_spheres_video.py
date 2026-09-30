#!/usr/bin/env python3
import os
import math
import subprocess
import shutil

WIDTH = 1280
HEIGHT = 720
FPS = 30
TOTAL_FRAMES = 120 # 4.0 seconds seamless loop

TMP_DIR = "/tmp/spheres_render_frames"
OUTPUT_DIR = "/app/applet/public/assets/videos"
OUTPUT_FILE = f"{OUTPUT_DIR}/explainer_spheres__copy_.mp4"
ROOT_OUTPUT_FILE = "/app/applet/public/explainer_spheres__copy_.mp4"

os.makedirs(TMP_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 4 interconnected circles setup
# Horizontally distributed across center
SPHERES = [
    {
        "id": 1,
        "title": "Well-balanced",
        "sub": "",
        "base_x": 350,
        "y": HEIGHT / 2,
        "r": 135,
        "color": "#ffffff",
        "start_frame": 0,
        "duration": 30
    },
    {
        "id": 2,
        "title": "Professional",
        "sub": "stability",
        "base_x": 540,
        "y": HEIGHT / 2,
        "r": 135,
        "color": "#ffffff",
        "start_frame": 12,
        "duration": 30
    },
    {
        "id": 3,
        "title": "New Growth",
        "sub": "",
        "base_x": 730,
        "y": HEIGHT / 2,
        "r": 135,
        "color": "#ffffff",
        "start_frame": 24,
        "duration": 30
    },
    {
        "id": 4,
        "title": "Trustworthiness",
        "sub": "maturity",
        "base_x": 920,
        "y": HEIGHT / 2,
        "r": 135,
        "color": "#ffffff",
        "start_frame": 36,
        "duration": 30
    }
]

print(f"Rendering {TOTAL_FRAMES} frames for explainer spheres video...")

for f in range(TOTAL_FRAMES):
    time_sec = f / FPS
    phase = (f / TOTAL_FRAMES) * 2 * math.pi
    
    # Subtle breathing / floating motion
    float_y = math.sin(phase) * 6
    glow_pulse = 0.85 + math.sin(phase * 2) * 0.15
    
    svg = []
    svg.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{HEIGHT}" viewBox="0 0 {WIDTH} {HEIGHT}">')
    svg.append('<defs>')
    
    # Gradient matching user's exact uploaded video:
    # Deep navy blue (#0c2242) on left -> Slate steel blue (#657d9b) on right
    svg.append('''
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0a1d37" />
        <stop offset="45%" stop-color="#14345d" />
        <stop offset="80%" stop-color="#4c6785" />
        <stop offset="100%" stop-color="#738da8" />
      </linearGradient>
      
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="softHighlight" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="12" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    ''')
    
    svg.append('</defs>')
    
    # Background
    svg.append(f'<rect width="{WIDTH}" height="{HEIGHT}" fill="url(#bgGrad)" />')
    
    # Ambient background particles / stars
    for p_i in range(16):
        px = (p_i * 87 + f * 0.5) % WIDTH
        py = (p_i * 49 + math.sin(f * 0.05 + p_i) * 20) % HEIGHT
        p_alpha = 0.1 + math.sin(phase + p_i) * 0.08
        svg.append(f'<circle cx="{px:.1f}" cy="{py:.1f}" r="1.5" fill="#ffffff" opacity="{p_alpha:.2f}" />')

    # Draw spheres
    for s in SPHERES:
        cy = s["y"] + float_y + math.sin(phase + s["id"]) * 3
        cx = s["base_x"]
        cr = s["r"]
        
        # Calculate animation progress for circle draw
        if f < s["start_frame"]:
            draw_prog = 0.0
        elif f < s["start_frame"] + s["duration"]:
            t = (f - s["start_frame"]) / s["duration"]
            # Ease out quad
            draw_prog = 1 - (1 - t) * (1 - t)
        else:
            draw_prog = 1.0
            
        circumference = 2 * math.pi * cr
        dash_array = f"{circumference * draw_prog:.2f} {circumference:.2f}"
        
        # Circle stroke
        svg.append(f'''
          <circle
            cx="{cx:.1f}"
            cy="{cy:.1f}"
            r="{cr:.1f}"
            fill="none"
            stroke="{s["color"]}"
            stroke-width="1.8"
            stroke-dasharray="{dash_array}"
            stroke-linecap="round"
            transform="rotate(-90 {cx} {cy})"
            opacity="{0.95 * glow_pulse:.2f}"
            filter="url(#glow)"
          />
        ''')
        
        # Intersection soft glow center
        if draw_prog > 0.6:
            inner_alpha = (draw_prog - 0.6) * 2.5 * 0.06 * glow_pulse
            svg.append(f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{cr * 0.9:.1f}" fill="#ffffff" opacity="{inner_alpha:.3f}" />')
            
        # Text animation
        text_frame_start = s["start_frame"] + 15
        if f >= text_frame_start:
            text_t = min(1.0, (f - text_frame_start) / 15.0)
            text_alpha = text_t * 0.98
            text_y_offset = (1 - text_t) * 8
            
            # Typography
            font_size = "17"
            font_weight = "bold"
            font_family = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
            
            if s["sub"]:
                # Two line title
                svg.append(f'''
                  <text
                    x="{cx:.1f}"
                    y="{cy - 8 + text_y_offset:.1f}"
                    font-family="{font_family}"
                    font-size="{font_size}"
                    font-weight="{font_weight}"
                    fill="#ffffff"
                    text-anchor="middle"
                    opacity="{text_alpha:.2f}"
                    letter-spacing="0.3"
                  >{s["title"]}</text>
                  <text
                    x="{cx:.1f}"
                    y="{cy + 16 + text_y_offset:.1f}"
                    font-family="{font_family}"
                    font-size="{font_size}"
                    font-weight="{font_weight}"
                    fill="#ffffff"
                    text-anchor="middle"
                    opacity="{text_alpha:.2f}"
                    letter-spacing="0.3"
                  >{s["sub"]}</text>
                ''')
            else:
                # Single line title
                svg.append(f'''
                  <text
                    x="{cx:.1f}"
                    y="{cy + 6 + text_y_offset:.1f}"
                    font-family="{font_family}"
                    font-size="{font_size}"
                    font-weight="{font_weight}"
                    fill="#ffffff"
                    text-anchor="middle"
                    opacity="{text_alpha:.2f}"
                    letter-spacing="0.3"
                  >{s["title"]}</text>
                ''')

    # Subtle modern branding watermark in top/bottom corners
    svg.append(f'<text x="40" y="50" font-family="monospace" font-size="11" font-weight="bold" fill="rgba(255,255,255,0.7)" letter-spacing="1">● S • ENGR ARCHITECTURE</text>')
    svg.append(f'<text x="40" y="68" font-family="monospace" font-size="9" fill="rgba(255,255,255,0.4)" letter-spacing="0.5">STRATEGIC COMPETENCY MODEL</text>')
    
    svg.append(f'<text x="{WIDTH - 40}" y="50" font-family="monospace" font-size="10" font-weight="bold" fill="rgba(255,255,255,0.7)" text-anchor="end" letter-spacing="0.5">EXPLAINER SPHERES</text>')
    svg.append(f'<text x="{WIDTH - 40}" y="68" font-family="monospace" font-size="9" fill="rgba(255,255,255,0.4)" text-anchor="end" letter-spacing="0.5">HIGH DEFINITION LOOP</text>')

    svg.append('</svg>')
    
    frame_path = f"{TMP_DIR}/frame_{f:04d}.svg"
    with open(frame_path, "w") as out:
        out.write("".join(svg))

print(f"Rendered {TOTAL_FRAMES} SVG frames. Encoding to MP4 with ffmpeg (H.264 / yuv420p)...")

cmd = [
    "ffmpeg", "-y",
    "-framerate", str(FPS),
    "-i", f"{TMP_DIR}/frame_%04d.svg",
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-preset", "medium",
    "-crf", "20",
    "-movflags", "+faststart",
    OUTPUT_FILE
]

subprocess.run(cmd, check=True)
print(f"Generated {OUTPUT_FILE}")

# Copy to root public path as well
shutil.copy2(OUTPUT_FILE, ROOT_OUTPUT_FILE)
print(f"Copied to {ROOT_OUTPUT_FILE}")

# Clean up
shutil.rmtree(TMP_DIR, ignore_errors=True)
print("Complete!")

import React, { useState } from 'react';
import { Cpu, Droplets, Gauge, Wifi, Zap, Activity } from 'lucide-react';

interface DiagramProps {
  type: 'iot-irrigation' | 'iot-tank' | 'web-noorbal' | 'creative-flow' | 'video-timeline' | 'construction-cad';
}

export const TechnicalDiagram: React.FC<DiagramProps> = ({ type }) => {
  const [interactiveParam, setInteractiveParam] = useState<number>(45);

  if (type === 'iot-irrigation') {
    const isPumpActive = interactiveParam < 40;
    return (
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
        <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Cpu className="w-4 h-4" />
            <span className="font-bold">SMART IRRIGATION SYSTEM • CIRCUIT TELEMETRY</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700">
            ARDUINO UNO + ANALOG PROBE + 5V RELAY
          </span>
        </div>

        {/* Interactive slider to test soil moisture and relay trigger */}
        <div className="mb-4 bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-[11px] text-slate-400">
            Simulate Soil Moisture Sensor Reading:
          </span>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              min="10"
              max="90"
              value={interactiveParam}
              onChange={(e) => setInteractiveParam(Number(e.target.value))}
              className="accent-cyan-400 cursor-pointer h-1.5 w-32"
            />
            <span className="font-bold text-cyan-300 w-10 text-right">{interactiveParam}%</span>
          </div>
        </div>

        {/* SVG Animated Diagram */}
        <div className="relative w-full h-44 bg-slate-900/90 rounded-lg border border-slate-800 overflow-hidden flex items-center justify-around px-4">
          {/* Soil Probe */}
          <div className="flex flex-col items-center">
            <div className={`w-14 h-16 rounded-lg border flex flex-col items-center justify-center p-1 transition-colors ${
              interactiveParam < 40 ? 'border-amber-500/60 bg-amber-950/20 text-amber-300' : 'border-emerald-500/60 bg-emerald-950/20 text-emerald-300'
            }`}>
              <Droplets className="w-5 h-5 mb-1" />
              <span className="text-[9px] font-bold">SOIL PROBE</span>
              <span className="text-[8px] opacity-80">{interactiveParam}% ADC</span>
            </div>
            <span className="text-[9px] text-slate-500 mt-1">Analog In (A0)</span>
          </div>

          {/* Wire flow */}
          <div className="h-0.5 w-12 bg-cyan-500/40 relative">
            <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>

          {/* Microcontroller */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-xl bg-slate-800 border-2 border-cyan-500/70 flex flex-col items-center justify-center p-2 text-center shadow-lg shadow-cyan-950/40">
              <Cpu className="w-5 h-5 text-cyan-400 mb-1" />
              <span className="text-[9px] font-bold text-white">ARDUINO UNO</span>
              <span className="text-[8px] text-cyan-300">ATMega328P</span>
            </div>
            <span className="text-[9px] text-slate-400 mt-1">Logic Controller</span>
          </div>

          {/* Wire flow */}
          <div className={`h-0.5 w-12 relative transition-colors ${isPumpActive ? 'bg-amber-400' : 'bg-slate-700'}`}>
            {isPumpActive && <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
          </div>

          {/* Relay */}
          <div className="flex flex-col items-center">
            <div className={`w-14 h-16 rounded-lg border flex flex-col items-center justify-center p-1 transition-colors ${
              isPumpActive ? 'border-amber-500 bg-amber-500/20 text-amber-300' : 'border-slate-700 bg-slate-800/80 text-slate-400'
            }`}>
              <Zap className="w-5 h-5 mb-1" />
              <span className="text-[9px] font-bold">5V RELAY</span>
              <span className="text-[8px]">{isPumpActive ? 'CLOSED (ON)' : 'OPEN (OFF)'}</span>
            </div>
            <span className="text-[9px] text-slate-500 mt-1">Pin D8</span>
          </div>

          {/* Wire flow */}
          <div className={`h-0.5 w-12 relative transition-colors ${isPumpActive ? 'bg-emerald-400' : 'bg-slate-700'}`} />

          {/* Submersible DC Pump */}
          <div className="flex flex-col items-center">
            <div className={`w-16 h-16 rounded-xl border flex flex-col items-center justify-center p-1 transition-colors ${
              isPumpActive ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 animate-pulse' : 'border-slate-700 bg-slate-800/80 text-slate-500'
            }`}>
              <Activity className="w-5 h-5 mb-1" />
              <span className="text-[9px] font-bold">DC PUMP</span>
              <span className="text-[8px]">{isPumpActive ? 'PUMPING WATER' : 'IDLE'}</span>
            </div>
            <span className="text-[9px] text-slate-500 mt-1">12V Solenoid/Motor</span>
          </div>
        </div>

        <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Threshold: &lt; 40% triggers automated irrigation.</span>
          <span className="text-cyan-400 font-semibold">State: {isPumpActive ? 'ACTIVE (IRRIGATING)' : 'MOISTURE SUFFICIENT'}</span>
        </div>
      </div>
    );
  }

  if (type === 'iot-tank') {
    const isOverflow = interactiveParam > 85;
    const isDryRun = interactiveParam < 20;
    return (
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
        <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Gauge className="w-4 h-4" />
            <span className="font-bold">SMART WATER TANK MONITORING • TELEMETRY</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700">
            ESP32 + HC-SR04 + I2C LCD + BLYNK CLOUD
          </span>
        </div>

        {/* Interactive tank level slider */}
        <div className="mb-4 bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-[11px] text-slate-400">
            Simulate Water Level (% of Depth):
          </span>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              min="5"
              max="100"
              value={interactiveParam}
              onChange={(e) => setInteractiveParam(Number(e.target.value))}
              className="accent-cyan-400 cursor-pointer h-1.5 w-32"
            />
            <span className="font-bold text-cyan-300 w-10 text-right">{interactiveParam}%</span>
          </div>
        </div>

        {/* Visual Schematic */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-900/90 p-4 rounded-lg border border-slate-800">
          {/* Simulated Tank graphic */}
          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-950 border border-slate-800 relative">
            <span className="text-[9px] font-bold text-slate-400 mb-2">WATER TANK</span>
            <div className="w-16 h-24 border-2 border-slate-600 rounded-b-xl relative overflow-hidden bg-slate-900">
              <div
                className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
                  isOverflow ? 'bg-rose-500/80' : isDryRun ? 'bg-amber-500/80' : 'bg-cyan-500/70'
                }`}
                style={{ height: `${interactiveParam}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-cyan-300 mt-2">{interactiveParam}% Full</span>
          </div>

          {/* Sensor & Controller */}
          <div className="flex flex-col justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div>
              <span className="text-[9px] font-bold text-slate-400 block mb-1">HC-SR04 ULTRASONIC</span>
              <p className="text-[10px] text-slate-300">
                Echo/Trig time-of-flight calc: <span className="text-cyan-400 font-bold">{Math.round((100 - interactiveParam) * 1.5)} cm</span>
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-800">
              <span className="text-[9px] font-bold text-cyan-400 block">ESP32 Dev Module</span>
              <span className="text-[9px] text-slate-400">Dual-core 240MHz + WiFi</span>
            </div>
          </div>

          {/* I2C 1602 LCD Readout */}
          <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-800/60 font-mono flex flex-col justify-center">
            <span className="text-[9px] text-blue-400 font-bold mb-1">I2C 1602 LCD SCREEN</span>
            <div className="p-2 rounded bg-blue-900/50 border border-blue-700/50 text-[10px] text-cyan-200">
              <div>TANK LEVEL: {interactiveParam}%</div>
              <div>STATUS: {isOverflow ? 'ALERT: OVERFLOW' : isDryRun ? 'ALERT: DRY RUN' : 'NORMAL RANGE'}</div>
            </div>
          </div>

          {/* IoT Cloud Telemetry */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center space-x-1.5 text-cyan-400">
              <Wifi className="w-4 h-4 animate-pulse" />
              <span className="text-[10px] font-bold">BLYNK IOT CLOUD</span>
            </div>
            <div className="text-[10px] text-slate-300 space-y-1 my-1">
              <div>Buzzer: <strong className={isOverflow || isDryRun ? 'text-rose-400' : 'text-slate-400'}>{isOverflow || isDryRun ? 'SOUNDING' : 'OFF'}</strong></div>
              <div>Telemetry: <strong className="text-emerald-400">SYNCED (WiFi)</strong></div>
            </div>
            <span className="text-[9px] text-slate-500">Live App Stream</span>
          </div>
        </div>
      </div>
    );
  }

  // Generic schematic diagram for design & CAD
  return (
    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
      <div className="flex items-center justify-between mb-2">
        <span className="text-cyan-400 font-bold">ENGINEERING WORKFLOW DIAGRAM</span>
        <span className="text-[10px] text-slate-500">SYSTEM ARCHITECTURE</span>
      </div>
      <div className="p-3 rounded-lg bg-slate-900 flex items-center justify-around text-center text-[10px]">
        <div className="p-2 rounded bg-slate-800 border border-slate-700">SPECIFICATION</div>
        <span className="text-cyan-400">→</span>
        <div className="p-2 rounded bg-slate-800 border border-slate-700">CAD / CODE</div>
        <span className="text-cyan-400">→</span>
        <div className="p-2 rounded bg-slate-800 border border-slate-700">FIELD QA</div>
        <span className="text-cyan-400">→</span>
        <div className="p-2 rounded bg-cyan-950 text-cyan-300 border border-cyan-700 font-bold">DEPLOYED</div>
      </div>
    </div>
  );
};

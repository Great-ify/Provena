/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

export interface TimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  colorClass: string;
}

interface OwnershipTimelineProps {
  events?: TimelineEvent[];
  mintedTimestamp?: string;
}

export default function OwnershipTimeline({
  events,
  mintedTimestamp = new Date().toISOString()
}: OwnershipTimelineProps) {
  // Setup a default timeline array if none provided
  const baseTime = new Date(mintedTimestamp);
  const formatOffsetTime = (minutesOffset: number) => {
    const t = new Date(baseTime.getTime() + minutesOffset * 60 * 1000);
    return t.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const defaultEvents: TimelineEvent[] = [
    {
      id: 'step-1',
      title: 'Seal Created',
      timestamp: formatOffsetTime(-6),
      description: 'Client-side hash indexes generated with unique sha-256 identifier.',
      status: 'completed',
      colorClass: 'rgba(199, 255, 77, 0.8)'
    },
    {
      id: 'step-2',
      title: 'Stored on Walrus',
      timestamp: formatOffsetTime(-5),
      description: 'Redundant erasure fragments dispatched to decentralized nodes.',
      status: 'completed',
      colorClass: 'rgba(20, 241, 217, 0.8)'
    },
    {
      id: 'step-3',
      title: 'Anchored on Sui',
      timestamp: formatOffsetTime(-1),
      description: 'Sui on-chain attestation anchoring verified via blockchain transactions.',
      status: 'completed',
      colorClass: 'rgba(124, 238, 255, 0.8)'
    },
    {
      id: 'step-4',
      title: 'Certificate Minted',
      timestamp: formatOffsetTime(0),
      description: 'Collectible authenticity capsules and cryptographic deeds created.',
      status: 'completed',
      colorClass: 'rgba(199, 255, 77, 0.8)'
    }
  ];

  const renderEvents = events || defaultEvents;

  return (
    <div 
      className="rounded-3xl p-6 md:p-8 select-none flex flex-col justify-between h-full text-left font-manrope transition-all duration-300"
      style={{
        background: "rgba(12, 16, 22, 0.85)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(199, 255, 77, 0.12)",
        boxShadow: "0 0 30px rgba(199,255,77,0.03)"
      }}
      id="ownership-timeline-component"
    >
      <div>
        <div className="border-b border-[#1C1F26] pb-4 mb-6">
          <h3 className="text-xs font-mono text-[#98A2B3] uppercase font-bold tracking-[0.15em] leading-none">
            Ownership Timeline
          </h3>
        </div>

        {/* Vertical timeline steps and segment lines */}
        <div className="relative pl-7 space-y-7 text-left py-1">
          
          {/* Glowing vertical connector strip line */}
          <div className="absolute top-4 bottom-4 left-[3px] w-[1px] bg-gradient-to-b from-[#C7FF4D]/60 via-[#14F1D9]/60 to-[#7CEEFF]/30" />

          {renderEvents.map((event, idx) => {
            return (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative group text-left"
                id={`timeline-node-${event.id}`}
              >
                {/* Visual Circle Bullet - Styled precisely to 10px x 10px with specific box-shadow glow */}
                <span 
                  className="absolute -left-7 top-[5px] rounded-full transition-transform duration-300 group-hover:scale-125"
                  style={{ 
                    width: '10px',
                    height: '10px',
                    backgroundColor: event.colorClass === '#C7FF4D' ? '#C7FF4D' : event.colorClass,
                    boxShadow: '0 0 10px rgba(199, 255, 77, 0.6)',
                  }}
                />

                {/* Event Label & details */}
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-[13px] font-medium text-[#F5F7FA]">
                      {event.title}
                    </h4>
                    <span className="text-[11px] text-[#98A2B3] font-mono tracking-tight shrink-0">
                      {event.timestamp}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#98A2B3]/75 font-sans leading-relaxed pt-0.5">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-[#1C1F26]/40 flex items-center gap-2 text-[10px] font-mono text-[#555E6B] uppercase tracking-wider font-bold">
        <Clock className="w-3.5 h-3.5 text-[#C7FF4D]/75 shrink-0" />
        <span className="truncate">Attestation secured on sui blockchain</span>
      </div>
    </div>
  );
}

'use client';
import React from 'react';
import { Play } from 'lucide-react';
import { VideoItem } from './types';

interface VideoCardProps {
  video: VideoItem;
}

// Helper to extract YouTube ID and get thumbnail
const getThumbnail = (url: string, fallback: string | null) => {
  if (fallback) return fallback;
  
  try {
    let videoId = '';
    if (url.includes('youtu.be')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    }
    
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  } catch (e) {
    console.error("Error parsing YouTube URL", e);
  }
  
  return 'https://placehold.co/400x300?text=No+Thumbnail';
};

const VideoCard = ({ video }: VideoCardProps) => {
  const thumbnail = getThumbnail(video.youtube_url, video.thumbnail_url);

  const handlePlay = () => {
    // Open YouTube link in new tab
    window.open(video.youtube_url, '_blank');
  };

  return (
    <div 
      onClick={handlePlay}
      className="shrink-0 flex flex-col gap-3 group cursor-pointer snap-center"
      style={{ width: '306px' }}
    >
      {/* Thumbnail Container */}
      <div 
        className="relative w-full rounded-[12px] overflow-hidden border border-[#F3F3F5] bg-gray-100 shadow-sm"
        style={{ height: '190px', borderWidth: '1px' }}
      >
        <img 
          src={thumbnail} 
          alt={video.video_title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-12 h-8 bg-red-600 rounded-[8px] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play size={16} fill="white" className="text-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-900 text-base pl-1 group-hover:text-[#013220] transition-colors truncate" title={video.video_title}>
        {video.video_title}
      </h3>
    </div>
  );
};

export default VideoCard;
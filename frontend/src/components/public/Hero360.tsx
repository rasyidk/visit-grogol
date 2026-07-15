'use client';

import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import '@photo-sphere-viewer/core/index.css';

export default function Hero360() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <ReactPhotoSphereViewer 
        src="/360.jpg" 
        height="100vh" 
        width="100%"
        navbar={[
          'zoom',
          'move',
          'fullscreen',
        ]}
        defaultZoomLvl={0}
      />
    </div>
  );
}

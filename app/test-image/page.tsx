export default function TestImage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-8">
        <h1 className="text-2xl font-bold">Image Test Page</h1>
        
        <div className="space-y-4">
          <h2 className="text-lg">Regular img tag:</h2>
          <img 
            src="/images/photo.jpg" 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover mx-auto"
            onLoad={() => console.log('Regular img loaded')}
            onError={() => console.log('Regular img failed')}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg">Next.js Image component:</h2>
          <div className="w-32 h-32 relative mx-auto">
            <img 
              src="/images/photo.jpg" 
              alt="Profile Next" 
              className="w-full h-full rounded-full object-cover"
              onLoad={() => console.log('Next Image loaded')}
              onError={() => console.log('Next Image failed')}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg">Default avatar (fallback):</h2>
          <img 
            src="/images/default-avatar.svg" 
            alt="Default" 
            className="w-32 h-32 rounded-full object-cover mx-auto"
            onLoad={() => console.log('Default avatar loaded')}
            onError={() => console.log('Default avatar failed')}
          />
        </div>
      </div>
    </div>
  );
}
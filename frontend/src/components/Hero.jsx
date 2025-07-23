import { ArrowRight, Zap } from 'lucide-react'
import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import Particles from '@/pages/Particles'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()
  return (
    <div className="relative w-full h-[800px] bg-black overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Foreground content */}
      <section className=" w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="secondary" className="mb-4">
                <Zap className="w-3 h-3 mr-1" />
                New: AI-powered note organization
              </Badge>
              <h1 className="text-gray-200 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Your thoughts, organized and accessible
                <span className="text-gray-200"> everywhere</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Capture ideas, organize thoughts, and collaborate seamlessly. The modern note-taking app that grows
                with you and keeps your ideas secure in the cloud.
              </p>
            </div>
            <div className="space-x-4">
              <Button onClick={()=>navigate('/create-todo')} size="lg" className="h-12 px-8 relative">
                Start Taking Notes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 bg-white">
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Free forever • No credit card required • 2 minutes setup
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;


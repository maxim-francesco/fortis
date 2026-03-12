import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-primary">
              Hello World
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-body max-w-xs mx-auto">
              A minimalist message for a complex world.
            </p>
          </div>
          
          <div className="w-16 h-1 bg-accent rounded-full opacity-50" />
          
          <footer className="pt-8 opacity-40 hover:opacity-100 transition-opacity duration-500">
            <p className="text-sm font-body tracking-widest uppercase">
              Text Echo
            </p>
          </footer>
        </div>
      </div>
      
      {/* Decorative accent element */}
      <div className="fixed top-0 right-0 p-8">
        <div className="w-4 h-4 rounded-full bg-accent animate-pulse" />
      </div>
    </main>
  );
}
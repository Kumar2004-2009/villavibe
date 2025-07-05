import { SkeltonCard } from "../components/SkeletonCard";

export default function MyHomeLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
    <section className="container mx-auto px-4 sm:px-6 py-12">
      <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Your Home</h2>


      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
        <SkeltonCard/>
        <SkeltonCard/>
        <SkeltonCard/>
        <SkeltonCard/>
        <SkeltonCard/>
        <SkeltonCard/>
        <SkeltonCard/>
        <SkeltonCard/>
        <SkeltonCard/>
        <SkeltonCard/>
        <SkeltonCard/>
      </div>
      </div>
    </section>
    </div>
  );
}

import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <div className="bg-blue-600 text-white py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of users building amazing things
        </p>
        <Button
          size="lg"
          className="bg-white text-blue-600 hover:bg-gray-100"
        >
          Start Building Now
        </Button>
      </div>
    </div>
  );
};
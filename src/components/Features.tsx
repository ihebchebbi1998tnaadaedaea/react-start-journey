import { Code2, Palette, Zap } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-10 h-10 text-blue-600" />,
    title: "Lightning Fast",
    description: "Built with performance in mind for the best user experience",
  },
  {
    icon: <Palette className="w-10 h-10 text-blue-600" />,
    title: "Beautiful Design",
    description: "Clean and modern interface that looks great on any device",
  },
  {
    icon: <Code2 className="w-10 h-10 text-blue-600" />,
    title: "Developer Friendly",
    description: "Built with modern technologies that developers love",
  },
];

export const Features = () => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Amazing Features</h2>
          <p className="text-xl text-gray-600">
            Everything you need to build something great
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
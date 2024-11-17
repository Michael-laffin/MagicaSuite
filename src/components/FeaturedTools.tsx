import React from 'react';
import { Link } from 'react-router-dom';
import { useFeaturedTools } from '../hooks/useFeaturedTools';
import {
  Clock,
  Megaphone,
  Briefcase,
  Palette,
  BarChart,
  Code,
  Star,
  Users,
  CheckCircle
} from 'lucide-react';

const categoryIcons = {
  Clock,
  Megaphone,
  Briefcase,
  Palette,
  BarChart,
  Code
};

export default function FeaturedTools() {
  const featuredTools = useFeaturedTools();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredTools.map((tool) => {
        const Icon = categoryIcons[tool.icon];
        return (
          <Link
            key={tool.name}
            to={`/dashboard/${tool.category.toLowerCase()}`}
            className="group"
          >
            <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${tool.bgColor} p-6 transition-transform duration-300 group-hover:scale-[1.02]`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
              </div>
              
              {/* Content */}
              <div className="relative">
                <div className="flex items-center justify-between">
                  <Icon className="h-8 w-8 text-white/90" />
                  <span className="text-sm font-medium text-white/80">
                    {tool.category}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-semibold text-white">
                  {tool.name}
                </h3>
                <p className="mt-2 text-sm text-white/80">
                  {tool.description}
                </p>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {Object.entries(tool.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-semibold text-white">
                        {value}
                      </div>
                      <div className="text-xs text-white/70 capitalize">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className="mt-4 flex items-center justify-end">
                  <span className="text-sm font-medium text-white/90 group-hover:underline">
                    Try it now →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
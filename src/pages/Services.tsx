import Layout from "@/components/Layout";
import { Users, Globe, Shield, Zap } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "User Profiles",
    description: "Access random user profiles with detailed information including photos, names, and contact details.",
  },
  {
    icon: Globe,
    title: "Global Data",
    description: "Get user data from various countries and nationalities around the world.",
  },
  {
    icon: Shield,
    title: "Secure API",
    description: "Our API calls are secure and reliable, ensuring your data is always protected.",
  },
  {
    icon: Zap,
    title: "Fast Loading",
    description: "Lightning-fast data fetching with optimized caching for the best user experience.",
  },
];

const Services = () => {
  return (
    <Layout>
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground text-center mb-8">
            Our Services
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-card rounded-lg border border-border p-6"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;

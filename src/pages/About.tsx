import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground text-center mb-8">
            About Us
          </h1>
          <div className="bg-card rounded-lg border border-border p-8">
            <p className="text-muted-foreground mb-4">
              Welcome to UserAPI! This application demonstrates how to fetch and display data from the RandomUser.me API using React.
            </p>
            <p className="text-muted-foreground mb-4">
              Our platform showcases:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>User profile images</li>
              <li>Full names (first + last)</li>
              <li>Email addresses</li>
              <li>Location information (city and country)</li>
            </ul>
            <p className="text-muted-foreground">
              Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

import { Users } from "lucide-react";

const Header = () => {
  return (
    <header className="text-center mb-12 animate-fade-in">
      <div className="inline-flex items-center justify-center gap-3 mb-4">
        <div className="p-3 rounded-xl bg-primary/10">
          <Users className="h-8 w-8 text-primary" />
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
        Random User Profiles
      </h1>
      <p className="text-muted-foreground text-lg max-w-md mx-auto">
        Discover random people from around the world using the RandomUser API
      </p>
    </header>
  );
};

export default Header;

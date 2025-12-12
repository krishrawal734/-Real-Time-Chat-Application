const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground text-sm">
        <p>
          Powered by{" "}
          <a href="https://randomuser.me/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            RandomUser.me API
          </a>
        </p>
        <p className="mt-1">© 2024 UserAPI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

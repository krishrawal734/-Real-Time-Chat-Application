const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center text-muted-foreground text-sm">
          <p>
            Powered by{" "}
            <a
              href="https://randomuser.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              RandomUser.me API
            </a>
          </p>
          <p className="mt-1">© 2024 UserAPI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

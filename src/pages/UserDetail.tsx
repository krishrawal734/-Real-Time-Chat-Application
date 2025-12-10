import { useLocation, useNavigate } from "react-router-dom";
import { RandomUser } from "@/types/user";
import { Mail, MapPin, Phone, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const UserDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user as RandomUser | undefined;

  if (!user) {
    return (
      <Layout>
        <div className="py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-destructive mb-4">User not found</p>
            <Button onClick={() => navigate("/")} variant="outline">
              Back to Users
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi ${user.name.first}, I found your profile and would like to connect!`
    );
    const phoneNumber = user.cell.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <Layout>
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6 gap-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {/* User Card */}
          <div className="bg-card rounded-lg border border-border p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* User Image */}
              <div className="flex items-center justify-center bg-muted/30 rounded-lg p-8">
                <img
                  src={user.picture.large}
                  alt={`${user.name.first} ${user.name.last}`}
                  className="h-48 w-48 rounded-full object-cover"
                />
              </div>

              {/* User Info */}
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {user.name.first} {user.name.last}
                </h1>

                {/* Email */}
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>{user.email}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>
                    {user.location.city}, {user.location.country}
                  </span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>{user.phone}</span>
                </div>

                {/* Additional Info */}
                <div className="mb-6 text-sm text-muted-foreground space-y-1">
                  <p>Age: <span className="text-foreground">{user.dob.age}</span></p>
                  <p>Gender: <span className="text-foreground capitalize">{user.gender}</span></p>
                  <p>Nationality: <span className="text-foreground">{user.nat}</span></p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <Button size="lg" className="flex-1">
                    Contact Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 gap-2 bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700"
                    onClick={handleWhatsApp}
                  >
                    <MessageCircle className="h-5 w-5" />
                    Order on WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDetail;

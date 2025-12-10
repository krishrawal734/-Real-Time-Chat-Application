import { RandomUser } from "@/types/user";
import { Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface UserCardProps {
  user: RandomUser;
  index: number;
}

const UserCard = ({ user, index }: UserCardProps) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4 flex flex-col h-full">
      {/* User Image */}
      <div className="h-40 flex items-center justify-center mb-4">
        <img
          src={user.picture.large}
          alt={`${user.name.first} ${user.name.last}`}
          className="h-32 w-32 rounded-full object-cover"
        />
      </div>

      {/* User Name */}
      <h3 className="font-semibold text-foreground text-base mb-2 text-center">
        {user.name.first} {user.name.last}
      </h3>

      {/* Email */}
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <Mail className="h-4 w-4 text-primary flex-shrink-0" />
        <span className="text-sm truncate">{user.email}</span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-muted-foreground mb-4 flex-grow">
        <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
        <span className="text-sm">
          {user.location.city}, {user.location.country}
        </span>
      </div>

      {/* View Button */}
      <div className="flex justify-end mt-auto">
        <Link to={`/user/${user.login.uuid}`} state={{ user }}>
          <Button size="sm" className="px-6">
            View
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;

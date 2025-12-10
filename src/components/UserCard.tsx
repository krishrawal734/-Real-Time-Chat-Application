import { RandomUser } from "@/types/user";
import { Mail, MapPin } from "lucide-react";

interface UserCardProps {
  user: RandomUser;
  index: number;
}

const UserCard = ({ user, index }: UserCardProps) => {
  return (
    <div
      className="group relative card-gradient card-shadow rounded-2xl p-6 transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1 animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Profile Image */}
      <div className="relative mx-auto mb-5 h-28 w-28">
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-bounce-soft" />
        <img
          src={user.picture.large}
          alt={`${user.name.first} ${user.name.last}`}
          className="relative h-28 w-28 rounded-full object-cover ring-4 ring-background shadow-lg transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* User Info */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-1">
          {user.name.first} {user.name.last}
        </h3>

        {/* Email */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground mt-3">
          <Mail className="h-4 w-4 text-primary" />
          <span className="text-sm truncate max-w-[200px]">{user.email}</span>
        </div>

        {/* Location */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground mt-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm">
            {user.location.city}, {user.location.country}
          </span>
        </div>
      </div>

      {/* Decorative gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
    </div>
  );
};

export default UserCard;

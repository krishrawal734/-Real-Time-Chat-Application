import { Check, X } from "lucide-react";

interface PasswordChecklistProps {
  password: string;
}

export default function PasswordChecklist({ password }: PasswordChecklistProps) {
  const checks = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Contains uppercase", valid: /[A-Z]/.test(password) },
    { label: "Contains lowercase", valid: /[a-z]/.test(password) },
    { label: "Contains number", valid: /\d/.test(password) },
  ];

  return (
    <div className="mb-4 space-y-1">
      {checks.map((check, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          {check.valid ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <X className="w-4 h-4 text-red-400" />
          )}
          <span className={check.valid ? "text-green-600" : "text-muted-foreground"}>
            {check.label}
          </span>
        </div>
      ))}
    </div>
  );
}

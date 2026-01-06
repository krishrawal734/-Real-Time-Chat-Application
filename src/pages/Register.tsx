import { useState, ChangeEvent, FormEvent } from "react";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCity } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import PasswordChecklist from "@/components/PasswordChecklist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormState {
  name: string;
  email: string;
  phone: string;
  gender: string;
  city: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  city: "",
  password: "",
  confirmPassword: "",
  agree: false,
};

export default function Register() {
  const [form, setForm] = useState<FormState>(initialForm);
  const { toast } = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleReset = () => {
    setForm(initialForm);
    toast({ title: "Form Reset! 🔄" });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.gender || !form.city) {
      return toast({ title: "Please fill all fields!", variant: "destructive" });
    }
    if (form.password.length < 8) {
      return toast({ title: "Password must be at least 8 characters!", variant: "destructive" });
    }
    if (form.password !== form.confirmPassword) {
      return toast({ title: "Passwords do not match!", variant: "destructive" });
    }
    if (!form.agree) {
      return toast({ title: "You must agree to Terms!", variant: "destructive" });
    }

    toast({ title: "Registration Successful! 🎉" });
    setForm(initialForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl w-full max-w-md p-8 border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Create Account
        </h2>

        {/* Full Name */}
        <div className="relative mb-4">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="pl-10"
          />
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="pl-10"
          />
        </div>

        {/* Phone */}
        <div className="relative mb-4">
          <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
          <Input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="pl-10"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <Select value={form.gender} onValueChange={(value) => setForm({ ...form, gender: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div className="relative mb-4">
          <FaCity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
          <Input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="pl-10"
          />
        </div>

        {/* Password */}
        <div className="relative mb-2">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="pl-10"
          />
        </div>

        <PasswordChecklist password={form.password} />

        {/* Confirm Password */}
        <div className="relative mb-4">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
          <Input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="pl-10"
          />
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2 mt-4">
          <Checkbox
            id="agree"
            checked={form.agree}
            onCheckedChange={(checked) => setForm({ ...form, agree: checked as boolean })}
          />
          <label htmlFor="agree" className="text-sm text-gray-600 cursor-pointer">
            I agree to the Terms & Privacy Policy
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <Button type="button" variant="outline" onClick={handleReset} className="flex-1">
            Reset
          </Button>
          <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

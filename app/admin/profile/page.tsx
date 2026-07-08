import ProfileForm from "@/components/admin/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          My Profile
        </h1>

        <p className="mt-2 text-gray-500">
          View your account information.
        </p>
      </div>

      <ProfileForm />
    </div>
  );
}
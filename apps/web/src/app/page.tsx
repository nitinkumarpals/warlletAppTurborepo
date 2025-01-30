"use client";
import { useUserSession } from "@/context/UserSessionContext";

export default function Home() {
  const { user, loading } = useUserSession();
  return (
    <div>
      <div className="text-3xl flex h-screen w-screen items-center justify-center dark:bg-black dark:text-white">
        {loading ? (
          <h1>Loading...</h1>
        ) : user ? (
          <h1>Welcome, {user.name}!</h1>
        ) : (
          <h1>Please log in</h1>
        )}
      </div>
    </div>
  );
}

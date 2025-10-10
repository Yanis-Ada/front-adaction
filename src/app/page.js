"use client";
import Header from "./header";

export default function Home() {
  return (
    <div>
      <Header />
      <Login />
    </div>
  );
}

function Login() {
  return (
 <div className="bg-gray-50 flex justify-center py-10">
      <div className="bg-white rounded-2xl shadow p-5 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
        <form className="space-y-4">
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          </form>
      </div>
    </div>
  );
}
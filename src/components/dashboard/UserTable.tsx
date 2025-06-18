'use client';

export interface User {
  id: string;
  username: string;
  role: string;
  email: string;
  phone: string;
}

export default function UserTable({ users }: { users: User[] }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white">
      <table className="w-full text-left table-auto">
        <thead className="uppercase bg-indigo-600 text-white">
          <tr>
            <th className="py-3 px-4 border-b text-center">User ID</th>
            <th className="py-3 px-4 border-b text-center">Username</th>
            <th className="py-3 px-4 border-b text-center">Role</th>
            <th className="py-3 px-4 border-b text-center">Email</th>
            <th className="py-3 px-4 border-b text-center">Phone</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-indigo-50 transition">
                <td className="py-2 px-4 text-center">{user.id}</td>
                <td className="py-2 px-4 text-center">{user.username}</td>
                <td className="py-2 px-4 text-center capitalize">{user.role}</td>
                <td className="py-2 px-4 text-center">{user.email}</td>
                <td className="py-2 px-4 text-center">{user.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-400">
                No se encontraron usuarios
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
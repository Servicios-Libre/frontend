import api from "@/services/axiosConfig";
import { User } from "@/types";

export async function searchUserByEmail(email: string): Promise<User | null> {

    console.log(email);

    const res = await api.get("/users", {
        params: {
            search: email,
            role: "user",
            limit: 1,
            page: 1,
        },
    });

    console.log(res.data.users);

    return res.data.users[0] || null;
}

export async function updateUserRole(userId: string, role: string) {
    await api.patch(`/users/${userId}`, { role });
}

export async function fetchAdmins(): Promise<User[]> {
    const res = await api.get("/users?role=admin");
    return res.data.users || [];
}

export const promoteToAdmin = async (userId: string): Promise<void> => {
    await api.put(`/users/to-admin/${userId}`);
};

export const downgradeAdmin = async (userId: string): Promise<void> => {
    await api.put(`/users/downgrade-admin/${userId}`);
};

export const downgradeToUser = async (userId: string): Promise<void> => {
  await api.put(`/users/to-user/${userId}`);
};
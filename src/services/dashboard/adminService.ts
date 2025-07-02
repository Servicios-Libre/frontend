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

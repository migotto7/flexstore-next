import { adminAuth } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Profile() {
    const cookieStore = cookies();
    const token = (await cookieStore).get('token')?.value;

    if(!token) {
        redirect('/sign-in');
    }

    try {
        const decodedToken = await adminAuth.verifyIdToken(token);

        return(
            <div>
                <p>Bem vindo, {decodedToken.email}</p>
            </div>
        )
    } catch (error) {
        redirect('/sign-in');
    }
}
import { cookies } from "next/headers";
import { useRouter } from "next/router";

export const checkToken = async () => {
    const router = useRouter();
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if(token) {
        router.push("/profile");
    }else{
        router.push("/sign-in");
    }
}
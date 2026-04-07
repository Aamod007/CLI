"use client"

import Image from "next/image";
import {Button}  from "./ui/button";
import {Card,CardContent} from "./ui/card";
import {authClient} from "@/lib/auth-client";
import {useState} from "react";


export const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);

	const handleGithubLogin = async () => {
		setIsLoading(true);
		try {
			await authClient.signIn.social({
				provider: "github",
				callbackURL: "http://localhost:3000",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
			<div className="flex flex-col gap-6 justify-center items-center">
				<div className="flex flex-col items-center justify-center space-y-4">
			    <Image src={"/login.png"} alt="Login" height={500} width={500}/>
			    <h1 className="text-6xl font-extrabold text-indigo-400">Welcome Back! to CodeDeck</h1>
			    <p className="text-base font-medium text-zinc-400">Login to your account to continue</p>
					<Card className="w-full max-w-md border-zinc-800 bg-zinc-950/70">
						<CardContent className="p-4">
							<Button
								type="button"
								onClick={handleGithubLogin}
								disabled={isLoading}
								className="w-full flex items-center justify-center gap-2"
							>
								<Image src="/github.svg" alt="GitHub" width={20} height={20} />
								<span>{isLoading ? "Redirecting..." : "Continue with GitHub"}</span>
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
	)   
}

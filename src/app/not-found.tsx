import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<main className="container mx-auto px-3 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
			<div className="flex h-[70vh] flex-col items-center justify-center">
				<h2 className="my-12 text-4xl font-bold">404 - Not Found</h2>
				<Button>
					<Link href="/">Return Home</Link>
				</Button>
			</div>
		</main>
	);
}

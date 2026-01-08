import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="border-b border-(--foreground)/10">
        <div className="flex container h-16 items-center justify-between px-4 mx-auto">
            <div className="text-xl font-semibold">RAG Chatbot</div>
            <div className="flex gap-2">
                <SignedOut>
                    <SignInButton />
                    <SignUpButton>
                        <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                        Sign Up
                        </button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <SignOutButton>
                        <Button variant="outline">Sign Out</Button>
                    </SignOutButton>
                </SignedIn>
            </div>
        </div>
    </nav>
  )
}

export default Navigation
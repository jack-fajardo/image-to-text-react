import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Github, Twitter } from 'lucide-react'

type Props = {
    setAppScreen: (appScreen: boolean) => void;
}

export default function AuthScreen({ setAppScreen }: Props) {
    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const acceptableEmails = ["123@gmail.com", "123"]
    const acceptablePasswords = ["123", "12345"]

    const toggleMode = () => setIsSignUp(!isSignUp)

    const handleSignIn = () => {
        console.log("signin")
        if (acceptableEmails.includes(email) && acceptablePasswords.includes(password)) {
            setAppScreen(true)
        }
    }

    const handleSignUp = () => {
        console.log('signup')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-center mb-6">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <form className="space-y-6">
                        {isSignUp && (
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" placeholder="John Doe" required />
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input onChange={e => setEmail(e.target.value)} id="email" type="email" placeholder="hello@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input onChange={e => setPassword(e.target.value)} id="password" type="password" required />
                        </div>
                        <Button onClick={isSignUp ? handleSignUp : handleSignIn} className="w-full">
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </Button>
                    </form>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <Button variant="outline" className="w-full">
                                <Github className="mr-2 h-4 w-4" />
                                Github
                            </Button>
                            <Button variant="outline" className="w-full">
                                <Twitter className="mr-2 h-4 w-4" />
                                Twitter
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center">
                    <Button variant="link" onClick={toggleMode} className="font-medium">
                        {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

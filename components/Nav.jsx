"use client";

import Link from "next/link";
import Image from "next/image";

import { useState , useEffect} from "react";
import { signIn , signOut , useSession , getProviders } from 'next-auth/react';

const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        // (
    //     async () => {
    //         console.log('Fetching providers');
    //         const res = await getProviders();
    //         setProviders(res);
    //     }
    // )();

    fetchProviders = async () => {
        console.log('Fetching providers');
        const res = await getProviders();
        setProviders(res);
    }
    fetchProviders();
    
    }, []);

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/assets/images/logo.svg" width={30} height={30} alt="logo" className="object-contain"/>
                <span className="logo_text">Promptify</span>
            </Link>

            {/* Desktop navigation */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="create-prompt" className="black_btn">Creat prompt</Link>

                        <button type="button" onClick={signOut} className="outline_btn">
                            Sign out
                        </button>
                        
                        <Link href="/profile">
                            <Image 
                                src={session.user.image}
                                width={37} height={37} alt="user" 
                                className="rounded-full"
                                onClick={() => setToggleDropdown((prev) => !prev)}    
                            />
                        </Link>
                    </div>
                ):(
                    <div>
                        {providers && Object.values(providers).map(provider => (
                            <button 
                                key={provider.name} 
                                onClick={() => signIn(provider.id)} 
                                className="outline_btn" 
                                type="button"
                            >
                                Sign in with {provider.name}
                            </button>
                        ))
                        }
                    </div>
                )}
            </div>

            {/* Mobile navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image 
                            src={session.user.image}
                            width={37} height={37} alt="user" 
                            className="rounded-full"
                            onClick={() => setToggleDropdown((prev) => !prev)}    
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href='/profile'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                
                                <Link
                                    href='/create-prompt'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                Create Prompt
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className='mt-5 w-full black_btn'
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ):(
                    <div>
                        {providers && Object.values(providers).map(provider => (
                            <button 
                                key={provider.name} 
                                onClick={() => signIn(provider.id)} 
                                className="outline_btn" 
                                type="button"
                            >
                                Sign in with {provider.name}
                            </button>
                        ))
                        }
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Nav

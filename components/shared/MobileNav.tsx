'use client'

import React from 'react'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { navLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

const MobileNav = () => {
	const pathname = usePathname()

	return (
		<header className='header'>
			<Link href='/' className='flex items-center gap-2 md:py-2'>
				<Image
					src='/assets/images/logo-text.svg'
					alt='logo'
					width={180}
					height={28}
				/>
			</Link>

			<nav className='flex items-center gap-2'>
				<SignedIn>
					<UserButton />

					<Sheet>
						<SheetTrigger>
							<Image
								src='/assets/icons/menu.svg'
								alt='menu'
								width={32}
								height={32}
								className='cursor-pointer'
							/>
						</SheetTrigger>
						<SheetContent className='sheet-content sm:w-64'>
							<ul className='header-nav_elements'>
								{navLinks.map(link => {
									const isActive = link.route === pathname
									return (
										<li
											key={link.label}
											className={`${
												isActive && 'gradient-text'
											} p-18 flex whitespace-nowrap text-dark-700`}
										>
											<Link href={link.route} className='sidebar-link'>
												<Image
													src={link.icon}
													alt={link.label}
													width={24}
													height={24}
												/>
												<span>{link.label}</span>
											</Link>
										</li>
									)
								})}
							</ul>
						</SheetContent>
					</Sheet>
				</SignedIn>

				<SignedOut>
					<Button asChild className='button bg-purple-gradient bg-cover'>
						<Link href='/sign-in'>Sign In</Link>
					</Button>
				</SignedOut>
			</nav>
		</header>
	)
}

export default MobileNav

import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'

export default function Loading({ className }: { className?: string }) {
	return (
		<div className={cn('flex justify-center items-center w-full', className)}>
			<Loader className='animate-spin h-7 w-7' />
		</div>
	)
}
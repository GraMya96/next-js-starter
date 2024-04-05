---
to: <%= absPath %>/<%= component_name %>.tsx
---
import { cn } from '@/lib/utils/cn';

interface <%= component_name %>Props extends React.HTMLAttributes<HTMLDivElement> {

}

export const <%= component_name %>:React.FC<<%= component_name %>Props> = ({
	className,
	...props
}): React.ReactElement => {
	return (
		<div className={cn('', className)} {...props}></div>
	)
}



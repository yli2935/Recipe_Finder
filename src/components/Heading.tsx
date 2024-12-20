/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-19 11:16:44
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-19 11:17:01
 * @FilePath: /Recipe_Finder/src/components/Heading.tsx
 */
'use client';

interface HeadingProps {
	title: string;
	subtitle?: string;
	center?: boolean;
}
const Heading: React.FC<HeadingProps> = ({
	title,
	subtitle,
	center
}) => {
	return ( 
		<div className={center ? 'text-center' : 'text-start'}>
			<div className="text-2xl font-bold">
				{title}
			</div>
			<div className="font-light text-neutral-500 mt-2">
				{subtitle}
			</div>
		</div>
	 );
}
 
export default Heading;
/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-19 11:18:06
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-19 11:21:06
 * @FilePath: /Recipe_Finder/src/components/EmptyState.tsx
 */

"use client";

import { useNavigate } from "react-router-dom";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
	title?: string;
	subtitle?: string;
	showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
	title = "No exact matches",
	subtitle = "Try adjusting your filter or browse all rentals",
	showReset
}) => {
	const navigate = useNavigate();
	return ( 
		<div
			className="
				h-[60vh]
				flex
				flex-col
				gap-2
				justify-center
				items-center
			"
		>
			<Heading
				center
				title={title}
				subtitle={subtitle}
			/>
			<div className="w-48 mt-4">
				{ showReset && (
					<Button
						outline
						label="Remove all filters"
						onClick={() => navigate('/')}
					/>
				)}
			</div>
		</div>
	 );
}
 
export default EmptyState;
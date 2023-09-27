import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";

interface Data {
	platforms: Platforms[];
}

export interface Platforms {
	platform: {
		name: string;
		id: number;
	};
	requirements: {
		minimum?: string;
		recommended?: string;
	};
}

export default function GameRequirements({ data }: { data: Data }) {
	const platformsArr = data.platforms;
	return (
		<>
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="pc">
					<AccordionTrigger>PC Requirements</AccordionTrigger>
					<AccordionContent>
						{platformsArr.map((platforms: Platforms) => {
							if (platforms.platform.name === "PC") {
								return (
									<React.Fragment key={platforms.platform.id}>
										<p key="pc-1">
											{platforms.requirements.minimum}
										</p>
										<p key="pc-2">
											{platforms.requirements.recommended}
										</p>
									</React.Fragment>
								);
							}
						})}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
}

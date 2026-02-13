import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

export const useTransactionCardsStagger = (
	containerRef: RefObject<HTMLElement>,
	dependency?: any
) => {
	useGSAP(
		() => {
			const cards = containerRef.current?.querySelectorAll(".transaction-item");

			if (!cards || cards.length === 0) return;

			gsap.fromTo(
				cards,
				{
					opacity: 0,
				},
				{
					opacity: 1,
					duration: 0.3,
					ease: "linear",
					stagger: 0.1,
				}
			);
		},
		{ scope: containerRef, dependencies: [dependency] }
	);
};

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

export const useAccountCardsStagger = (
	containerRef: RefObject<HTMLElement>
) => {
	useGSAP(
		() => {
			const allCards = containerRef.current?.querySelectorAll(".account-card");

			if (!allCards || allCards.length === 0) return;

      const cards = Array.from(allCards).slice(0, 2);

			if (cards.length === 0) return;

			gsap.set(cards, {
				y: (index) => 65 * (2 - index),
			});

			gsap.to(cards, {
				y: 0,
				duration: 0.6,
				ease: "power2.out",
				stagger: -0.15,
        // delay: 0.3,
			});
		},
		{ scope: containerRef }
	);
};
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.batch("[data-reveal-on-scroll]", {
	onEnter: (batch) =>
		gsap.to(batch, {
			duration: 1,
			ease: "power2.inOut",
			autoAlpha: 1,
			y: 0,
			stagger: 0.1,
		}),
	start: "top bottom",
});

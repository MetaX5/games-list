"use client";

import changeImageUrl from "@/lib/utils/changeImageUrl";

import Image from "next/image";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperRef } from "swiper";
import {
	Navigation,
	Pagination,
	EffectCreative,
	Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";

export interface screenshots {
	results: Result[];
}

interface Result {
	id: string;
	image: string;
}

interface GameGalleryProps {
	slug: string;
	queryResult: screenshots;
}

export default function GameGallery({ slug, queryResult }: GameGalleryProps) {
	const swiperRef = useRef<SwiperRef>();
	const { results: screenshots } = queryResult;

	const swiperParams = {
		style: {
			"--swiper-pagination-color": "#FBC64D",
			"--swiper-pagination-bullet-inactive-color": "#fff",
			"--swiper-pagination-bullet-inactive-opacity": "0.5",
		},
		slidesPerView: 1,
		modules: [Pagination, Navigation, EffectCreative, Autoplay],
		loop: false,
		autoplay: {
			delay: 3000,
			disableOnInteraction: true,
		},
		onSwiper: (swiper: SwiperRef) => {
			swiperRef.current = swiper;
		},
		navigation: true,
		grabCursor: true,
		mousewheel: {
			forceToAxis: true,
			sensitivity: 0.1,
			releaseOnEdges: true,
		},
		pagination: { type: "bullets" },
		effect: "creative",
		creativeEffect: {
			prev: {
				shadow: true,
				origin: "left center",
				translate: ["-5%", 0, -200],
				rotate: [0, 100, 0],
			},
			next: {
				origin: "right center",
				translate: ["5%", 0, -200],
				rotate: [0, -100, 0],
			},
		},
		centeredSlides: true,
	};

	const renderSlides = () =>
		screenshots.map(({ id, image }) => (
			<SwiperSlide className="!flex items-center justify-center" key={id}>
				<Image
					loading="lazy"
					quality={85}
					width={600}
					height={400}
					src={changeImageUrl(image)}
					alt={`${slug}-${id}`}
				/>
			</SwiperSlide>
		));

	return (
		<div className="relative z-10 bg-transparent text-neutral-200">
			<Swiper {...(swiperParams as SwiperProps)}>{renderSlides()}</Swiper>
		</div>
	);
}

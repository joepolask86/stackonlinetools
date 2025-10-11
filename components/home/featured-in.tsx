import Image from "next/image";

export function FeaturedIn() {
  const features = [
    { name: "Product Hunt", logo: "/assets/img/producthunt.svg", width: 120 },
    { name: "Y Combinator", logo: "/assets/img/ycombinator.svg", width: 120 },
    { name: "Indie Hackers", logo: "/assets/img/indiehackers.svg", width: 120 },
    { name: "Reddit", logo: "/assets/img/reddit.svg", width: 80 },
    { name: "SitePoint", logo: "/assets/img/sitepoint.svg", width: 100 },
  ];

  return (
    <section className="hidden md:block bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="flex items-center justify-center max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-center text-md font-semibold tracking-wider text-blue-500 mr-6 opacity-[.50]">
          Featured In:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="transition-all duration-200 cursor-pointer"
            >
              <Image
                src={feature.logo}
                alt={feature.name}
                width={feature.width}
                height={24}
                className="w-34 h-auto opacity-[.50] hover:opacity-32 transition-opacity duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


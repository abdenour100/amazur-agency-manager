import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Amazur | Espace client",
    short_name: "Amazur",
    description: "Espace client privé pour les contenus et services Amazur.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8fb",
    theme_color: "#101b2b",
    lang: "fr",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }]
  };
}
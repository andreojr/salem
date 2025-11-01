import Link from "next/link";
import { Button } from "./ui/button";

export function Playlist() {
    return (
        <div className="grid gap-4">
            <iframe data-testid="embed-iframe" style={{ borderRadius: '24px' }} src="https://open.spotify.com/embed/playlist/3u3omM0BSWMXdgKCaygZ5H?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            <Link target="_blank" href="https://open.spotify.com/playlist/3u3omM0BSWMXdgKCaygZ5H?si=54EueaS0QaGV6KR39gt1kQ&pt=ba1aba15b9e90d22af43159ff87b4987&pi=pxFtxYQwRIGLE">
                <Button className="w-full">Editar Playlist</Button>
            </Link>
        </div>
    )
}
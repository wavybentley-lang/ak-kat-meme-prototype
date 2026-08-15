import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { Reels } from '@/components/reels'
import { Lore } from '@/components/lore'
import { TokenBridge } from '@/components/token-bridge'
import { FinalConversion } from '@/components/final-conversion'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="relative bg-background text-foreground">
      <Navigation />
      <Hero />
      <Reels />
      <Lore />
      <TokenBridge />
      <FinalConversion />
      <SiteFooter />
    </main>
  )
}

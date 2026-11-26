import BannerSection from "@/components/shared/Banner"
import FeaturedTuitions from "@/components/shared/FeaturedTuitions"
import HowItWorks from "@/components/shared/HowItWorks"
import PricingPreview from "@/components/shared/PricingPreview"
import TopSubject from "@/components/shared/TopSubject"

export default function Page() {
  return (
    <main>
      <BannerSection />
      <FeaturedTuitions />
      <PricingPreview/>
      <HowItWorks/>
      <TopSubject/>
    </main>
  )
}

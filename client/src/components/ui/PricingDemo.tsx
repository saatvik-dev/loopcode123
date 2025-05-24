import { PricingCard } from "@/components/ui/dark-gradient-pricing"

function PricingDemo() {
  return (
    <section className="relative overflow-hidden bg-background text-foreground">
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 md:px-8">
        <div className="mb-12 space-y-3">
          <h2 className="text-center text-3xl font-semibold leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
            Pricing
          </h2>
          <p className="text-center text-base text-muted-foreground md:text-lg">
            Choose the perfect plan for your web development needs
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <PricingCard
            tier="Basic"
            price="₹15,000"
            bestFor="Best for small businesses"
            CTA="Get started"
            benefits={[
              { text: "Responsive design", checked: true },
              { text: "Up to 5 pages", checked: true },
              { text: "Contact form", checked: true },
              { text: "SEO optimization", checked: true },
              { text: "CMS integration", checked: false },
              { text: "E-commerce functionality", checked: false },
            ]}
          />
          <PricingCard
            tier="Pro"
            price="₹35,000"
            bestFor="Best for growing businesses"
            CTA="Most popular"
            benefits={[
              { text: "Responsive design", checked: true },
              { text: "Up to 10 pages", checked: true },
              { text: "Contact form", checked: true },
              { text: "SEO optimization", checked: true },
              { text: "CMS integration", checked: true },
              { text: "Basic e-commerce (up to 20 products)", checked: true },
            ]}
          />
          <PricingCard
            tier="Enterprise"
            price="Custom"
            bestFor="Best for large businesses"
            CTA="Contact us"
            benefits={[
              { text: "Responsive design", checked: true },
              { text: "Unlimited pages", checked: true },
              { text: "Advanced forms & user accounts", checked: true },
              { text: "Advanced SEO strategy", checked: true },
              { text: "Full CMS integration", checked: true },
              { text: "Complete e-commerce solution", checked: true },
            ]}
          />
        </div>
      </div>
    </section>
  )
}

export { PricingDemo }
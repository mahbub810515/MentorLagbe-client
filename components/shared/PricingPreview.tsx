
import Link from "next/link";
import { Check, X, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Free",
    price: "৳0",
    description: "Get started with MentorLagbe.",
    features: [
      { text: "Create your profile", included: true },
      { text: "Browse available tuitions", included: true },
      { text: "Basic platform access", included: true },
      { text: "Priority visibility", included: false },
      { text: "Premium features", included: false },
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "৳499",
    period: "/month",
    description: "Unlock more opportunities with Pro.",
    features: [
      { text: "Everything in Free", included: true },
      { text: "Unlimited opportunities", included: true },
      { text: "Priority profile visibility", included: true },
      { text: "Premium features", included: true },
      { text: "Priority support", included: true },
    ],
    popular: true,
  },
];

export default function PricingPreview() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <Badge variant="secondary">Simple Pricing</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Choose Your Perfect Plan
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Start for free or upgrade to Pro to unlock more
            opportunities with MentorLagbe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.popular
                  ? "border-primary shadow-lg"
                  : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 right-5">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Recommended
                </Badge>
              )}

              <CardHeader>
                <CardTitle className="text-2xl">
                  {plan.name}
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-1 pt-3">
                  <span className="text-4xl font-bold">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground">
                      {plan.period}
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-5">
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature.text}
                      className="flex items-center gap-3 text-sm"
                    >
                      {feature.included ? (
                        <Check className="h-4 w-4 text-green-600 shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground shrink-0" />
                      )}
                      <span
                        className={
                          feature.included
                            ? ""
                            : "text-muted-foreground"
                        }
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                nativeButton={false}
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  render={<Link href="/pricing" />}
                >
                  {plan.popular ? "Explore Pro Plan" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

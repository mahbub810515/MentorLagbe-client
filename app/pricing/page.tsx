
"use client";

import { useState } from "react";
import {
  Check,
  X,
  Crown,
  GraduationCap,
  Users,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type UserType = "tutor" | "student";
type Billing = "monthly" | "yearly";

const plans = {
  tutor: [
    {
      name: "Free",
      description: "Start your tutoring journey for free.",
      monthly: 0,
      yearly: 0,
      features: [
        "Create tutor profile",
        "Browse tuition opportunities",
        "Apply to 2 tuitions per month",
        "Basic profile visibility",
        "Standard support",
      ],
      unavailable: [
        "Featured tutor profile",
        "Priority visibility",
        "Advanced analytics",
      ],
      popular: false,
    },
    {
      name: "Pro Tutor",
      description: "Grow your tutoring career faster.",
      monthly: 499,
      yearly: 4990,
      features: [
        "Everything in Free",
        "Unlimited tuition applications",
        "Featured tutor profile",
        "Priority visibility",
        "Advanced profile analytics",
        "Direct student connections",
        "Priority customer support",
      ],
      unavailable: [],
      popular: true,
    },
  ],
  student: [
    {
      name: "Free",
      description: "Find the right tutor for your needs.",
      monthly: 0,
      yearly: 0,
      features: [
        "Create student profile",
        "Browse available tutors",
        "View tuition details",
        "Post tuition requests",
        "Standard support",
      ],
      unavailable: [
        "Priority tutor matching",
        "Featured tuition posts",
        "Advanced tutor search",
      ],
      popular: false,
    },
    {
      name: "Pro Student",
      description: "Get more from your learning journey.",
      monthly: 199,
      yearly: 1990,
      features: [
        "Everything in Free",
        "Priority tutor matching",
        "Featured tuition posts",
        "Advanced tutor search",
        "Unlimited tutor connections",
        "Direct tutor communication",
        "Priority customer support",
      ],
      unavailable: [],
      popular: true,
    },
  ],
};

export default function PricingSection() {
  const [userType, setUserType] = useState<UserType>("tutor");
  const [billing, setBilling] = useState<Billing>("monthly");
  const [loading, setLoading] = useState<string | null>(null);

  const currentPlans = plans[userType];

  const handleSubscribe = async (planName: string) => {
    if (planName === "Free") {
      window.location.href = `/sign-up?role=${userType}`;
      return;
    }

    try {
      setLoading(planName);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: userType,
          plan: planName,
          billing,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Checkout failed");
      }

      if (data.url) {
        window.location.assign(data.url);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to start checkout. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <section className="relative overflow-hidden bg-muted/20 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4 gap-2 px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Simple & Transparent Pricing
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Plans That Fit Your{" "}
            <span className="text-primary">Goals</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Choose the perfect plan for your learning or teaching
            journey. Start for free and upgrade whenever you're ready.
          </p>
        </div>

        {/* User Type Toggle */}
        <div className="mb-8 flex justify-center">
          <div className="flex rounded-xl border bg-background p-1 shadow-sm">
            <Button
              variant={userType === "tutor" ? "default" : "ghost"}
              onClick={() => setUserType("tutor")}
              className="gap-2"
            >
              <GraduationCap className="h-4 w-4" />
              For Tutors
            </Button>

            <Button
              variant={userType === "student" ? "default" : "ghost"}
              onClick={() => setUserType("student")}
              className="gap-2"
            >
              <Users className="h-4 w-4" />
              For Students
            </Button>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="mb-12 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <Button
              variant={billing === "monthly" ? "default" : "outline"}
              size="sm"
              onClick={() => setBilling("monthly")}
              className="rounded-full px-5"
            >
              Monthly
            </Button>

            <Button
              variant={billing === "yearly" ? "default" : "outline"}
              size="sm"
              onClick={() => setBilling("yearly")}
              className="rounded-full px-5"
            >
              Yearly
            </Button>
          </div>

          <Badge variant="secondary" className="text-green-600">
            Save up to 17% with yearly billing
          </Badge>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">

          {currentPlans.map((plan) => {
            const price =
              billing === "monthly"
                ? plan.monthly
                : plan.yearly;

            return (
              <Card
                key={plan.name}
                className={`relative flex flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  plan.popular
                    ? "border-2 border-primary shadow-lg shadow-primary/10"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1 px-4 py-1.5">
                    <Crown className="h-4 w-4" />
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="space-y-4 pt-9">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {plan.popular ? (
                      <Crown className="h-6 w-6" />
                    ) : (
                      <GraduationCap className="h-6 w-6" />
                    )}
                  </div>

                  <CardTitle className="text-2xl">
                    {plan.name}
                  </CardTitle>

                  <CardDescription>
                    {plan.description}
                  </CardDescription>

                  <div className="flex items-baseline gap-1 pt-2">
                    <span className="text-4xl font-bold tracking-tight">
                      ৳{price.toLocaleString("en-BD")}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /{price === 0 ? "forever" : billing === "monthly" ? "month" : "year"}
                    </span>
                  </div>

                  {billing === "yearly" && price > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Equivalent to ৳{Math.round(price / 12).toLocaleString("en-BD")} per month
                    </p>
                  )}
                </CardHeader>

                <CardContent className="flex-1 space-y-5">
                  <div className="border-t pt-5">
                    <p className="mb-4 text-sm font-semibold">
                      What's included
                    </p>

                    <ul className="space-y-4">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.unavailable.length > 0 && (
                    <div className="border-t pt-5">
                      <ul className="space-y-4">
                        {plan.unavailable.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-3 text-sm text-muted-foreground"
                          >
                            <X className="h-4 w-4 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="pb-8">
                  <Button
                    className="h-12 w-full gap-2"
                    variant={plan.popular ? "default" : "outline"}
                    disabled={loading !== null}
                    onClick={() => handleSubscribe(plan.name)}
                  >
                    {loading === plan.name ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {price === 0 ? "Get Started Free" : "Upgrade to Pro"}
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Bottom Information */}
        <div className="mt-14 text-center">
          <p className="text-sm text-muted-foreground">
            Have questions about our plans?{" "}
            <a
              href="mailto:support@mentorlagbe.com"
              className="font-semibold text-primary hover:underline"
            >
              Contact our support team
            </a>
          </p>

          <p className="mt-3 text-xs text-muted-foreground">
            Sample pricing in BDT. Subscription features and prices
            can be customized before launch.
          </p>
        </div>
      </div>
    </section>
  );
}

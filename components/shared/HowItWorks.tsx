
import {
  Search,
  UserCheck,
  MessageCircle,
  GraduationCap,
  BookOpen,
  Users,
  ClipboardList,
  Send,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Sign up as a student or tutor and complete your profile to get started.",
    student: "Create your student profile.",
    tutor: "Create your professional tutor profile.",
    icon: UserCheck,
  },
  {
    number: "02",
    title: "Find or Post Tuition",
    description:
      "Students explore available tuition opportunities while tutors publish their tuition batches.",
    student: "Browse and search available tuitions.",
    tutor: "Post tuition requirements and batches.",
    icon: Search,
  },
  {
    number: "03",
    title: "Connect & Apply",
    description:
      "Connect with the right people and find the perfect learning opportunity.",
    student: "View tutor profiles and connect.",
    tutor: "Receive and review student applications.",
    icon: MessageCircle,
  },
  {
    number: "04",
    title: "Start Learning",
    description:
      "Finalize your arrangement and begin your teaching or learning journey.",
    student: "Choose your tutor and start learning.",
    tutor: "Accept applications and start teaching.",
    icon: GraduationCap,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <Badge variant="secondary">
            <BookOpen className="w-3 h-3 mr-1" />
            How It Works
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Start Your Journey with{" "}
            <span className="text-primary">MentorLagbe</span>
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            Whether you are looking for a tutor or want to share
            your teaching skills, MentorLagbe makes everything
            simple in just four steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative group"
              >
                <div className="h-full rounded-2xl border bg-background p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                  {/* Number and Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-bold text-primary/20">
                      {step.number}
                    </span>

                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Student */}
                  <div className="space-y-4">
                    <div className="flex gap-2 items-start">
                      <GraduationCap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <p className="text-xs leading-relaxed">
                        <span className="font-semibold">Student: </span>
                        <span className="text-muted-foreground">
                          {step.student}
                        </span>
                      </p>
                    </div>

                    {/* Tutor */}
                    <div className="flex gap-2 items-start">
                      <Users className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <p className="text-xs leading-relaxed">
                        <span className="font-semibold">Tutor: </span>
                        <span className="text-muted-foreground">
                          {step.tutor}
                        </span>
                      </p>
                    </div>
                  </div>

                </div>

                {/* Arrow */}
                {index !== steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-5 z-10 -translate-y-1/2">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 rounded-2xl bg-primary text-primary-foreground p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-sm opacity-80">
              Join MentorLagbe and make your next learning
              or teaching connection.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              nativeButton={false}
              render={<Link href="/register?role=student" />}
              variant="secondary"
            >
              Find a Tutor
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Button
              nativeButton={false}
              render={<Link href="/register?role=tutor" />}
              variant="outline"
              className="bg-transparent text-primary-foreground border-primary-foreground/40 hover:bg-primary-foreground hover:text-primary"
            >
              Become a Tutor
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}

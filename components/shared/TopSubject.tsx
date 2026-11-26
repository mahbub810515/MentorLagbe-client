
import Link from "next/link";
import {
  Calculator,
  Atom,
  Code2,
  Languages,
  BookOpen,
  FlaskConical,
  Users,
  GraduationCap,
  BookMarked,
  Star,
  Quote,
  ArrowRight,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const subjects = [
  {
    name: "Mathematics",
    description: "Master numbers and problem solving.",
    icon: Calculator,
    students: "1,200+",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    name: "Physics",
    description: "Explore the laws of the universe.",
    icon: Atom,
    students: "850+",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    name: "Chemistry",
    description: "Discover the world of reactions.",
    icon: FlaskConical,
    students: "650+",
    color: "bg-green-500/10 text-green-600",
  },
  {
    name: "Programming",
    description: "Build your future with technology.",
    icon: Code2,
    students: "900+",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    name: "English",
    description: "Improve your communication skills.",
    icon: BookOpen,
    students: "1,000+",
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    name: "IELTS",
    description: "Prepare for your international goals.",
    icon: Languages,
    students: "750+",
    color: "bg-cyan-500/10 text-cyan-600",
  },
];

const statistics = [
  {
    label: "Registered Students",
    value: "5,000+",
    icon: GraduationCap,
  },
  {
    label: "Verified Tutors",
    value: "1,200+",
    icon: BadgeCheck,
  },
  {
    label: "Active Tuitions",
    value: "850+",
    icon: BookMarked,
  },
  {
    label: "Successful Connections",
    value: "3,500+",
    icon: TrendingUp,
  },
];

const testimonials = [
  {
    name: "Nusrat Jahan",
    role: "University Student",
    subject: "Mathematics",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=47",
    feedback:
      "MentorLagbe helped me find an experienced mathematics tutor. The process was simple and I had a great learning experience.",
  },
  {
    name: "Rahim Ahmed",
    role: "Professional Tutor",
    subject: "Physics",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=12",
    feedback:
      "As a tutor, I can easily post my tuition opportunities and connect with students. It saves me a lot of time.",
  },
  {
    name: "Sadia Islam",
    role: "College Student",
    subject: "IELTS",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=44",
    feedback:
      "Finding an IELTS tutor was never this easy. I love how organized and user-friendly the platform is.",
  },
];

export default function TopSubject() {
  return (
    <div className="space-y-24 py-20">

      {/* ================= SUBJECTS ================= */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col md:flex-row justify-between md:items-end gap-5 mb-10">
            <div className="space-y-3">
              <Badge variant="secondary">
                Explore Subjects
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold">
                Learn What You Love
              </h2>

              <p className="text-muted-foreground max-w-xl">
                Find expert tutors across popular subjects
                and improve your knowledge with personalized learning.
              </p>
            </div>

            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/tuitions" />}
            >
              Explore All Subjects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {subjects.map((subject) => {
              const Icon = subject.icon;

              return (
                <Link
                  key={subject.name}
                  href={`/tuitions?subject=${encodeURIComponent(subject.name)}`}
                  className="group"
                >
                  <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <CardContent className="p-5 space-y-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${subject.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm md:text-base">
                          {subject.name}
                        </h3>

                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                          {subject.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-3.5 h-3.5" />
                        {subject.students} learners
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= STATISTICS ================= */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 md:p-14">

            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <Badge variant="secondary">
                  Our Growing Community
                </Badge>

                <h2 className="text-3xl md:text-4xl font-bold mt-4">
                  Making Learning Accessible for Everyone
                </h2>

                <p className="text-sm md:text-base opacity-80 mt-4">
                  Join a growing community of students and
                  tutors building better learning experiences.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {statistics.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className="text-center space-y-3"
                    >
                      <div className="w-12 h-12 mx-auto rounded-xl bg-white/15 flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold">
                        {stat.value}
                      </h3>

                      <p className="text-xs md:text-sm opacity-80">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <Badge variant="secondary">
              <Star className="w-3 h-3 mr-1" />
              Testimonials
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold">
              What Our Community Says
            </h2>

            <p className="text-muted-foreground">
              Real experiences from students and tutors
              who are part of the MentorLagbe community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <Card
                key={item.name}
                className="h-full hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 space-y-5">

                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    <Quote className="w-8 h-8 text-primary/20" />
                  </div>

                  <p className="text-sm text-muted-foreground leading-7">
                    "{item.feedback}"
                  </p>

                  <div className="flex items-center justify-between gap-3 pt-3 border-t">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-11 h-11 rounded-full object-cover"
                      />

                      <div>
                        <h4 className="font-semibold text-sm">
                          {item.name}
                        </h4>

                        <p className="text-xs text-muted-foreground">
                          {item.role}
                        </p>
                      </div>
                    </div>

                    <Badge variant="outline" className="text-xs">
                      {item.subject}
                    </Badge>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

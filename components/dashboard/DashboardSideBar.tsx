"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"

import {
  LayoutDashboard,
  FileText,
  Bookmark,
  PlusCircle,
  GraduationCap,
  Users,
  BookOpen,
  ClipboardList,
  CreditCard,
} from "lucide-react"
import Link from "next/link"

export const dashboardMenuItem = {
  student: [
    {
      name: "Overview",
      link: "/dashboard/student",
      icon: LayoutDashboard,
    },
    {
      name: "Applications",
      link: "/dashboard/student/applications",
      icon: FileText,
    },
    {
      name: "Saved Tuition",
      link: "/dashboard/student/saved-tuition",
      icon: Bookmark,
    },
  ],

  tutor: [
    {
      name: "Overview",
      link: "/dashboard/tutor",
      icon: LayoutDashboard,
    },
    {
      name: "Post Tuition",
      link: "/dashboard/tutor/post-tuition",
      icon: PlusCircle,
    },
    {
      name: "My Tuition",
      link: "/dashboard/tutor/my-tuition",
      icon: BookOpen,
    },
    {
      name: "Applications",
      link: "/dashboard/tutor/applications",
      icon: ClipboardList,
    },
  ],

  admin: [
    {
      name: "Overview",
      link: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      link: "/dashboard/admin/users",
      icon: Users,
    },
    {
      name: "Tuition",
      link: "/dashboard/admin/tuition",
      icon: GraduationCap,
    },
    {
      name: "Transactions",
      link: "/dashboard/admin/transactions",
      icon: CreditCard,
    },
  ],
}
export function DashboardSideBar() {
  const { data: session, isPending } = useSession()
  if (isPending) return <p>Loading...</p>
  const role =
    (session?.user?.role as keyof typeof dashboardMenuItem) || "student"
  const menuItems = dashboardMenuItem[role] ?? []
  console.log("session:", session)
  console.log("menuItems:", menuItems)

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent className="pt-10">
        <SidebarGroup />
        <SidebarMenu>
          {menuItems.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton render={<Link href={item.link} />}>
                <item.icon />
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

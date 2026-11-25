'use client'
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
import { useSession } from "@/lib/auth-client";

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
} from "lucide-react";


export function DashboardSideBar() {

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />     
       
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
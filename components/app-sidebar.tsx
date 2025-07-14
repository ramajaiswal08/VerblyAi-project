"use client";

import type * as React from "react";
import {
  Bot,
  ChevronDown,
  Database,
  HelpCircle,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Palette,
  Plug,
  Settings,
  TestTube,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Bot Design",
    icon: Bot,
    // url: "/bot-design",
    isActive: true,
  },
  {
    title: "Knowledge Base",
    icon: Database,
  },
  {
    title: "Conversations",
    icon: MessageSquare,
  },
  {
    title: "Email Marketing",
    icon: Mail,
  },
  {
    title: "Integrations",
    icon: Plug,
  },
];

const bottomItems = [
  {
    title: "Settings",
    icon: Settings,
  },
  {
    title: "Testing",
    icon: TestTube,
  },
  {
    title: "Get Help",
    icon: HelpCircle,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex items-center gap-2">
            <img
              src="./logo-text.webp"
              alt="Verbly Logo"
              className="h-20 w-20 rounded"
            />
          </div>
        </div>

        <div className="px-4 pb-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between h-auto p-2 border border-gray-300 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">W</span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">web</div>
                    <div className="text-xs text-muted-foreground">
                      Workspace
                    </div>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">W</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">web</div>
                    <div className="text-xs text-muted-foreground">
                      Workspace
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">M</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">mobile</div>
                    <div className="text-xs text-muted-foreground">
                      Workspace
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-4 py-2">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className="px-4 py-2 text-sm"
                  >
                    <a  className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="flex-1" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="px-4 py-2 text-sm">
                    <a  className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-purple-600 text-white text-sm">
              RJ
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">Rama jaiswal</div>
            <div className="text-xs text-muted-foreground truncate">
              ramajaiswal829111@gma...
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <span className="text-lg">⋮</span>
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

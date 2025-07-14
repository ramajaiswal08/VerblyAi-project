"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { BotDesignContent } from "@/components/bot-design-content";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden bg-muted/5 rounded-xl m-2 shadow">
        <header className="sticky top-0 z-50 flex h-14 items-center gap-2 border-b bg-background px-4 rounded-t-xl">
          <SidebarTrigger className="-ml-1">
            <Menu className="h-4 w-4" />
          </SidebarTrigger>
          <div className="flex items-center gap-2">
            <span className="font-medium">Bot Design</span>
          </div>
        </header>
        <div className="flex-1 overflow-auto">
          <div className="mb-8">
            <h1 className="flex items-start text-xl pb-1 mb-4 mt-6 ml-6 border-b font-semibold">
              Bot Design
            </h1>
          </div>
          <BotDesignContent />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

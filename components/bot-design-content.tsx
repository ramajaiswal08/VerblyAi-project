"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, Bot } from "lucide-react";
import { BotTemplateSelection } from "./bot-template-selection";
import type { BotTemplate } from "@/lib/bot-templates";
import { CreateBotForm } from "./create-bot-form";

type ViewMode = "main" | "templates" | "scratch" | "create-scratch";

export function BotDesignContent() {
  const [viewMode, setViewMode] = useState<ViewMode>("main");
  const [selectedTemplate, setSelectedTemplate] = useState<BotTemplate | null>(
    null
  );

  const handleTemplateSelected = (template: BotTemplate) => {
    setSelectedTemplate(template);
    // navigate to the bot configuration page
    // For now, we'll just show an alert
    alert(`Selected template: ${template.name}`);
    setViewMode("main");
  };

  if (viewMode === "templates") {
    return (
      <BotTemplateSelection
        onBack={() => setViewMode("main")}
        onTemplateSelected={handleTemplateSelected}
      />
    );
  }

  if (viewMode === "create-scratch") {
    return (
      <CreateBotForm
        onBack={() => setViewMode("main")}
        onSave={(botData) => {
          console.log("Bot created:", botData);
          alert(`Bot "${botData.agentName}" created successfully!`);
          setViewMode("main");
        }}
      />
    );
  }

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xl flex justify-center items-center font-medium mb-6">
            Create a new bot
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setViewMode("templates")}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-8 w-8 text-gray-600" />
                </div>
                <CardTitle className="text-lg">Create from Template</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Choose from pre-written prompts and ready-to-use bot
                  configurations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setViewMode("create-scratch")}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-gray-600" />
                </div>
                <CardTitle className="text-lg">Create from Scratch</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Build a custom bot with complete control over all settings
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
        
      </div>
    </div>
   
  );
}

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
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { botTemplates, type BotTemplate } from "@/lib/bot-templates";
import { BotTemplateModal } from "./bot-template-modal";

interface BotTemplateSelectionProps {
  onBack: () => void;
  onTemplateSelected: (template: BotTemplate) => void;
}

export function BotTemplateSelection({
  onBack,
  onTemplateSelected,
}: BotTemplateSelectionProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<BotTemplate | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTemplateClick = (template: BotTemplate) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleUseTemplate = (template: BotTemplate) => {
    setIsModalOpen(false);
    onTemplateSelected(template);
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold mb-2">Choose a Bot Template</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {botTemplates.map((template) => (
            <Card
              key={template.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleTemplateClick(template)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${template.color}`}
                  >
                    {template.icon}
                  </div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Button className="bg-black text-white hover:bg-black/90">
            Use Selected Template
          </Button>
        </div>
      </div>

      <BotTemplateModal
        template={selectedTemplate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUseTemplate={handleUseTemplate}
      />
    </div>
  );
}

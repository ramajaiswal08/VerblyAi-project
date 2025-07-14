"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { BotTemplate } from "@/lib/bot-templates";

interface BotTemplateModalProps {
  template: BotTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onUseTemplate: (template: BotTemplate) => void;
}

export function BotTemplateModal({
  template,
  isOpen,
  onClose,
  onUseTemplate,
}: BotTemplateModalProps) {
  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${template.color}`}
            >
              {template.icon}
            </div>
            <DialogTitle className="text-xl font-semibold">
              {template.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            {template.description}
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-2">
                Bot Name
              </h3>
              <p className="font-medium">{template.details.botName}</p>
            </div>

            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-2">
                Bot Description
              </h3>
              <p className="text-sm">{template.details.botDescription}</p>
            </div>

            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-2">
                Greeting Message
              </h3>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm leading-relaxed">
                  {template.details.greetingMessage}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-3">
                Guidelines
              </h3>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm mb-3">
                  As a {template.name.toLowerCase()}, your primary goal is to
                  help users resolve their issues efficiently and
                  professionally.
                </p>
                <p className="text-sm mb-2">Follow these guidelines:</p>
                <ol className="text-sm space-y-1 ml-4">
                  {template.details.guidelines.map((guideline, index) => (
                    <li key={index} className="list-decimal">
                      {guideline}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() => onUseTemplate(template)}
              className="bg-black text-white hover:bg-black/90"
            >
              Use This Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

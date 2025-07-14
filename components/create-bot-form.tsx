"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Bot, Plus, Trash2, User, Palette } from "lucide-react";

interface CreateBotFormProps {
  onBack: () => void;
  onSave: (botData: any) => void;
}

interface PredefinedQuery {
  id: string;
  query: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface ThemePreset {
  id: string;
  name: string;
  primaryColor: string;
  backgroundColor: string;
  botMessageBg: string;
  botMessageText: string;
  userMessageBg: string;
  userMessageText: string;
  mainTextColor: string;
}

interface AppearanceSettings {
  selectedTheme: string;
  primaryColor: string;
  backgroundColor: string;
  mainTextColor: string;
  botMessageBg: string;
  botMessageText: string;
  userMessageBg: string;
  userMessageText: string;
  fontFamily: string;
  borderRadius: number;
}

interface BotFormData {
  agentName: string;
  agentDescription: string;
  welcomeMessage: string;
  guidelines: string;
  llmProvider: string;
  llmModel: string;
  maxTokens: number;
  temperature: number;
  personality: string;
  defaultLanguage: string;
  humanizeConversation: boolean;
  enableHelpDesk: boolean;
  faqItems: FAQItem[];
  enableDataCollection: boolean;
  predefinedQueries: PredefinedQuery[];
  appearance: AppearanceSettings;
}

const themePresets: ThemePreset[] = [
  {
    id: "lavender-dream",
    name: "Lavender Dream",
    primaryColor: "#7a5af5",
    backgroundColor: "#ffffff",
    botMessageBg: "#f3f4f6",
    botMessageText: "#000000",
    userMessageBg: "#7a5af5",
    userMessageText: "#ffffff",
    mainTextColor: "#000000",
  },
  {
    id: "midnight-violet",
    name: "Midnight Violet",
    primaryColor: "#7c3aed",
    backgroundColor: "#1f2937",
    botMessageBg: "#374151",
    botMessageText: "#ffffff",
    userMessageBg: "#7c3aed",
    userMessageText: "#ffffff",
    mainTextColor: "#ffffff",
  },
  {
    id: "amber-glow",
    name: "Amber Glow",
    primaryColor: "#f59e0b",
    backgroundColor: "#fef3c7",
    botMessageBg: "#fef3c7",
    botMessageText: "#92400e",
    userMessageBg: "#f59e0b",
    userMessageText: "#ffffff",
    mainTextColor: "#92400e",
  },
  {
    id: "royal-indigo",
    name: "Royal Indigo",
    primaryColor: "#6366f1",
    backgroundColor: "#e0e7ff",
    botMessageBg: "#e0e7ff",
    botMessageText: "#3730a3",
    userMessageBg: "#6366f1",
    userMessageText: "#ffffff",
    mainTextColor: "#3730a3",
  },
  {
    id: "aqua-splash",
    name: "Aqua Splash",
    primaryColor: "#06b6d4",
    backgroundColor: "#cffafe",
    botMessageBg: "#cffafe",
    botMessageText: "#0e7490",
    userMessageBg: "#06b6d4",
    userMessageText: "#ffffff",
    mainTextColor: "#0e7490",
  },
  {
    id: "custom",
    name: "Custom",
    primaryColor: "#7a5af5",
    backgroundColor: "#ffffff",
    botMessageBg: "#f3f4f6",
    botMessageText: "#000000",
    userMessageBg: "#7a5af5",
    userMessageText: "#ffffff",
    mainTextColor: "#000000",
  },
];

export function CreateBotForm({ onBack, onSave }: CreateBotFormProps) {
  const [formData, setFormData] = useState<BotFormData>({
    agentName: "Verbly-Bot",
    agentDescription: "This is a bot description used for your convenience",
    welcomeMessage: "Hello from i'm an ai agent, how can I assist you today?",
    guidelines: "Write the prompt for the agent",
    llmProvider: "OpenAI",
    llmModel: "GPT-3.5 Turbo",
    maxTokens: 150,
    temperature: 0.2,
    personality: "Casual",
    defaultLanguage: "English",
    humanizeConversation: false,
    enableHelpDesk: false,
    faqItems: [],
    enableDataCollection: false,
    predefinedQueries: [],
    appearance: {
      selectedTheme: "lavender-dream",
      primaryColor: "#7a5af5",
      backgroundColor: "#ffffff",
      mainTextColor: "#000000",
      botMessageBg: "#f3f4f6",
      botMessageText: "#000000",
      userMessageBg: "#7a5af5",
      userMessageText: "#ffffff",
      fontFamily: "Inter",
      borderRadius: 8,
    },
  });

  const [newQuery, setNewQuery] = useState("");
  const [newFAQ, setNewFAQ] = useState({ question: "", answer: "" });

  const updateFormData = (field: keyof BotFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateAppearance = (field: keyof AppearanceSettings, value: any) => {
    setFormData((prev) => ({
      ...prev,
      appearance: { ...prev.appearance, [field]: value },
    }));
  };

  const selectTheme = (themeId: string) => {
    const theme = themePresets.find((t) => t.id === themeId);
    if (theme) {
      setFormData((prev) => ({
        ...prev,
        appearance: {
          ...prev.appearance,
          selectedTheme: themeId,
          primaryColor: theme.primaryColor,
          backgroundColor: theme.backgroundColor,
          mainTextColor: theme.mainTextColor,
          botMessageBg: theme.botMessageBg,
          botMessageText: theme.botMessageText,
          userMessageBg: theme.userMessageBg,
          userMessageText: theme.userMessageText,
        },
      }));
    }
  };

  const handleSave = () => {
    // Validate required fields
    if (!formData.agentName.trim() || formData.agentName.length < 3) {
      alert("Agent name must be at least 3 characters long");
      return;
    }

    if (
      !formData.agentDescription.trim() ||
      formData.agentDescription.length < 10
    ) {
      alert("Agent description must be at least 10 characters long");
      return;
    }

    if (
      !formData.welcomeMessage.trim() ||
      formData.welcomeMessage.length < 20
    ) {
      alert("Welcome message must be at least 20 characters long");
      return;
    }

    if (!formData.guidelines.trim() || formData.guidelines.length < 50) {
      alert("Agent guidelines must be at least 50 characters long");
      return;
    }

    // Create bot data structure
    const botData = {
      id: `bot-${Date.now()}`,
      name: formData.agentName,
      description: formData.agentDescription,
      status: "draft" as const,
      flow: {
        nodes: [
          {
            id: "start",
            type: "start" as const,
            position: { x: 100, y: 100 },
            data: { label: "Start" },
            connections: ["welcome"],
          },
          {
            id: "welcome",
            type: "message" as const,
            position: { x: 300, y: 100 },
            data: {
              label: "Welcome Message",
              message: formData.welcomeMessage,
            },
            connections: [],
          },
        ],
        connections: [{ from: "start", to: "welcome" }],
      },
      appearance: {
        primaryColor: formData.appearance.primaryColor,
        backgroundColor: formData.appearance.backgroundColor,
        textColor: formData.appearance.mainTextColor,
        fontFamily: formData.appearance.fontFamily,
        borderRadius: formData.appearance.borderRadius,
      },
      settings: {
        welcomeMessage: formData.welcomeMessage,
        fallbackMessage:
          "I'm sorry, I didn't understand that. Could you please rephrase?",
        enableTypingIndicator: true,
        responseDelay: 1000,
        llmProvider: formData.llmProvider,
        llmModel: formData.llmModel,
        maxTokens: formData.maxTokens,
        temperature: formData.temperature,
        personality: formData.personality,
        defaultLanguage: formData.defaultLanguage,
        humanizeConversation: formData.humanizeConversation,
        enableHelpDesk: formData.enableHelpDesk,
        faqItems: formData.faqItems,
        enableDataCollection: formData.enableDataCollection,
        predefinedQueries: formData.predefinedQueries,
        guidelines: formData.guidelines,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to localStorage
    const existingBots = JSON.parse(localStorage.getItem("chatbots") || "[]");
    const updatedBots = [...existingBots, botData];
    localStorage.setItem("chatbots", JSON.stringify(updatedBots));

    // Call the onSave callback
    onSave(botData);
  };

  const getCharacterCount = (text: string, max: number) => {
    return `${text.length}/${max}`;
  };

  const addPredefinedQuery = () => {
    if (newQuery.trim()) {
      const newQueryItem: PredefinedQuery = {
        id: Date.now().toString(),
        query: newQuery.trim(),
      };
      updateFormData("predefinedQueries", [
        ...formData.predefinedQueries,
        newQueryItem,
      ]);
      setNewQuery("");
    }
  };

  const removePredefinedQuery = (id: string) => {
    updateFormData(
      "predefinedQueries",
      formData.predefinedQueries.filter((q) => q.id !== id)
    );
  };

  const addFAQItem = () => {
    if (newFAQ.question.trim() && newFAQ.answer.trim()) {
      const newFAQItem: FAQItem = {
        id: Date.now().toString(),
        question: newFAQ.question.trim(),
        answer: newFAQ.answer.trim(),
      };
      updateFormData("faqItems", [...formData.faqItems, newFAQItem]);
      setNewFAQ({ question: "", answer: "" });
    }
  };

  const removeFAQItem = (id: string) => {
    updateFormData(
      "faqItems",
      formData.faqItems.filter((item) => item.id !== id)
    );
  };

  const ColorPicker = ({
    color,
    onChange,
    label,
  }: {
    color: string;
    onChange: (color: string) => void;
    label: string;
  }) => (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded border-2 border-gray-200 cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={() => document.getElementById(`color-${label}`)?.click()}
        />
        <div
          className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={() => document.getElementById(`color-${label}`)?.click()}
        />
      </div>
      <Input
        id={`color-${label}`}
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="sr-only"
      />
      <Input
        value={color}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#000000"
        className="font-mono text-sm w-24"
      />
    </div>
  );

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold mb-2">
            Create Bot from Scratch
          </h1>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="prompt">Prompt</TabsTrigger>
            <TabsTrigger value="llm">LLM</TabsTrigger>
            <TabsTrigger value="personality">Personality</TabsTrigger>
            <TabsTrigger value="helpdesk">Help Desk</TabsTrigger>
            <TabsTrigger value="datacollection">Data Collection</TabsTrigger>
            <TabsTrigger value="queries">Predefined Queries</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Configure the basic details of your bot
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="agentName">
                    Agent Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="agentName"
                    value={formData.agentName}
                    onChange={(e) =>
                      updateFormData("agentName", e.target.value)
                    }
                    maxLength={50}
                    className="max-w-md"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>
                      This will be the name of your bot (3-50 characters).
                    </span>
                    <span>{getCharacterCount(formData.agentName, 50)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agentDescription">
                    Agent Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="agentDescription"
                    value={formData.agentDescription}
                    onChange={(e) =>
                      updateFormData("agentDescription", e.target.value)
                    }
                    maxLength={500}
                    rows={4}
                    className="resize-none"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>
                      This will be the description of your bot (10-500
                      characters).
                    </span>
                    <span>
                      {getCharacterCount(formData.agentDescription, 500)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prompt" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bot Behavior Configuration</CardTitle>
                <CardDescription>
                  Define how your bot communicates and behaves
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="welcomeMessage">
                    Agent Welcome Message{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="welcomeMessage"
                    value={formData.welcomeMessage}
                    onChange={(e) =>
                      updateFormData("welcomeMessage", e.target.value)
                    }
                    maxLength={500}
                    rows={3}
                    className="resize-none"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>
                      This will be the initial message from the agent (20-500
                      characters).
                    </span>
                    <span>
                      {getCharacterCount(formData.welcomeMessage, 500)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guidelines">
                    Agent Guidelines <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="guidelines"
                    value={formData.guidelines}
                    onChange={(e) =>
                      updateFormData("guidelines", e.target.value)
                    }
                    maxLength={10000}
                    rows={8}
                    className="resize-none"
                    placeholder="Write the prompt for the agent"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>
                      Initial or ongoing input prompts used to guide the
                      assistant's responses (50-10000 characters)
                    </span>
                    <span>{getCharacterCount(formData.guidelines, 10000)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="llm" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose LLM model</CardTitle>
                <CardDescription>
                  Configure the language model settings for your bot
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="llmProvider">LLM Provider</Label>
                    <Select
                      value={formData.llmProvider}
                      onValueChange={(value) =>
                        updateFormData("llmProvider", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select the LLM provider for your bot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OpenAI">OpenAI</SelectItem>
                        <SelectItem value="Anthropic">Anthropic</SelectItem>
                        <SelectItem value="Google">Google</SelectItem>
                        <SelectItem value="Cohere">Cohere</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Select the LLM provider for your bot
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="llmModel">LLM Model</Label>
                    <Select
                      value={formData.llmModel}
                      onValueChange={(value) =>
                        updateFormData("llmModel", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select the specific model to use" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GPT-3.5 Turbo">
                          GPT-3.5 Turbo
                        </SelectItem>
                        <SelectItem value="GPT-4">GPT-4</SelectItem>
                        <SelectItem value="GPT-4 Turbo">GPT-4 Turbo</SelectItem>
                        <SelectItem value="Claude-3 Haiku">
                          Claude-3 Haiku
                        </SelectItem>
                        <SelectItem value="Claude-3 Sonnet">
                          Claude-3 Sonnet
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Select the specific model to use
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Max Tokens</Label>
                      <div className="px-3">
                        <Slider
                          value={[formData.maxTokens]}
                          onValueChange={(value) =>
                            updateFormData("maxTokens", value[0])
                          }
                          max={4000}
                          min={50}
                          step={10}
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Tokens generated on each LLM output
                        </span>
                        <span className="font-medium">
                          {formData.maxTokens}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Increasing tokens enables longer responses to be
                        generated but increases latency
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Temperature</Label>
                      <div className="px-3">
                        <Slider
                          value={[formData.temperature]}
                          onValueChange={(value) =>
                            updateFormData("temperature", value[0])
                          }
                          max={2}
                          min={0}
                          step={0.1}
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Temperature
                        </span>
                        <span className="font-medium">
                          {formData.temperature}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Increasing temperature enables heightened creativity,
                        but increases chance of deviation from prompt
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personality" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Agent Personality
                </CardTitle>
                <CardDescription>
                  Set a personality based on how you want your agent to behave
                  during the conversation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="personality">Agent Personality</Label>
                  <Select
                    value={formData.personality}
                    onValueChange={(value) =>
                      updateFormData("personality", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Casual">😎 Casual</SelectItem>
                      <SelectItem value="Professional">
                        👔 Professional
                      </SelectItem>
                      <SelectItem value="Friendly">😊 Friendly</SelectItem>
                      <SelectItem value="Formal">🎩 Formal</SelectItem>
                      <SelectItem value="Enthusiastic">
                        🎉 Enthusiastic
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">🌐 Default Language</Label>
                  <Select
                    value={formData.defaultLanguage}
                    onValueChange={(value) =>
                      updateFormData("defaultLanguage", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">🇬🇧 English</SelectItem>
                      <SelectItem value="Spanish">🇪🇸 Spanish</SelectItem>
                      <SelectItem value="French">🇫🇷 French</SelectItem>
                      <SelectItem value="German">🇩🇪 German</SelectItem>
                      <SelectItem value="Italian">🇮🇹 Italian</SelectItem>
                      <SelectItem value="Portuguese">🇵🇹 Portuguese</SelectItem>
                      <SelectItem value="Chinese">🇨🇳 Chinese</SelectItem>
                      <SelectItem value="Japanese">🇯🇵 Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Set a default language for your chatbot. The bot can still
                    communicate in other languages, but will default to this
                    language. For countries with multiple languages (like
                    India), the same flag is used for all languages from that
                    country.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>💬 Humanize Conversation</Label>
                    <p className="text-sm text-muted-foreground">
                      Add a vocal ticks such as hmm, umm etc. to your
                      conversation.
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">Humanize Conversation</div>
                      <div className="text-sm text-muted-foreground">
                        Enable natural speech patterns in responses
                      </div>
                    </div>
                    <Switch
                      checked={formData.humanizeConversation}
                      onCheckedChange={(checked) =>
                        updateFormData("humanizeConversation", checked)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="helpdesk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>❓ Help Desk</CardTitle>
                <CardDescription>
                  Add frequently asked questions and answers to help your users.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">Enable Help Desk</div>
                    <div className="text-sm text-muted-foreground">
                      Allow the bot to use help desk questions and answers
                    </div>
                  </div>
                  <Switch
                    checked={formData.enableHelpDesk}
                    onCheckedChange={(checked) =>
                      updateFormData("enableHelpDesk", checked)
                    }
                  />
                </div>

                {formData.enableHelpDesk && (
                  <div className="space-y-4">
                    <div className="space-y-4 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="faqQuestion">Question</Label>
                        <p className="text-sm text-muted-foreground">
                          Add a question that you believe is frequently asked.
                        </p>
                        <Input
                          id="faqQuestion"
                          placeholder="Type your question"
                          value={newFAQ.question}
                          onChange={(e) =>
                            setNewFAQ({ ...newFAQ, question: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="faqAnswer">Answer to question</Label>
                        <p className="text-sm text-muted-foreground">
                          The answer for the question above.
                        </p>
                        <Textarea
                          id="faqAnswer"
                          placeholder="Type your answer"
                          value={newFAQ.answer}
                          onChange={(e) =>
                            setNewFAQ({ ...newFAQ, answer: e.target.value })
                          }
                          rows={4}
                        />
                      </div>

                      <Button
                        onClick={addFAQItem}
                        disabled={
                          !newFAQ.question.trim() || !newFAQ.answer.trim()
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add FAQ
                      </Button>
                    </div>

                    {formData.faqItems.length > 0 && (
                      <div className="space-y-2">
                        <Label>FAQ Items</Label>
                        <div className="space-y-2">
                          {formData.faqItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-start justify-between p-3 border rounded-lg"
                            >
                              <div className="flex-1 space-y-1">
                                <div className="font-medium text-sm">
                                  {item.question}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {item.answer}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFAQItem(item.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="datacollection" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Collection</CardTitle>
                <CardDescription>
                  Configure fields to collect important user data during
                  conversations to enhance interactions and insights.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">Enable Data Collection</div>
                    <div className="text-sm text-muted-foreground">
                      Collect user information during chat conversations
                    </div>
                  </div>
                  <Switch
                    checked={formData.enableDataCollection}
                    onCheckedChange={(checked) =>
                      updateFormData("enableDataCollection", checked)
                    }
                  />
                </div>

                {formData.enableDataCollection && (
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">
                      Data collection configuration options will be available
                      here. You can configure what user information to collect,
                      how to store it, and privacy settings.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="queries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Predefined Queries</CardTitle>
                <CardDescription>
                  Add predefined queries that will be shown as clickable options
                  to users. These will help guide the conversation and provide
                  quick access to common questions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newQuery">New Query</Label>
                    <div className="flex gap-2">
                      <Input
                        id="newQuery"
                        placeholder="Enter a predefined query"
                        value={newQuery}
                        onChange={(e) => setNewQuery(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && addPredefinedQuery()
                        }
                      />
                      <Button
                        onClick={addPredefinedQuery}
                        disabled={!newQuery.trim()}
                      >
                        Add Query
                      </Button>
                    </div>
                  </div>

                  {formData.predefinedQueries.length > 0 && (
                    <div className="space-y-2">
                      <Label>Added Queries</Label>
                      <div className="space-y-2">
                        {formData.predefinedQueries.map((query) => (
                          <div
                            key={query.id}
                            className="flex items-center justify-between p-2 border rounded-lg"
                          >
                            <span className="text-sm">{query.query}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removePredefinedQuery(query.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="font-medium text-sm mb-2">
                      Tips for effective predefined queries:
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Keep queries short and clear</li>
                      <li>Focus on common questions users might have</li>
                      <li>Use natural language that matches your audience</li>
                      <li>
                        Include queries for your most important products or
                        services
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Chatbot Appearance
                </CardTitle>
                <CardDescription>
                  Customize how your chatbot looks to match your brand and
                  preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Theme Presets */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">
                      Theme Presets
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Choose a predefined theme or customize your own
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {themePresets.map((theme) => (
                      <div
                        key={theme.id}
                        className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                          formData.appearance.selectedTheme === theme.id
                            ? "border-blue-500 ring-2 ring-blue-200"
                            : "border-gray-200"
                        }`}
                        onClick={() => selectTheme(theme.id)}
                      >
                        <div
                          className="h-16 w-full rounded-md mb-3"
                          style={{ backgroundColor: theme.backgroundColor }}
                        >
                          <div className="flex items-end justify-end h-full p-2">
                            <div
                              className="h-6 w-12 rounded-full"
                              style={{ backgroundColor: theme.primaryColor }}
                            />
                          </div>
                        </div>
                        <div className="text-center text-sm font-medium">
                          {theme.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* General Colors */}
                <div className="space-y-6">
                  <Label className="text-base font-medium">
                    General Colors
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <p className="text-sm text-muted-foreground">
                        Main accent color for buttons and UI elements
                      </p>
                      <ColorPicker
                        color={formData.appearance.primaryColor}
                        onChange={(color) =>
                          updateAppearance("primaryColor", color)
                        }
                        label="primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Background Color</Label>
                      <p className="text-sm text-muted-foreground">
                        Background color of the chat window
                      </p>
                      <ColorPicker
                        color={formData.appearance.backgroundColor}
                        onChange={(color) =>
                          updateAppearance("backgroundColor", color)
                        }
                        label="background"
                      />
                    </div>
                  </div>
                </div>

                {/* Main Text Color */}
                <div className="space-y-2">
                  <Label>Main Text Color</Label>
                  <p className="text-sm text-muted-foreground">
                    Color of regular text in the chat interface
                  </p>
                  <ColorPicker
                    color={formData.appearance.mainTextColor}
                    onChange={(color) =>
                      updateAppearance("mainTextColor", color)
                    }
                    label="mainText"
                  />
                </div>

                {/* Message Bubbles */}
                <div className="space-y-6">
                  <Label className="text-base font-medium">
                    Message Bubbles
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Bot Message Background</Label>
                        <ColorPicker
                          color={formData.appearance.botMessageBg}
                          onChange={(color) =>
                            updateAppearance("botMessageBg", color)
                          }
                          label="botBg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>User Message Background</Label>
                        <ColorPicker
                          color={formData.appearance.userMessageBg}
                          onChange={(color) =>
                            updateAppearance("userMessageBg", color)
                          }
                          label="userBg"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Bot Message Text</Label>
                        <ColorPicker
                          color={formData.appearance.botMessageText}
                          onChange={(color) =>
                            updateAppearance("botMessageText", color)
                          }
                          label="botText"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>User Message Text</Label>
                        <ColorPicker
                          color={formData.appearance.userMessageText}
                          onChange={(color) =>
                            updateAppearance("userMessageText", color)
                          }
                          label="userText"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typography & Style */}
                <div className="space-y-6">
                  <Label className="text-base font-medium">
                    Typography & Style
                  </Label>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Font Family</Label>
                      <p className="text-sm text-muted-foreground">
                        Choose a font for your chatbot
                      </p>
                      <Select
                        value={formData.appearance.fontFamily}
                        onValueChange={(value) =>
                          updateAppearance("fontFamily", value)
                        }
                      >
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Inter">Inter</SelectItem>
                          <SelectItem value="Roboto">Roboto</SelectItem>
                          <SelectItem value="Open Sans">Open Sans</SelectItem>
                          <SelectItem value="Lato">Lato</SelectItem>
                          <SelectItem value="Poppins">Poppins</SelectItem>
                          <SelectItem value="Montserrat">Montserrat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Border Radius: {formData.appearance.borderRadius}px
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Roundness of corners for buttons and message bubbles
                      </p>
                      <div className="px-3 max-w-md">
                        <Slider
                          value={[formData.appearance.borderRadius]}
                          onValueChange={(value) =>
                            updateAppearance("borderRadius", value[0])
                          }
                          max={20}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Preview</Label>
                  <p className="text-sm text-muted-foreground">
                    Sample chat preview with your selected styles
                  </p>
                  <div
                    className="border rounded-lg p-6 space-y-4"
                    style={{
                      backgroundColor: formData.appearance.backgroundColor,
                      fontFamily: formData.appearance.fontFamily,
                    }}
                  >
                    <div className="flex justify-start">
                      <div
                        className="max-w-xs px-4 py-2 text-sm"
                        style={{
                          backgroundColor: formData.appearance.botMessageBg,
                          color: formData.appearance.botMessageText,
                          borderRadius: `${formData.appearance.borderRadius}px`,
                        }}
                      >
                        Hello! How can I help you today?
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div
                        className="max-w-xs px-4 py-2 text-sm"
                        style={{
                          backgroundColor: formData.appearance.userMessageBg,
                          color: formData.appearance.userMessageText,
                          borderRadius: `${formData.appearance.borderRadius}px`,
                        }}
                      >
                        I have a question about your services.
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div
                        className="max-w-xs px-4 py-2 text-sm"
                        style={{
                          backgroundColor: formData.appearance.botMessageBg,
                          color: formData.appearance.botMessageText,
                          borderRadius: `${formData.appearance.borderRadius}px`,
                        }}
                      >
                        I'd be happy to help! Our services include...
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="pt-6 border-t">
          <div className="mt-4 border rounded-md p-4">
            <div className="flex justify-start items-center gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
              >
                <Bot className="h-4 w-4" />
                Get My Bot
              </Button>
              <Button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save Agent
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

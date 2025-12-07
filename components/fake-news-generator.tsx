"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sparkles, Newspaper, RefreshCw, Zap, History, Trash2, Copy, Check } from "lucide-react"

// Combined list of famous personalities (India, Pakistan, Worldwide)
const subjects = [
  // 🇮🇳 Indian Personalities
  "Mahatma Gandhi",
  "Jawaharlal Nehru",
  "Narendra Modi",
  "Indira Gandhi",
  "Dr. B.R. Ambedkar",
  "Ratan Tata",
  "Mukesh Ambani",
  "Gautam Adani",
  "Azim Premji",
  "Narayana Murthy",
  "Sachin Tendulkar",
  "Virat Kohli",
  "P.V. Sindhu",
  "M.S. Dhoni",
  "Neeraj Chopra",
  "Amitabh Bachchan",
  "Shah Rukh Khan",
  "A.R. Rahman",
  "Deepika Padukone",
  "Priyanka Chopra",
  "Rabindranath Tagore",
  "Chetan Bhagat",
  "Arundhati Roy",
  "Dr. A.P.J. Abdul Kalam",
  "Swami Vivekananda",

  // 🇵🇰 Pakistani Personalities
  "Muhammad Ali Jinnah",
  "Benazir Bhutto",
  "Imran Khan",
  "Liaquat Ali Khan",
  "Malala Yousafzai",
  "Mian Muhammad Mansha",
  "Shahid Khan",
  "Abdul Razzak Dawood",
  "Wasim Akram",
  "Shahid Afridi",
  "Babar Azam",
  "Jahangir Khan",
  "Sania Mirza",
  "Nusrat Fateh Ali Khan",
  "Atif Aslam",
  "Mahira Khan",
  "Abida Parveen",
  "Ali Zafar",
  "Faiz Ahmed Faiz",
  "Allama Iqbal",
  "Bano Qudsia",
  "Saadat Hasan Manto",
  "Parveen Shakir",

  // 🌍 World Personalities
  "Barack Obama",
  "Nelson Mandela",
  "Winston Churchill",
  "Vladimir Putin",
  "Angela Merkel",
  "Elon Musk",
  "Jeff Bezos",
  "Bill Gates",
  "Steve Jobs",
  "Warren Buffett",
  "Albert Einstein",
  "Marie Curie",
  "Isaac Newton",
  "Nikola Tesla",
  "Stephen Hawking",
  "Taylor Swift",
  "Leonardo DiCaprio",
  "Beyoncé",
  "Tom Cruise",
  "Rihanna",
  "William Shakespeare",
  "Maya Angelou",
  "Jane Austen",
  "Rumi",
  "Paulo Coelho",
  "Martin Luther King Jr.",
  "Mother Teresa",
  "Greta Thunberg",
  "Dalai Lama",
  "Desmond Tutu",
]

// Extended list of actions with English verb forms
const actions = [
  // Movement
  "run",
  "runs",
  "running",
  "ran",
  "walk",
  "walks",
  "walking",
  "walked",
  "jump",
  "jumps",
  "jumping",
  "jumped",
  "climb",
  "climbs",
  "climbing",
  "climbed",
  "swim",
  "swims",
  "swimming",
  "swam",
  "fly",
  "flies",
  "flying",
  "flew",
  "drive",
  "drives",
  "driving",
  "drove",
  "ride",
  "rides",
  "riding",
  "rode",
  "sit",
  "sits",
  "sitting",
  "sat",
  "stand",
  "stands",
  "standing",
  "stood",
  "crawl",
  "crawls",
  "crawling",
  "crawled",

  // Communication
  "talk",
  "talks",
  "talking",
  "talked",
  "speak",
  "speaks",
  "speaking",
  "spoke",
  "say",
  "says",
  "saying",
  "said",
  "tell",
  "tells",
  "telling",
  "told",
  "listen",
  "listens",
  "listening",
  "listened",
  "hear",
  "hears",
  "hearing",
  "heard",
  "shout",
  "shouts",
  "shouting",
  "shouted",
  "whisper",
  "whispers",
  "whispering",
  "whispered",
  "ask",
  "asks",
  "asking",
  "asked",
  "answer",
  "answers",
  "answering",
  "answered",
  "argue",
  "argues",
  "arguing",
  "argued",
  "explain",
  "explains",
  "explaining",
  "explained",

  // Work & Creation
  "work",
  "works",
  "working",
  "worked",
  "build",
  "builds",
  "building",
  "built",
  "create",
  "creates",
  "creating",
  "created",
  "design",
  "designs",
  "designing",
  "designed",
  "make",
  "makes",
  "making",
  "made",
  "fix",
  "fixes",
  "fixing",
  "fixed",
  "write",
  "writes",
  "writing",
  "wrote",
  "draw",
  "draws",
  "drawing",
  "drew",
  "paint",
  "paints",
  "painting",
  "painted",
  "clean",
  "cleans",
  "cleaning",
  "cleaned",
  "cook",
  "cooks",
  "cooking",
  "cooked",
  "bake",
  "bakes",
  "baking",
  "baked",

  // Learning & Thinking
  "study",
  "studies",
  "studying",
  "studied",
  "learn",
  "learns",
  "learning",
  "learned",
  "teach",
  "teaches",
  "teaching",
  "taught",
  "read",
  "reads",
  "reading",
  "read",
  "think",
  "thinks",
  "thinking",
  "thought",
  "understand",
  "understands",
  "understanding",
  "understood",
  "remember",
  "remembers",
  "remembering",
  "remembered",
  "forget",
  "forgets",
  "forgetting",
  "forgot",
  "plan",
  "plans",
  "planning",
  "planned",
  "decide",
  "decides",
  "deciding",
  "decided",
  "solve",
  "solves",
  "solving",
  "solved",
  "analyze",
  "analyzes",
  "analyzing",
  "analyzed",

  // Emotions
  "love",
  "loves",
  "loving",
  "loved",
  "like",
  "likes",
  "liking",
  "liked",
  "hate",
  "hates",
  "hating",
  "hated",
  "enjoy",
  "enjoys",
  "enjoying",
  "enjoyed",
  "smile",
  "smiles",
  "smiling",
  "smiled",
  "laugh",
  "laughs",
  "laughing",
  "laughed",
  "cry",
  "cries",
  "crying",
  "cried",
  "hope",
  "hopes",
  "hoping",
  "hoped",
  "fear",
  "fears",
  "fearing",
  "feared",

  // Daily life
  "eat",
  "eats",
  "eating",
  "ate",
  "drink",
  "drinks",
  "drinking",
  "drank",
  "sleep",
  "sleeps",
  "sleeping",
  "slept",
  "wake",
  "wakes",
  "waking",
  "woke",
  "wash",
  "washes",
  "washing",
  "washed",
  "brush",
  "brushes",
  "brushing",
  "brushed",
  "dress",
  "dresses",
  "dressing",
  "dressed",
  "shop",
  "shops",
  "shopping",
  "shopped",
  "open",
  "opens",
  "opening",
  "opened",
  "close",
  "closes",
  "closing",
  "closed",

  // Social & Helping
  "help",
  "helps",
  "helping",
  "helped",
  "support",
  "supports",
  "supporting",
  "supported",
  "give",
  "gives",
  "giving",
  "gave",
  "take",
  "takes",
  "taking",
  "took",
  "meet",
  "meets",
  "meeting",
  "met",
  "invite",
  "invites",
  "inviting",
  "invited",
  "thank",
  "thanks",
  "thanking",
  "thanked",
  "greet",
  "greets",
  "greeting",
  "greeted",
  "follow",
  "follows",
  "following",
  "followed",
  "lead",
  "leads",
  "leading",
  "led",
]

// 🌍 Combined list of famous PLACES + THINGS
const placesThings = [
  // --- Countries ---
  "India",
  "Pakistan",
  "United States",
  "China",
  "Japan",
  "United Kingdom",
  "France",
  "Germany",
  "Canada",
  "Australia",
  "Italy",
  "Brazil",
  "Russia",
  "South Africa",
  "Singapore",
  "Thailand",
  "UAE",
  "Spain",
  "Mexico",
  "Indonesia",

  // --- Cities ---
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Mumbai",
  "Karachi",
  "Beijing",
  "Dubai",
  "Rome",
  "Los Angeles",
  "Delhi",
  "Lahore",
  "Bangkok",
  "Istanbul",
  "Seoul",
  "Barcelona",
  "Toronto",
  "Sydney",
  "Berlin",
  "Moscow",
  "Cape Town",
  "Singapore City",
  "Chicago",
  "Kuala Lumpur",
  "Doha",
  "San Francisco",
  "Jakarta",
  "Melbourne",

  // --- Indian Landmarks ---
  "Taj Mahal",
  "Gateway of India",
  "India Gate",
  "Red Fort",
  "Qutub Minar",
  "Statue of Unity",
  "Charminar",
  "Hawa Mahal",
  "Marine Drive",
  "Mysore Palace",
  "Victoria Memorial",
  "Lotus Tower",
  "Jantar Mantar",
  "Ellora Caves",
  "Ajanta Caves",
  "Bandra-Worli Sea Link",
  "Howrah Bridge",
  "Rashtrapati Bhavan",

  // --- Pakistani Landmarks ---
  "Minar-e-Pakistan",
  "Badshahi Mosque",
  "Faisal Mosque",
  "Mazar-e-Quaid",
  "Pakistan Monument",
  "K2 Mountain",
  "Karakoram Highway",
  "Lake Saiful Muluk",
  "Neelum Valley",
  "Hunza Valley",
  "Fairy Meadows",
  "Gwadar Port",
  "Clifton Beach",
  "Baltit Fort",
  "Attabad Lake",
  "Derawar Fort",
  "Rohtas Fort",
  "Shalimar Gardens",
  "Hingol National Park",
  "Makran Coastal Highway",

  // --- World Famous Landmarks ---
  "Eiffel Tower",
  "Statue of Liberty",
  "Great Wall of China",
  "Colosseum",
  "Burj Khalifa",
  "Pyramids of Giza",
  "Sydney Opera House",
  "Big Ben",
  "Empire State Building",
  "Leaning Tower of Pisa",
  "Golden Gate Bridge",
  "Machu Picchu",
  "Christ the Redeemer",
  "Mount Everest",
  "Mount Fuji",
  "Niagara Falls",
  "Grand Canyon",
  "Great Barrier Reef",
  "Yellowstone National Park",
  "Serengeti National Park",
  "Victoria Falls",
  "Mount Kilimanjaro",
  "CN Tower",
  "Brooklyn Bridge",
  "Hollywood Sign",
  "London Bridge",
  "Stonehenge",
  "Versailles Palace",
  "Louvre Museum",
  "Petronas Towers",
  "Gardens by the Bay",
  "Space Needle",
  "Marina Bay Sands",
  "One World Trade Center",
  "Shanghai Tower",
  "Panama Canal",
  "Antelope Canyon",
  "Death Valley",
  "Ha Long Bay",
  "Banff National Park",
  "Salar de Uyuni",
  "Grand Palace Bangkok",
  "Table Mountain",
  "Iguazu Falls",
  "Mount Etna",
  "Lake Louise",
  "Dubai Mall",
  "The Palm Jumeirah",
  "Chichen Itza",
  "Times Square",
  "Central Park",

  // --- Things ---
  "chair",
  "table",
  "lamp",
  "book",
  "pen",
  "cup",
  "plate",
  "bottle",
  "mirror",
  "clock",
  "bed",
  "couch",
  "door",
  "window",
  "television",
  "fan",
  "remote",
  "curtain",
  "sofa",
  "shelf",
  "carpet",
  "computer",
  "laptop",
  "smartphone",
  "tablet",
  "headphones",
  "camera",
  "printer",
  "charger",
  "keyboard",
  "mouse",
  "speaker",
  "microphone",
  "monitor",
  "router",
  "drone",
  "smartwatch",
  "car",
  "bus",
  "train",
  "bicycle",
  "motorcycle",
  "truck",
  "airplane",
  "boat",
  "subway",
  "scooter",
  "helicopter",
  "tram",
  "tree",
  "flower",
  "mountain",
  "river",
  "stone",
  "leaf",
  "sun",
  "moon",
  "star",
  "cloud",
  "sand",
  "ocean",
  "rain",
  "snow",
  "notebook",
  "file",
  "pencil",
  "eraser",
  "scissors",
  "ruler",
  "paper",
  "stapler",
  "calculator",
  "folder",
  "highlighter",
  "marker",
  "envelope",
  "glue",
  "tape",
  "shirt",
  "pants",
  "dress",
  "hat",
  "shoes",
  "watch",
  "bag",
  "jacket",
  "tie",
  "scarf",
  "glasses",
  "belt",
  "wallet",
  "ring",
  "necklace",
  "bracelet",
  "umbrella",
  "bread",
  "rice",
  "apple",
  "banana",
  "milk",
  "coffee",
  "tea",
  "juice",
  "cake",
  "egg",
  "pizza",
  "sandwich",
  "chocolate",
  "ice cream",
  "noodles",
  "burger",
  "pasta",
  "salad",
  "cookie",
  "water bottle",
  "key",
  "coin",
  "toy",
  "ball",
  "helmet",
  "glove",
  "mask",
  "bookcase",
  "map",
]

const funnyEmojis = [
  "🤣",
  "😂",
  "🤪",
  "😜",
  "🤯",
  "🙈",
  "🎭",
  "🎪",
  "🎉",
  "🔥",
  "💀",
  "👀",
  "🤡",
  "🦄",
  "🌈",
  "⚡",
  "🚀",
  "💥",
  "🎊",
  "😱",
]

interface HistoryItem {
  id: number
  headline: string
  emoji: string
  timestamp: Date
}

export function FakeNewsGenerator() {
  const [headline, setHeadline] = useState<string>("")
  const [emoji, setEmoji] = useState<string>("📰")
  const [isGenerating, setIsGenerating] = useState(false)
  const [count, setCount] = useState(0)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const generateFakeNews = () => {
    setIsGenerating(true)

    setTimeout(() => {
      const subject = subjects[Math.floor(Math.random() * subjects.length)]
      const action = actions[Math.floor(Math.random() * actions.length)]
      const placeThing = placesThings[Math.floor(Math.random() * placesThings.length)]
      const randomEmoji = funnyEmojis[Math.floor(Math.random() * funnyEmojis.length)]

      const newHeadline = `Breaking News: ${subject} was seen to ${action} in ${placeThing}.`

      setHeadline(newHeadline)
      setEmoji(randomEmoji)
      setCount((prev) => prev + 1)

      setHistory((prev) =>
        [
          {
            id: Date.now(),
            headline: newHeadline,
            emoji: randomEmoji,
            timestamp: new Date(),
          },
          ...prev,
        ].slice(0, 20),
      ) // Keep only last 20 items

      setIsGenerating(false)
    }, 500)
  }

  const copyToClipboard = async (item: HistoryItem) => {
    await navigator.clipboard.writeText(item.headline)
    setCopiedId(item.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const removeFromHistory = (id: number) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
  }

  const clearHistory = () => {
    setHistory([])
  }

  useEffect(() => {
    generateFakeNews()
  }, [])

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary/10 via-accent/20 to-primary/10 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🤪🗞️</span>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-destructive to-primary bg-clip-text text-transparent">
              Fake News Factory
            </h1>
            <span className="text-2xl">🤡</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-28 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent via-primary/20 to-accent text-accent-foreground text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>100% Fake • 0% Real • Pure Fun! 🎭</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4 text-balance">
              <span className="text-foreground">The Ultimate </span>
              <span className="bg-gradient-to-r from-primary via-destructive to-chart-1 bg-clip-text text-transparent">
                Fake News
              </span>
              <span className="text-foreground"> Generator 🚀</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Generate hilarious & absurd headlines featuring famous personalities! Perfect for laughs, memes, and
              entertainment! 😂🤪
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 mb-10">
            <div className="text-center px-4 py-3 rounded-xl bg-gradient-to-br from-primary/20 to-transparent">
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
                {subjects.length}+
              </p>
              <p className="text-sm text-muted-foreground">Celebrities 🌟</p>
            </div>
            <div className="text-center px-4 py-3 rounded-xl bg-gradient-to-br from-destructive/20 to-transparent">
              <p className="text-3xl font-bold bg-gradient-to-r from-destructive to-chart-1 bg-clip-text text-transparent">
                {actions.length}+
              </p>
              <p className="text-sm text-muted-foreground">Actions 🎬</p>
            </div>
            <div className="text-center px-4 py-3 rounded-xl bg-gradient-to-br from-chart-1/20 to-transparent">
              <p className="text-3xl font-bold bg-gradient-to-r from-chart-1 to-primary bg-clip-text text-transparent">
                {placesThings.length}+
              </p>
              <p className="text-sm text-muted-foreground">Places & Things 🌍</p>
            </div>
          </div>

          {/* News Card */}
          <div className="relative p-[2px] rounded-xl bg-gradient-to-r from-primary via-destructive to-chart-1">
            <Card className="relative overflow-hidden bg-card border-0 shadow-2xl rounded-xl">
              {/* Breaking News Banner */}
              <div className="bg-gradient-to-r from-destructive via-destructive/90 to-destructive text-destructive-foreground px-4 py-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-destructive-foreground rounded-full animate-pulse" />
                <span className="font-bold text-sm uppercase tracking-wider">Breaking News</span>
                <div className="flex-1" />
                <span className="text-xs opacity-80">LIVE 🔴</span>
              </div>

              {/* Headline */}
              <div className="p-8 md:p-12">
                <div className="flex items-start gap-4">
                  <span className="text-5xl md:text-6xl animate-bounce">{emoji}</span>
                  <div className="flex-1">
                    <p
                      className={`text-2xl md:text-3xl lg:text-4xl font-bold text-card-foreground leading-tight transition-opacity duration-300 ${isGenerating ? "opacity-50" : "opacity-100"}`}
                    >
                      {headline || "Click generate to create fake news!"}
                    </p>
                  </div>
                </div>

                {/* Meta */}
                <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Newspaper className="w-4 h-4" />
                    Totally Legit News™
                  </span>
                  <span>•</span>
                  <span>🎲 Headlines Generated: {count}</span>
                  <span>•</span>
                  <span>⚠️ Disclaimer: This is satire!</span>
                </div>
              </div>

              {/* Generate Button */}
              <div className="p-6 bg-muted/50 border-t border-border">
                <Button
                  onClick={generateFakeNews}
                  disabled={isGenerating}
                  size="lg"
                  className="w-full text-lg font-bold py-6 bg-gradient-to-r from-primary via-destructive to-primary hover:from-primary/90 hover:via-destructive/90 hover:to-primary/90 text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Cooking up fake news... 🍳
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Generate Another Headline! 🎲
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Fun Disclaimer */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              🚨 <strong>Disclaimer:</strong> All news generated here is 100% fake and meant for entertainment only!
              Don't believe everything you read on the internet! 🤪
            </p>
          </div>

          {/* History Section */}
          {history.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
                    Generated Headlines
                  </h3>
                  <span className="px-2 py-1 rounded-full bg-gradient-to-r from-accent to-primary/30 text-accent-foreground text-xs font-medium">
                    {history.length}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearHistory}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear All
                </Button>
              </div>

              <div className="space-y-3">
                {history.map((item) => (
                  <Card
                    key={item.id}
                    className="p-4 bg-card border border-border hover:border-transparent hover:bg-gradient-to-r hover:from-primary/5 hover:via-destructive/5 hover:to-chart-1/5 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-card-foreground font-medium leading-snug">{item.headline}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.timestamp.toLocaleTimeString()}</p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => copyToClipboard(item)}
                        >
                          {copiedId === item.id ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromHistory(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Emoji Parade */}
          <div className="mt-12 flex justify-center flex-wrap gap-3 text-3xl">
            {funnyEmojis.slice(0, 10).map((e, i) => (
              <span
                key={i}
                className="hover:scale-150 transition-transform cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-background via-primary/5 to-background border-t border-border py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            Created with <span className="text-destructive">💖</span> by{" "}
            <span className="font-semibold bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
              Muhammad Shahaan Naveed
            </span>
          </p>
        </div>
      </footer>
    </div>
  )
}

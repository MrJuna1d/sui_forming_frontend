"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Sword,
  Shield,
  Crown,
  Wand,
  Gem,
  Upload,
  Coins,
  Filter,
  ChevronDown,
  Sparkles,
  Repeat,
  Plus,
  Wallet,
} from "lucide-react";

// Mock data for marketplace items
const marketplaceItems = {
  weapons: [
    {
      id: 1,
      name: "Celestial Blade",
      type: "Sword",
      rarity: "Legendary",
      price: 1200,
      currency: "SUI",
      image: "/pixelvaccum.png",
      seller: "CryptoKnight",
      stats: {
        damage: 120,
        speed: 85,
        critical: 15,
      },
    },
    {
      id: 2,
      name: "Inferno Axe",
      type: "Axe",
      rarity: "Epic",
      price: 50,
      currency: "SUI",
      image: "/pixelGunSet.png",
      seller: "DragonSlayer",
      stats: {
        damage: 150,
        speed: 60,
        critical: 10,
      },
    },
    {
      id: 3,
      name: "Frost Dagger",
      type: "Dagger",
      rarity: "Rare",
      price: 20,
      currency: "SUI",
      image: "/pixelGun.png",
      seller: "FrostMage",
      stats: {
        damage: 75,
        speed: 120,
        critical: 25,
      },
    },
    {
      id: 4,
      name: "Ancient Staff",
      type: "Staff",
      rarity: "Epic",
      price: 10,
      currency: "SUI",
      image: "/pixelsword.png",
      seller: "WizardKing",
      stats: {
        damage: 90,
        speed: 70,
        critical: 20,
      },
    },
  ],
  armor: [
    {
      id: 5,
      name: "Dragon Scale Armor",
      type: "Chest",
      rarity: "Legendary",
      price: 100,
      currency: "SUI",
      image: "/ArmorSet.png",
      seller: "DragonHunter",
      stats: {
        defense: 150,
        weight: 80,
        durability: 200,
      },
    },
    {
      id: 6,
      name: "Shadow Helm",
      type: "Helmet",
      rarity: "Epic",
      price: 30,
      currency: "SUI",
      image: "/chest.png",
      seller: "ShadowAssassin",
      stats: {
        defense: 85,
        weight: 40,
        durability: 120,
      },
    },
  ],
  accessories: [
    {
      id: 8,
      name: "Amulet of Power",
      type: "Necklace",
      rarity: "Legendary",
      price: 1800,
      currency: "SUI",
      image:
        "https://images.unsplash.com/photo-1607344645866-009c320c5ab0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBpeGVsJTIwYXJ0JTIwZ29sZHxlbnwwfHwwfHx8MA%3D",
      seller: "MysticMage",
      stats: {
        magicPower: 50,
        manaRegen: 25,
        spellCrit: 15,
      },
    },
    {
      id: 9,
      name: "Ring of Fortune",
      type: "Ring",
      rarity: "Epic",
      price: 950,
      currency: "SUI",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBpeGVsJTIwYXJ0JTIwc2lsdmVyfGVufDB8fDB8fHww",
      seller: "LuckyThief",
      stats: {
        luck: 30,
        evasion: 15,
        goldFind: 25,
      },
    },
    {
      id: 10,
      name: "Mystic Cape",
      type: "Cape",
      rarity: "Epic",
      price: 880,
      currency: "SUI",
      image:
        "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBpeGVsJTIwYXJ0JTIwY2FwZXxlbnwwfHwwfHx8MA%3D",
      seller: "EnchantedWizard",
      stats: {
        magicResist: 40,
        stealth: 25,
        movementSpeed: 15,
      },
    },
  ],
};

// Mock data for user inventory
const userInventory = [
  {
    id: 101,
    name: "Enchanted Bow",
    type: "Weapon",
    rarity: "Epic",
    image:
      "https://images.unsplash.com/photo-1511027643875-5cbb0439c8dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBpeGVsJTIwYXJ0JTIwYm93fGVufDB8fDB8fHww",
  },
  {
    id: 102,
    name: "Leather Boots",
    type: "Armor",
    rarity: "Uncommon",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBpeGVsJTIwYXJ0JTIwc2hvZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 103,
    name: "Magic Pendant",
    type: "Accessory",
    rarity: "Rare",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl4ZWwlMjBhcnQlMjBtYWdpY3xlbnwwfHwwfHx8MA%3D",
  },
];

// Mock data for recent transactions
const recentTransactions = [
  {
    id: 1,
    item: "Celestial Blade",
    buyer: "MoonKnight",
    seller: "CryptoKnight",
    price: 1200,
    currency: "SUI",
    time: "2 hours ago",
  },
  {
    id: 2,
    item: "Dragon Scale Armor",
    buyer: "FireLord",
    seller: "DragonHunter",
    price: 1500,
    currency: "SUI",
    time: "5 hours ago",
  },
  {
    id: 3,
    item: "Amulet of Power",
    buyer: "ShadowMage",
    seller: "MysticMage",
    price: 1800,
    currency: "SUI",
    time: "1 day ago",
  },
];

const rarityColors = {
  Common: "bg-gray-200 text-gray-800",
  Uncommon: "bg-green-200 text-green-800",
  Rare: "bg-blue-200 text-blue-800",
  Epic: "bg-purple-200 text-purple-800",
  Legendary: "bg-orange-200 text-orange-800",
  Mythic: "bg-pink-200 text-pink-800",
};

export default function TradeMarketplace() {
  const [activeTab, setActiveTab] = useState("weapons");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedRarity, setSelectedRarity] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [showSellDialog, setShowSellDialog] = useState(false);
  const [sellItemDetails, setSellItemDetails] = useState({
    name: "",
    type: "Weapon",
    rarity: "Common",
    price: 100,
    currency: "SUI",
    description: "",
  });
  const [selectedInventoryItem, setSelectedInventoryItem] = useState(null);

  // Filter items based on search query and filters
  const filteredItems =
    marketplaceItems[activeTab]?.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRarity =
        selectedRarity === "all" || item.rarity === selectedRarity;
      const matchesPrice =
        item.price >= priceRange[0] && item.price <= priceRange[1];

      return matchesSearch && matchesRarity && matchesPrice;
    }) || [];

  const handleBuy = (item) => {
    setSelectedItem(item);
    setShowBuyDialog(true);
  };

  const handleSell = (inventoryItem = null) => {
    if (inventoryItem) {
      setSelectedInventoryItem(inventoryItem);
      setSellItemDetails({
        name: inventoryItem.name,
        type: inventoryItem.type,
        rarity: inventoryItem.rarity,
        price: 100,
        currency: "SUI",
        description: "",
      });
    } else {
      setSelectedInventoryItem(null);
      setSellItemDetails({
        name: "",
        type: "Weapon",
        rarity: "Common",
        price: 100,
        currency: "SUI",
        description: "",
      });
    }
    setShowSellDialog(true);
  };

  const completePurchase = () => {
    // Handle purchase logic here
    setShowBuyDialog(false);
    // You would typically update user inventory and balance here
  };

  const completeSale = () => {
    // Handle sale listing logic here
    setShowSellDialog(false);
    // You would typically add the item to marketplace listings here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-indigo-900 text-white p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Gem className="h-6 w-6 text-purple-300" />
            Trade Marketplace
          </h1>
          <p className="text-purple-300 mt-1">
            Buy, sell, and trade your in-game assets
          </p>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <div className="bg-purple-800/50 rounded-lg px-3 py-1.5 flex items-center gap-2">
            <Wallet className="h-4 w-4 text-purple-300" />
            <span className="text-sm font-medium">5,280 SUI</span>
          </div>
          <Button
            variant="outline"
            className="border-purple-500 text-purple-300 hover:bg-purple-800/50 hover:text-white"
            onClick={() => handleSell()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Sell Item
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
            <Input
              placeholder="Search items..."
              className="pl-9 bg-purple-900/50 border-purple-700 text-white placeholder:text-purple-400 focus-visible:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="border-purple-700 text-purple-300 hover:bg-purple-800/50 hover:text-white"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            <ChevronDown
              className={`h-4 w-4 ml-2 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </Button>
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-[180px] bg-purple-900/50 border-purple-700 text-white focus:ring-purple-500">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-purple-900 border-purple-700 text-white">
              <SelectItem
                value="weapons"
                className="focus:bg-purple-800 focus:text-white"
              >
                Weapons
              </SelectItem>
              <SelectItem
                value="armor"
                className="focus:bg-purple-800 focus:text-white"
              >
                Armor
              </SelectItem>
              <SelectItem
                value="accessories"
                className="focus:bg-purple-800 focus:text-white"
              >
                Accessories
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="bg-purple-900/50 rounded-lg p-4 mb-4 border border-purple-700 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm text-purple-300 mb-2 block">
                Price Range
              </Label>
              <div className="flex items-center gap-4">
                <span className="text-xs">{priceRange[0]} SUI</span>
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={3000}
                  step={50}
                  onValueChange={setPriceRange}
                  className="flex-1"
                />
                <span className="text-xs">{priceRange[1]} SUI</span>
              </div>
            </div>
            <div>
              <Label className="text-sm text-purple-300 mb-2 block">
                Rarity
              </Label>
              <Select value={selectedRarity} onValueChange={setSelectedRarity}>
                <SelectTrigger className="bg-purple-900/50 border-purple-700 text-white focus:ring-purple-500">
                  <SelectValue placeholder="All Rarities" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-purple-700 text-white">
                  <SelectItem
                    value="all"
                    className="focus:bg-purple-800 focus:text-white"
                  >
                    All Rarities
                  </SelectItem>
                  <SelectItem
                    value="Common"
                    className="focus:bg-purple-800 focus:text-white"
                  >
                    Common
                  </SelectItem>
                  <SelectItem
                    value="Uncommon"
                    className="focus:bg-purple-800 focus:text-white"
                  >
                    Uncommon
                  </SelectItem>
                  <SelectItem
                    value="Rare"
                    className="focus:bg-purple-800 focus:text-white"
                  >
                    Rare
                  </SelectItem>
                  <SelectItem
                    value="Epic"
                    className="focus:bg-purple-800 focus:text-white"
                  >
                    Epic
                  </SelectItem>
                  <SelectItem
                    value="Legendary"
                    className="focus:bg-purple-800 focus:text-white"
                  >
                    Legendary
                  </SelectItem>
                  <SelectItem
                    value="Mythic"
                    className="focus:bg-purple-800 focus:text-white"
                  >
                    Mythic
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-purple-300 mb-2 block">
                Sort By
              </Label>
              <Select defaultValue="price-asc">
                <SelectTrigger className="bg-purple-900/50 border-purple-700 text-white focus:ring-purple-500">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-purple-700 text-white">
                  <SelectItem
                    value="price-asc"
                    className="focus:bg-purple-800 focus:text-white"
                  >
                    Price: Low to High
                  </SelectItem>
                  <SelectItem
                    value="price-desc"
                    className="focus:bg-purple-800 focus:text-white"
                  >
                    Price: High to Low
                  </SelectItem>
                  <SelectItem
                    value="rarity"
                    className="focus:bg-purple-800 focus:text-white"
                  >
                    Rarity
                  </SelectItem>
                  <SelectItem
                    value="newest"
                    className="focus:bg-purple-800 focus:text-white"
                  >
                    Newest
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Marketplace Items */}
        <div className="lg:col-span-2">
          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="bg-purple-900/50 border border-purple-700 mb-4 w-full grid grid-cols-4">
              <TabsTrigger
                value="weapons"
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
              >
                <Sword className="h-4 w-4 mr-2" />
                Weapons
              </TabsTrigger>
              <TabsTrigger
                value="armor"
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
              >
                <Shield className="h-4 w-4 mr-2" />
                Armor
              </TabsTrigger>
              <TabsTrigger
                value="accessories"
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
              >
                <Crown className="h-4 w-4 mr-2" />
                Accessories
              </TabsTrigger>
            </TabsList>

            {Object.keys(marketplaceItems).map((category) => (
              <TabsContent key={category} value={category} className="m-0">
                {filteredItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredItems.map((item) => (
                      <Card
                        key={item.id}
                        className="bg-purple-900/40 border-purple-700 overflow-hidden"
                      >
                        <div className="relative flex justify-center items-center">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className=" h-40 object-cover"
                          />
                          <Badge
                            className={`absolute top-2 right-2 ${
                              rarityColors[item.rarity]
                            }`}
                          >
                            {item.rarity}
                          </Badge>
                        </div>
                        <CardHeader className="p-3 pb-0">
                          <CardTitle className="text-lg flex items-center justify-between">
                            <span className="truncate">{item.name}</span>
                          </CardTitle>
                          <CardDescription className="text-purple-300 flex items-center gap-1">
                            {item.type}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-3 pt-2">
                          <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                            {Object.entries(item.stats).map(([stat, value]) => (
                              <div
                                key={stat}
                                className="flex items-center justify-between bg-purple-950/50 rounded p-1.5"
                              >
                                <span className="capitalize text-purple-300">
                                  {stat}:
                                </span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-sm mt-2">
                            <div className="flex items-center gap-1 text-purple-300">
                              <span>Seller:</span>
                              <span className="font-medium text-white">
                                {item.seller}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 font-bold text-yellow-400">
                              <Coins className="h-3.5 w-3.5" />
                              {item.price} {item.currency}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-3 pt-0 flex gap-2">
                          <Button
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                            onClick={() => handleBuy(item)}
                          >
                            Buy Now
                          </Button>
                          <Button
                            variant="outline"
                            className="border-purple-600 text-purple-300 hover:bg-purple-800 hover:text-white"
                          >
                            <Repeat className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <Search className="h-12 w-12 text-purple-500 opacity-50" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No items found</h3>
                    <p className="text-purple-300 text-sm">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* User Inventory */}
          <Card className="bg-purple-900/40 border-purple-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Your Inventory</span>
                <Badge
                  variant="outline"
                  className="font-normal text-xs border-purple-500 text-purple-300"
                >
                  {userInventory.length} Items
                </Badge>
              </CardTitle>
              <CardDescription className="text-purple-300">
                Items you can sell or trade
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[220px]">
                <div className="p-3 space-y-2">
                  {userInventory.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-purple-950/50 rounded-lg p-2 hover:bg-purple-800/30 transition-colors cursor-pointer"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm truncate">
                            {item.name}
                          </h4>
                          <Badge
                            className={`${rarityColors[item.rarity]} text-xs`}
                          >
                            {item.rarity}
                          </Badge>
                        </div>
                        <p className="text-xs text-purple-300">{item.type}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-purple-300 hover:text-white hover:bg-purple-700"
                        onClick={() => handleSell(item)}
                      >
                        <Upload className="h-4 w-4" />
                        <span className="sr-only">Sell</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="pt-2">
              <Button
                variant="outline"
                className="w-full border-purple-600 text-purple-300 hover:bg-purple-800 hover:text-white"
                onClick={() => handleSell()}
              >
                <Plus className="h-4 w-4 mr-2" />
                List New Item
              </Button>
            </CardFooter>
          </Card>

          {/* Recent Transactions */}
          <Card className="bg-purple-900/40 border-purple-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Transactions</CardTitle>
              <CardDescription className="text-purple-300">
                Latest marketplace activity
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[200px]">
                <div className="p-3 space-y-3">
                  {recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="bg-purple-950/50 rounded-lg p-3 text-sm"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium truncate">{tx.item}</span>
                        <Badge
                          variant="outline"
                          className="text-xs border-purple-500 text-purple-300"
                        >
                          {tx.time}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="text-purple-300">
                          <span>{tx.buyer}</span>
                          <span className="mx-1">from</span>
                          <span>{tx.seller}</span>
                        </div>
                        <div className="font-medium text-yellow-400 flex items-center">
                          <Coins className="h-3 w-3 mr-1" />
                          {tx.price} {tx.currency}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Market Stats */}
          <Card className="bg-purple-900/40 border-purple-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Market Stats</CardTitle>
              <CardDescription className="text-purple-300">
                Trading activity overview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-purple-300">
                    Total Volume (24h)
                  </span>
                  <span className="font-bold">24,580 SUI</span>
                </div>
                <Separator className="bg-purple-700/50" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-purple-300">
                    Active Listings
                  </span>
                  <span className="font-bold">1,245</span>
                </div>
                <Separator className="bg-purple-700/50" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-purple-300">
                    Avg. Item Price
                  </span>
                  <span className="font-bold">780 SUI</span>
                </div>
                <Separator className="bg-purple-700/50" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-purple-300">Highest Sale</span>
                  <div className="flex items-center">
                    <Sparkles className="h-3.5 w-3.5 text-yellow-400 mr-1" />
                    <span className="font-bold">5,200 SUI</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Buy Dialog */}
      <Dialog open={showBuyDialog} onOpenChange={setShowBuyDialog}>
        <DialogContent className="bg-purple-900 border-purple-700 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Buy Item</DialogTitle>
            <DialogDescription className="text-purple-300">
              Confirm your purchase details
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={selectedItem.image || "/placeholder.svg"}
                    alt={selectedItem.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <Badge
                    className={`absolute -top-2 -right-2 ${
                      rarityColors[selectedItem.rarity]
                    }`}
                  >
                    {selectedItem.rarity}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{selectedItem.name}</h3>
                  <p className="text-purple-300 text-sm">{selectedItem.type}</p>
                  <div className="flex items-center gap-1 mt-1 text-yellow-400 font-bold">
                    <Coins className="h-4 w-4" />
                    {selectedItem.price} {selectedItem.currency}
                  </div>
                </div>
              </div>

              <Separator className="bg-purple-700" />

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-purple-300">Item Price</span>
                  <span>
                    {selectedItem.price} {selectedItem.currency}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300">Transaction Fee (2%)</span>
                  <span>
                    {Math.round(selectedItem.price * 0.02)}{" "}
                    {selectedItem.currency}
                  </span>
                </div>
                <Separator className="bg-purple-700" />
                <div className="flex justify-between items-center font-bold">
                  <span>Total</span>
                  <span>
                    {selectedItem.price + Math.round(selectedItem.price * 0.02)}{" "}
                    {selectedItem.currency}
                  </span>
                </div>
              </div>

              <div className="bg-purple-950/70 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-purple-300" />
                  <div>
                    <p className="text-sm">Your Balance</p>
                    <p className="font-bold">5,280 SUI</p>
                  </div>
                </div>
                <Badge className="bg-green-600">Sufficient Funds</Badge>
              </div>
            </div>
          )}

          <DialogFooter className="sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setShowBuyDialog(false)}
              className="border-purple-600 text-purple-300 hover:bg-purple-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={completePurchase}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sell Dialog */}
      <Dialog open={showSellDialog} onOpenChange={setShowSellDialog}>
        <DialogContent className="bg-purple-900 border-purple-700 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>List Item for Sale</DialogTitle>
            <DialogDescription className="text-purple-300">
              {selectedInventoryItem
                ? "Set your price and details"
                : "Upload a new item to sell"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedInventoryItem && (
              <div className="flex items-center gap-4">
                <img
                  src={selectedInventoryItem.image || "/placeholder.svg"}
                  alt={selectedInventoryItem.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-bold">{selectedInventoryItem.name}</h3>
                  <Badge
                    className={`${rarityColors[selectedInventoryItem.rarity]}`}
                  >
                    {selectedInventoryItem.rarity}
                  </Badge>
                </div>
              </div>
            )}

            {!selectedInventoryItem && (
              <div className="space-y-3">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="item-name">Item Name</Label>
                  <Input
                    id="item-name"
                    value={sellItemDetails.name}
                    onChange={(e) =>
                      setSellItemDetails({
                        ...sellItemDetails,
                        name: e.target.value,
                      })
                    }
                    className="bg-purple-950/50 border-purple-700 focus-visible:ring-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="item-type">Type</Label>
                    <Select
                      value={sellItemDetails.type}
                      onValueChange={(value) =>
                        setSellItemDetails({ ...sellItemDetails, type: value })
                      }
                    >
                      <SelectTrigger className="bg-purple-950/50 border-purple-700 focus:ring-purple-500">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-purple-900 border-purple-700 text-white">
                        <SelectItem value="Weapon">Weapon</SelectItem>
                        <SelectItem value="Armor">Armor</SelectItem>
                        <SelectItem value="Accessory">Accessory</SelectItem>
                        <SelectItem value="Skin">Skin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="item-rarity">Rarity</Label>
                    <Select
                      value={sellItemDetails.rarity}
                      onValueChange={(value) =>
                        setSellItemDetails({
                          ...sellItemDetails,
                          rarity: value,
                        })
                      }
                    >
                      <SelectTrigger className="bg-purple-950/50 border-purple-700 focus:ring-purple-500">
                        <SelectValue placeholder="Select rarity" />
                      </SelectTrigger>
                      <SelectContent className="bg-purple-900 border-purple-700 text-white">
                        <SelectItem value="Common">Common</SelectItem>
                        <SelectItem value="Uncommon">Uncommon</SelectItem>
                        <SelectItem value="Rare">Rare</SelectItem>
                        <SelectItem value="Epic">Epic</SelectItem>
                        <SelectItem value="Legendary">Legendary</SelectItem>
                        <SelectItem value="Mythic">Mythic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="item-image">Item Image</Label>
                  <div className="border-2 border-dashed border-purple-700 rounded-lg p-6 text-center hover:bg-purple-950/30 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                    <p className="text-sm text-purple-300">
                      Click or drag to upload image
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="item-price">Price</Label>
                  <Input
                    id="item-price"
                    type="number"
                    value={sellItemDetails.price}
                    onChange={(e) =>
                      setSellItemDetails({
                        ...sellItemDetails,
                        price: Number.parseInt(e.target.value),
                      })
                    }
                    className="bg-purple-950/50 border-purple-700 focus-visible:ring-purple-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="item-currency">Currency</Label>
                  <Select
                    value={sellItemDetails.currency}
                    onValueChange={(value) =>
                      setSellItemDetails({
                        ...sellItemDetails,
                        currency: value,
                      })
                    }
                  >
                    <SelectTrigger className="bg-purple-950/50 border-purple-700 focus:ring-purple-500">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent className="bg-purple-900 border-purple-700 text-white">
                      <SelectItem value="SUI">SUI Coins</SelectItem>
                      <SelectItem value="GOLD">In-game Gold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="item-description">Description (Optional)</Label>
                <Input
                  id="item-description"
                  value={sellItemDetails.description}
                  onChange={(e) =>
                    setSellItemDetails({
                      ...sellItemDetails,
                      description: e.target.value,
                    })
                  }
                  className="bg-purple-950/50 border-purple-700 focus-visible:ring-purple-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="instant-sale" />
                <Label htmlFor="instant-sale">
                  Allow instant sale at listed price
                </Label>
              </div>
            </div>

            <div className="bg-purple-950/70 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-purple-300">Marketplace Fee (5%)</span>
                <span>
                  {Math.round(sellItemDetails.price * 0.05)}{" "}
                  {sellItemDetails.currency}
                </span>
              </div>
              <div className="flex justify-between items-center font-bold">
                <span>You'll Receive</span>
                <span>
                  {sellItemDetails.price -
                    Math.round(sellItemDetails.price * 0.05)}{" "}
                  {sellItemDetails.currency}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setShowSellDialog(false)}
              className="border-purple-600 text-purple-300 hover:bg-purple-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={completeSale}
              className="bg-purple-600 hover:bg-purple-700"
            >
              List for Sale
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

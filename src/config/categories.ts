import { 
  CastleIcon, 
  MountainIcon, 
  SunIcon, 
  SpecialIcon, 
  DefaultIcon 
} from "@/public/icons/icons";

// Mapovanie kategórií s ikonami a farbami
export const categoryConfig = {
  5: {
    name: "Hrady,zámky a zrúcaniny",
    icon: CastleIcon,
    color: "#dc2626", // tmavočervená
    description: "Ideálne na prechádzky či turistiky s krásnymi výhľadmi"
  },
  6: {
    name: "Prírodné výhľady",
    icon: MountainIcon,
    color: "#059669", // zelená
    description: "Kopce, rozhladne či iba pekné miesta na nádherné výhľady"
  },
  4: {
    name: "Miesta na západy slnka",
    icon: SunIcon,
    color: "#f59e0b", // žltá
    description: "Miesta ideálne na západy slnka"
  },
  7: {
    name: "Špeciálne",
    icon: SpecialIcon,
    color: "#8b5cf6", // fialová
    description: "Výnimočné miesta mimo hlavných kategórií"
  }
} as const;

// Fallback pre neznáme kategórie
export const defaultCategory = {
  name: "Iné",
  icon: DefaultIcon,
  color: "#6b7280", // sivá
  description: "Ostatné miesta"
};

// Helper funkcia na získanie konfigurácie kategórie
export function getCategoryConfig(categoryId?: number | null) {
  if (!categoryId || !(categoryId in categoryConfig)) {
    return defaultCategory;
  }
  return categoryConfig[categoryId as keyof typeof categoryConfig];
}

// Type pre ID kategórií
export type CategoryId = keyof typeof categoryConfig;

// Export všetkých ID kategórií
export const availableCategoryIds = Object.keys(categoryConfig).map(Number) as CategoryId[];

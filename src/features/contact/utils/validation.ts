export const PLATFORM_KEYS = ["android", "kmp", "cmp", "flutter", "notsure"] as const;
export const BUDGET_KEYS = ["under10k", "10k_30k", "30k_75k", "over75k"] as const;

export type PlatformKey = typeof PLATFORM_KEYS[number];
export type BudgetKey = typeof BUDGET_KEYS[number];
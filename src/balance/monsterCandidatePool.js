export const TUTORIAL_MONSTER_POOL_VERSION = "v2.3-candidate-pool-v1";

export const TUTORIAL_MONSTER_POOL_REGIONS = Object.freeze([
  {
    regionId: "tutorial_shore",
    representativeMonsterId: "shore_imp",
    monsterIds: ["shore_imp", "shore_claw_crab", "shore_drift_slime"],
  },
  {
    regionId: "tutorial_forest",
    representativeMonsterId: "forest_wolf",
    monsterIds: ["forest_wolf", "forest_goblin_scout", "forest_alpha_wolf"],
  },
  {
    regionId: "broken_ruins",
    representativeMonsterId: "ruin_sentinel",
    monsterIds: ["ruin_sentinel", "ruin_rune_doll"],
  },
  {
    regionId: "mana_mine",
    representativeMonsterId: "mine_golem",
    monsterIds: ["mine_crystal_bug", "mine_golem", "mine_core_golem"],
  },
  {
    regionId: "rift_gate",
    representativeMonsterId: "rift_knight",
    bossMonsterId: "rift_warden",
    monsterIds: ["rift_squire", "rift_shieldbearer", "rift_knight", "rift_warden"],
  },
]);

export const TUTORIAL_MONSTER_POOL_DATA = Object.freeze([
  candidateMonster("shore_imp", "tutorial_shore", 1, { STR: 1, AGI: 2, VIT: 2, INT: 0, WIS: 0, LUK: 0 }, ["basic"], "shore_imp"),
  candidateMonster("shore_claw_crab", "tutorial_shore", 1, { STR: 2, AGI: 1, VIT: 3, INT: 0, WIS: 0, LUK: 0 }, ["defense", "shell"], "shore_imp"),
  candidateMonster("shore_drift_slime", "tutorial_shore", 2, { STR: 1, AGI: 1, VIT: 3, INT: 2, WIS: 1, LUK: 0 }, ["slime", "magic_weak"], "shore_imp"),
  candidateMonster("forest_wolf", "tutorial_forest", 2, { STR: 4, AGI: 6, VIT: 4, INT: 0, WIS: 1, LUK: 1 }, ["agile"], "forest_wolf"),
  candidateMonster("forest_goblin_scout", "tutorial_forest", 3, { STR: 4, AGI: 4, VIT: 4, INT: 1, WIS: 1, LUK: 1 }, ["pack", "smart"], "forest_wolf"),
  candidateMonster("forest_alpha_wolf", "tutorial_forest", 4, { STR: 7, AGI: 9, VIT: 7, INT: 0, WIS: 2, LUK: 2 }, ["elite", "agile", "bleed"], "forest_wolf"),
  candidateMonster("ruin_sentinel", "broken_ruins", 4, { STR: 8, AGI: 3, VIT: 11, INT: 1, WIS: 3, LUK: 1 }, ["defense", "machine"], "ruin_sentinel"),
  candidateMonster("ruin_rune_doll", "broken_ruins", 5, { STR: 4, AGI: 5, VIT: 7, INT: 6, WIS: 5, LUK: 1 }, ["magic", "rune"], "ruin_sentinel"),
  candidateMonster("mine_crystal_bug", "mana_mine", 5, { STR: 5, AGI: 4, VIT: 8, INT: 2, WIS: 3, LUK: 2 }, ["pack", "material"], "mine_golem"),
  candidateMonster("mine_golem", "mana_mine", 6, { STR: 11, AGI: 3, VIT: 18, INT: 2, WIS: 5, LUK: 1 }, ["defense", "core_weak"], "mine_golem"),
  candidateMonster("mine_core_golem", "mana_mine", 7, { STR: 14, AGI: 4, VIT: 24, INT: 3, WIS: 6, LUK: 1 }, ["elite", "defense", "core_weak"], "mine_golem"),
  candidateMonster("rift_squire", "rift_gate", 7, { STR: 15, AGI: 9, VIT: 17, INT: 3, WIS: 6, LUK: 2 }, ["rift"], "rift_knight"),
  candidateMonster("rift_shieldbearer", "rift_gate", 8, { STR: 17, AGI: 6, VIT: 25, INT: 4, WIS: 8, LUK: 2 }, ["defense", "shield"], "rift_knight"),
  candidateMonster("rift_knight", "rift_gate", 9, { STR: 22, AGI: 12, VIT: 27, INT: 5, WIS: 10, LUK: 3 }, ["elite", "knight"], "rift_knight"),
  candidateMonster("rift_warden", "rift_gate", 10, { STR: 28, AGI: 14, VIT: 44, INT: 8, WIS: 14, LUK: 4 }, ["boss", "damage_check", "defense", "rule"], "rift_knight", true),
]);

export const TUTORIAL_MONSTER_REWARD_LINKS = Object.freeze([
  rewardLink("shore_imp", "imp_codex_fragment", ["low_mana_crystal_fragment"], ["power_slash_skill_fragment"]),
  rewardLink("shore_claw_crab", "shore_claw_crab_codex_fragment", ["low_mana_crystal_fragment"], []),
  rewardLink("shore_drift_slime", "shore_drift_slime_codex_fragment", ["low_mana_crystal_fragment"], ["mana_ignite_skill_rune"]),
  rewardLink("forest_wolf", "forest_wolf_codex_fragment", [], ["quick_step_skill_fragment"]),
  rewardLink("forest_goblin_scout", "forest_goblin_scout_codex_fragment", [], ["power_slash_skill_fragment"]),
  rewardLink("forest_alpha_wolf", "forest_alpha_wolf_codex_fragment", ["unstable_mana_crystal_fragment"], ["quick_step_skill_fragment"]),
  rewardLink("ruin_sentinel", "ruin_sentinel_codex_fragment", [], ["guard_stance_skill_rune"]),
  rewardLink("ruin_rune_doll", "ruin_rune_doll_codex_fragment", ["unstable_mana_crystal_fragment"], ["mana_bolt_skill_rune"]),
  rewardLink("mine_crystal_bug", "mine_crystal_bug_codex_fragment", ["mine_core_mana_crystal_fragment"], []),
  rewardLink("mine_golem", "mine_golem_codex_fragment", ["low_mana_crystal_fragment", "unstable_mana_crystal_fragment"], []),
  rewardLink("mine_core_golem", "mine_core_golem_codex_fragment", ["mine_core_mana_crystal_fragment"], ["guard_stance_skill_rune"]),
  rewardLink("rift_squire", "rift_squire_codex_fragment", ["rift_mana_crystal_fragment"], ["power_slash_skill_fragment"]),
  rewardLink("rift_shieldbearer", "rift_shieldbearer_codex_fragment", ["rift_mana_crystal_fragment"], ["guard_stance_skill_rune"]),
  rewardLink("rift_knight", "rift_knight_codex_fragment", ["rift_mana_crystal_fragment"], ["mana_bolt_skill_rune"]),
  rewardLink("rift_warden", "rift_warden_codex_fragment", ["rift_mana_crystal_fragment"], ["mana_ignite_skill_rune"]),
]);

export function candidateMonsterRewardLinkFor(monsterId) {
  return TUTORIAL_MONSTER_REWARD_LINKS.find((entry) => entry.monsterId === monsterId) || null;
}

function candidateMonster(id, regionId, level, stats, tags, representativeMonsterId, isBoss = false) {
  return {
    id,
    regionId,
    level,
    stats,
    tags,
    representativeMonsterId,
    isBoss,
  };
}

function rewardLink(monsterId, codexFragmentId, materialItemIds, skillItemIds) {
  return {
    monsterId,
    codexFragmentId,
    materialItemIds,
    skillItemIds,
  };
}


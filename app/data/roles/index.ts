import type { RoleData } from './types';
import { vercelUiEngineer } from './vercel/ui-engineer';
import { ashbyStaffProductEngineer } from './ashby/staff-product-engineer';
import { ashbySeniorProductEngineer } from './ashby/senior-product-engineer';
import { grafanaLabsSeniorAiEngineer } from './grafana-labs/senior-ai-engineer';
import { extendSeniorAiSoftwareEngineer } from './extend/senior-ai-software-engineer';
import { tailscaleFullStackSoftwareEngineer } from './tailscale/full-stack-software-engineer';
import { prairieLearnFullStackSoftwareEngineer } from './prairielearn/full-stack-software-engineer';
import { rapidsosSeniorSoftwareEngineerAiOperations } from './rapidsos/senior-software-engineer-ai-operations';

/**
 * Registry of all role data objects.
 * Key format: "company/role" matching the URL slug segments.
 * Add a new import and entry here when a new role file is authored.
 */
const roleList: RoleData[] = [
  vercelUiEngineer,
  ashbyStaffProductEngineer,
  ashbySeniorProductEngineer,
  grafanaLabsSeniorAiEngineer,
  extendSeniorAiSoftwareEngineer,
  tailscaleFullStackSoftwareEngineer,
  prairieLearnFullStackSoftwareEngineer,
  rapidsosSeniorSoftwareEngineerAiOperations,
];

export const ROLES: Record<string, RoleData> = Object.fromEntries(
  roleList.map((r) => [`${r.company}/${r.role}`, r])
);

/** Returns params array for generateStaticParams */
export function getAllRoleSlugs(): { company: string; role: string }[] {
  return roleList.map((r) => ({ company: r.company, role: r.role }));
}

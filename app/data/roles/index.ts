import type { RoleData } from './types';

/**
 * Registry of all role data objects.
 * Key format: "company/role" matching the URL slug segments.
 * Add a new import and entry here when a new role file is authored.
 */
const roleList: RoleData[] = [];

export const ROLES: Record<string, RoleData> = Object.fromEntries(
  roleList.map((r) => [`${r.company}/${r.role}`, r])
);

/** Returns params array for generateStaticParams */
export function getAllRoleSlugs(): { company: string; role: string }[] {
  return roleList.map((r) => ({ company: r.company, role: r.role }));
}

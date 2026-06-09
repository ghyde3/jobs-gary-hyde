export interface RequirementProof {
  requirement: string;
  proof: string;
}

export interface CuratedProject {
  /** Must match a `title` field in `PROJECTS` from profile.ts */
  projectTitle: string;
  /** Optional one-liner that replaces the project `sub` field on this role page */
  framing?: string;
}

export interface RoleArtifacts {
  /** URL path served from public/, e.g. "/roles/vercel/ui-engineer/resume.pdf" */
  resumePdf: string;
  /** URL path served from public/, e.g. "/roles/vercel/ui-engineer/cover-letter.pdf" */
  coverLetterPdf: string;
}

export interface RoleData {
  /** URL slug segment, lowercase-hyphenated, e.g. "vercel" */
  company: string;
  /** URL slug segment, lowercase-hyphenated, e.g. "ui-engineer" */
  role: string;
  /** Display string, proper casing, e.g. "Vercel" */
  companyName: string;
  /** Display string, proper casing, e.g. "UI Engineer" */
  roleTitle: string;
  /** Optional page <title>. Defaults to "{roleTitle} at {companyName} - Gary Hyde" */
  seoTitle?: string;
  /** Optional meta description */
  seoDescription?: string;
  hero: {
    /** Role-tailored one-line hook displayed as the hero headline */
    headline: string;
    /** Supporting line displayed beneath the headline */
    subhead: string;
  };
  /** Short first-person paragraph naming the company and role. No em-dashes. */
  note: string;
  /**
   * Ordered list of requirement-to-proof pairs. Author 3 to 6 pairs.
   * requirement: lifted or paraphrased from the job post.
   * proof: concrete evidence from Gary's background.
   */
  requirements: RequirementProof[];
  /**
   * Ordered list referencing existing PROJECTS by title.
   * Omit entirely to use the homepage default ordering.
   * Pass an explicit empty array [] to hide projects and lean on requirements.
   */
  projects?: CuratedProject[];
  /**
   * Optional line foregrounding shipping volume.
   * Use when the curated-project pool is thin for the role.
   */
  breadthNote?: string;
  artifacts: RoleArtifacts;
  /**
   * Override the shared booking URL for this role. Rarely needed.
   * Defaults to the BOOKING_URL constant from app/lib/constants.ts.
   */
  bookingUrl?: string;
}

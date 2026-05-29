

import { z } from 'zod'

// ── REGISTER ──────────────────────────────────────────
export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Le nom doit contenir au moins 2 caractères'),

    email: z
      .string()
      .email('Adresse email invalide'),

    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),

    confirmPassword: z
      .string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Les mots de passe ne correspondent pas',
    }
  )

// Type inféré automatiquement depuis le schéma
export type RegisterFormData = z.infer<typeof registerSchema>

// ── LOGIN ─────────────────────────────────────────────
export const loginSchema = z.object({
  email: z
    .string()
    .email('Adresse email invalide'),

  password: z
    .string()
    .min(1, 'Le mot de passe est obligatoire'),
})

export type LoginFormData = z.infer<typeof loginSchema>
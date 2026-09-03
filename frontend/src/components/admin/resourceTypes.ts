import type { ReactNode } from 'react';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'switch'
  | 'select'
  | 'date'
  | 'image'
  | 'video'
  | 'tags'
  | 'checkbox_group'
  | 'richtext';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  colSpan?: 1 | 2;
  min?: number;
  max?: number;
  options?: SelectOption[];
  /** Pull select options from another endpoint, mapping {id -> name}. */
  optionsEndpoint?: string;
  optionLabelKey?: string;
  defaultValue?: unknown;
}

export type ColumnType = 'text' | 'image' | 'badge' | 'date' | 'price' | 'boolean' | 'rating' | 'custom';

export interface ColumnConfig<T = Record<string, unknown>> {
  key: string;
  label: string;
  type?: ColumnType;
  /** Label pair for boolean columns: [truthy, falsy]. */
  booleanLabels?: [string, string];
  render?: (row: T) => ReactNode;
  className?: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  options: SelectOption[];
}

export interface ResourceConfig<T = Record<string, unknown>> {
  key: string;
  endpoint: string;
  label: string;
  labelSingular: string;
  description?: string;
  formMode?: 'modal' | 'page';
  columns: ColumnConfig<T>[];
  fields: FieldConfig[];
  searchable?: boolean;
  filters?: FilterConfig[];
  sortOptions?: SelectOption[];
  defaultSort?: { sortBy: string; sortOrder: 'asc' | 'desc' };
  /** Single-record config resource (Profil, Kontak) — renders a form only. */
  singleton?: boolean;
  /** Disable create (e.g. Reservasi, Newsletter). */
  disableCreate?: boolean;
  /** Disable edit (e.g. Newsletter, Reservasi). */
  disableEdit?: boolean;
}

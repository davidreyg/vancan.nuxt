export interface Mascota {
  id: number;
  url: string;
  propietario: string;
  nombre: string;
  sexo: number;
  color: string;
  raza: string;
  alimentacion?: string;
  hobbies?: string;
  perdido: boolean;
  created_at: string;
  updated_at: string;
  sexo_nombre: string;
  propietario_object: Propietario;
  establecimiento: string;
  codigo: string;
  establecimiento_object: Establecimiento;
  foto?: string;
  ris_nombre: string;
  ris_id: number;
  creacion_fecha: string;
  creacion_hora: string;
  usuario_nombre: string;
  get_edad: string;
  dosis_lista: Dosis[];
}

export interface Propietario {
  url: string;
  id: number;
  tipo_documento: number;
  numero_documento: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono: string;
  direccion: string;
  created_at: string;
  updated_at: string;
  nombre_completo: string;
  tipo_documento_nombre: string;
  ris: number;
  usuario: string;
  usuario_logeo?: string;
}

export interface Establecimiento {
  url: string;
  id: number;
  nombre: string;
  codigo: string;
  categoria: number;
  ris: number;
}

export interface Dosis {
  id: number;
  url: string;
  mascota: string;
  edad: number;
  fecha: string;
  vacuna: string;
  dosis: number;
  establecimiento: string;
  created_at: string;
  updated_at: string;
  fecha_format: string;
  vacuna_object: Vacuna;
  establecimiento_object: Establecimiento;
  ris_nombre: string;
  ris_id: number;
  creacion_fecha: string;
  creacion_hora: string;
  usuario_nombre: string;
}

export interface Vacuna {
  url: string;
  id: number;
  nombre: string;
  lote: string;
  created_at: string;
  updated_at: string;
}

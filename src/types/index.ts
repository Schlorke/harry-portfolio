export interface Project {
  name: string
  description: string
  image: string
  video?: string
  url: string
  skills: string[]
}

export interface Service {
  name: string
  description: string
  icon: string
}

export interface Experience {
  company: string
  profession: string
  date: string
  description: string
}

export interface SocialLink {
  url: string
  icon: string
  label: string
}

export interface NavLink {
  href: string
  label: string
}


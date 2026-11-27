export type TuitionType = {
  _id: string
  title: string
  subject: string
  classLevel: string
  mode: "Online" | "Offline"
  location: string
  monthlyFee: number
  daysPerWeek: number
  bannerImage: string
  description: string
  tutorName: string
  tutorEmail: string
  approvalStatus: "pending" | "approved" | "rejected"
  isActive: boolean
  createdAt?: string
  tutor?: {
    name: string
    email: string
    image?: string
    plan?: string
  }
}
export type TutorType = {
  name: string
  email: string
  image: string
  plan: string
}

export type TuitionDetailType = {
  id: string
  title: string
  subject: string
  classLevel: string
  mode: string
  location: string
  monthlyFee: number
  daysPerWeek: number
  description: string
  bannerImage: string
  tutorName: string
  tutorEmail: string
  createdAt?: string
  tutor: {
    name: string
    email: string
    image?: string
    plan?: string
  }
}

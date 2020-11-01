export const paths = {
  course: (id?: string): string => (id ? `/course/${id}` : '/course/:id'),
  courses: '/courses',
  error: (code?: number): string => (code ? `/error/${code}` : '/error/:code'),
  landing: '/',
  login: '/login',
  privacy: '/privacy',
  recent: '/recent',
  register: '/register',
  resetPassword: '/reset-password',
  review: {
    create: '/review',
    update: (id?: string): string => (id ? `/review/${id}` : '/review/:id'),
  },
  reviews: (query?: string): string =>
    query ? `/reviews?query=${encodeURIComponent(query)}` : '/reviews',
  setPassword: '/set-password',
  terms: '/terms',
  userProfile: '/user/profile',
  userReviews: '/user/reviews',
};

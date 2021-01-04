export interface TestReview {
  course_id: string;
  semester_id: string;
  difficulty: string;
  workload: string;
  rating: string;
}

export const testReview1: TestReview = {
  course_id: 'CS-6400',
  semester_id: 'Fall 2019',
  difficulty: 'Medium',
  workload: '10',
  rating: 'Liked',
};

export const testReview2: TestReview = {
  course_id: 'CS-6440',
  semester_id: 'Spring 2020',
  difficulty: 'Hard',
  workload: '20',
  rating: 'Strongly Liked',
};

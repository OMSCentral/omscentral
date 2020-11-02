import React, { useContext } from 'react';
import { useHistory } from 'react-router';

import {
  useCoursesQuery,
  useSemestersQuery,
  useInsertReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  ReviewInputType,
  ReviewQuery,
} from 'src/graphql';
import { paths } from 'src/constants';
import { FirebaseContext } from '../Firebase';
import { NotificationContext } from '../Notification';
import { AuthContext } from '../Auth';
import ReviewForm from './ReviewForm';

interface Props {
  review?: ReviewQuery['review'];
}

const ReviewFormContainer: React.FC<Props> = ({ review }) => {
  const firebase = useContext(FirebaseContext);
  const notification = useContext(NotificationContext)!;
  const history = useHistory();
  const auth = useContext(AuthContext);

  const mode = !review
    ? 'make'
    : auth.user?.uid === review.author?.id
    ? 'edit'
    : 'view';

  const [courses, semesters] = [useCoursesQuery(), useSemestersQuery()];

  const [
    [insert, { loading: creating }],
    [update, { loading: updating }],
    [remove, { loading: removing }],
  ] = [
    useInsertReviewMutation(),
    useUpdateReviewMutation(),
    useDeleteReviewMutation(),
  ];

  const handleSubmit = async (review: ReviewInputType) => {
    try {
      const author_id = auth.user!.uid;
      if (mode === 'make') {
        const result = await insert({
          variables: {
            review: {
              ...review,
              author_id,
            },
          },
        });

        firebase.analytics.logEvent('create_item', {
          content_type: 'review',
          content_id: result.data!.insertReview.id,
        });

        notification.success('Review published.');

        history.push(paths.course(review.course_id));
      } else if (mode === 'edit') {
        await update({ variables: { review: { ...review, author_id } } });

        firebase.analytics.logEvent('update_item', {
          content_type: 'review',
          content_id: review!.id,
        });

        notification.success('Review updated.');

        history.push(paths.course(review.course_id));
      }
    } catch {
      notification.error('Something went wrong.');
    }
  };

  const handleDelete = async () => {
    try {
      await remove({ variables: { id: review!.id } });

      firebase.analytics.logEvent('delete_item', {
        content_type: 'review',
        content_id: review!.id,
      });

      notification.success('Review deleted.');

      history.replace(paths.course(review!.course.id));
    } catch {
      notification.error('Something went wrong.');
    }
  };

  if (!courses.data?.courses || !semesters.data?.semesters) {
    return null;
  }

  return (
    <ReviewForm
      data={{ ...courses.data, ...semesters.data }}
      mode={mode}
      review={review}
      disabled={creating || updating || removing}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
    />
  );
};

export default ReviewFormContainer;

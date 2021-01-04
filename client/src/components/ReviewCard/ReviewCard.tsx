import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import CopyToClipboard from 'react-copy-to-clipboard';
import Markdown from 'react-markdown';
import { Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip, { ChipProps } from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { reviewMeta, paths } from 'src/constants';
import { ReviewsQuery } from 'src/graphql';
import Season from 'src/core/components/Season';
import { AuthContext } from '../Auth';
import Grow from '../Grow';
import Link from '../Link';
import applyHighlighting from './utils/applyHighlighting';
import { useStyles } from './ReviewCard.styles';

interface Props {
  review: ReviewsQuery['reviews'][0];
  highlight?: string;
  deepLink: string;
  onDeepLinkCopy: () => void;
}

const ReviewCard: React.FC<Props> = ({
  review: {
    id,
    author,
    course,
    semester,
    difficulty: d,
    workload: w,
    rating: r,
    body,
    created,
  },
  highlight,
  deepLink,
  onDeepLinkCopy,
}) => {
  const classes = useStyles();
  const xs = useMediaQuery<Theme>((theme) => theme.breakpoints.down('xs'));
  const history = useHistory();
  const auth = useContext(AuthContext);

  const avatar = xs ? null : <Season season={semester.season} />;

  const title = xs ? course.id : `${course.id}: ${course.name}`;
  const subheader = new Date(created).toLocaleString();
  const difficulty = d && reviewMeta.translateDifficulty(d);
  const rating = r && reviewMeta.translateRating(r);
  const workload = w && `${w} hrs/wk`;

  const chips: Array<ChipProps & { tooltip: string }> = [
    {
      className: (classes as any)[`difficulty${d}`],
      label: difficulty,
      tooltip: 'Difficulty',
    },
    {
      className: (classes as any)[`rating${r}`],
      label: rating,
      tooltip: 'Rating',
    },
    {
      label: workload,
      tooltip: 'Workload',
    },
  ].filter((chip) => Boolean(chip?.label));
  xs && chips.pop() && chips.pop();

  const handleEditClick = () => history.push(paths.review.update(id));
  const handleDeepLinkCopy = () => setTimeout(onDeepLinkCopy, 0);

  const action = xs ? null : auth.user?.uid === author.id ? (
    <IconButton
      onClick={handleEditClick}
      color="inherit"
      data-cy="review_card_edit_button"
    >
      <EditIcon />
    </IconButton>
  ) : (
    <CopyToClipboard text={deepLink} onCopy={handleDeepLinkCopy}>
      <Tooltip title="Copy link">
        <IconButton color="inherit">
          <LinkIcon />
        </IconButton>
      </Tooltip>
    </CopyToClipboard>
  );

  return (
    <Card className={classes.card} data-cy="review_card">
      <CardHeader
        className={classes.header}
        avatar={avatar}
        title={course.link ? <Link to={course.link}>{title}</Link> : title}
        subheader={subheader}
        action={action}
      />
      <CardContent className={classes.content} data-cy="review_card_content">
        {body ? (
          <Markdown source={applyHighlighting(body, highlight)} />
        ) : (
          <Typography variant="body2" color="textSecondary" component="p">
            No commentary provided.
          </Typography>
        )}
      </CardContent>
      <CardActions className={classes.actions}>
        <Chip
          color="primary"
          data-cy="review_card_semester"
          label={semester.name}
          variant="outlined"
        />
        <Grow />
        {chips.map(({ tooltip, label, ...rest }) => (
          <Tooltip title={tooltip} key={label!.toString()}>
            <Chip
              label={label}
              variant="outlined"
              {...rest}
              data-cy={'review_card_' + tooltip.toLocaleLowerCase()}
            />
          </Tooltip>
        ))}
      </CardActions>
    </Card>
  );
};

export default ReviewCard;

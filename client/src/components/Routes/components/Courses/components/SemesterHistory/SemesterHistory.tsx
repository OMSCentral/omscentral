import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';

import { Nullable } from 'src/core';
import { Semester } from 'src/graphql';
import Season, { SeasonEnum } from 'src/core/components/Season';
import { useStyles } from './SemesterHistory.styles';

const groupBySeasons = (
  history: string[],
  semesters: Semester[],
): Map<SeasonEnum, Semester[]> => {
  const semestersById = semesters.reduce(
    (map, semester) => map.set(semester.id, semester),
    new Map<string, Semester>(),
  );

  return history
    .map((id) => semestersById.get(id))
    .reduce(
      (groups, semester) =>
        semester
          ? groups.set(semester.season, [
              ...(groups.get(semester.season) || []),
              semester,
            ])
          : groups,
      new Map<SeasonEnum, Semester[]>(),
    );
};

const seasonNames: { [key in SeasonEnum]: string } = {
  [SeasonEnum.Spring]: 'Spring',
  [SeasonEnum.Summer]: 'Summer',
  [SeasonEnum.Fall]: 'Fall',
  [SeasonEnum.Unknown]: 'Unknown',
};

interface Props {
  /**
   * Semester IDs for which reviews have been published for the course.
   */
  history: string[];
  /**
   * Full list of semesters.
   */
  semesters: Semester[];
}

const SemesterHistory: React.FC<Props> = ({ history, semesters }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<Nullable<Element>>(null);

  const seasonHistory = groupBySeasons(history, semesters);

  const handlePopoverOpen = (event: React.MouseEvent<Element>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const popoverContent = [
    SeasonEnum.Spring,
    SeasonEnum.Summer,
    SeasonEnum.Fall,
  ].reduce<string[]>((lines, season) => {
    const seasonSemesters = seasonHistory.get(season);
    if (!seasonSemesters?.length) {
      return lines;
    }
    return [
      ...lines,
      seasonNames[season],
      ...seasonSemesters.map(({ name }) => `  ${name}`),
    ];
  }, []);

  return (
    <>
      <Grid
        direction="row"
        container
        alignItems="center"
        justify="center"
        aria-owns={open ? 'semester-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {[SeasonEnum.Spring, SeasonEnum.Summer, SeasonEnum.Fall].map((season) =>
          seasonHistory.get(season)?.length ? (
            <Season
              className={classes.season}
              key={season}
              season={season}
              size="small"
            />
          ) : null,
        )}
      </Grid>

      <Popover
        id="semester-popover"
        className={classes.popover}
        classes={{ paper: classes.paper }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <pre style={{ margin: 0 }}>{popoverContent.join('\n')}</pre>
      </Popover>
    </>
  );
};

export default SemesterHistory;

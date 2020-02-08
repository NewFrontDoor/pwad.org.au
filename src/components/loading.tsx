import React, {FC} from 'react';
import PropTypes from 'prop-types';
import {motion} from 'framer-motion';
import {Styled, Box} from 'theme-ui';

type LoadingProps = {
  isLoading?: boolean;
};

const loadingContainer = {
  width: '2em',
  height: '1em',
  display: 'inline-flex',
  justifyContent: 'space-around',
  verticalAlign: 'super'
};

const loadingCircle = {
  display: 'block',
  width: '0.3em',
  height: '0.3em',
  backgroundColor: 'black',
  borderRadius: '0.5em'
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2
    }
  },
  end: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const loadingCircleVariants = {
  start: {
    y: '50%'
  },
  end: {
    y: '150%'
  }
};

const loadingCircleTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: 'easeInOut'
};

const Loading: FC<LoadingProps> = ({isLoading}) =>
  isLoading && (
    <Box>
      <Styled.h2>
        Loading
        <motion.span
          style={loadingContainer}
          variants={loadingContainerVariants}
          initial="start"
          animate="end"
        >
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
        </motion.span>
      </Styled.h2>
    </Box>
  );

Loading.propTypes = {
  isLoading: PropTypes.bool
};

Loading.defaultProps = {
  isLoading: true
};

export default Loading;
